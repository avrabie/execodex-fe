import { useState, useEffect, type ChangeEvent } from 'react';

interface VaultProps {
  user: { username: string } | null;
}

export function Vault({ user }: VaultProps) {
  const [files, setFiles] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const bucketName = user?.username?.toLowerCase().replace(/[^a-z0-9.-]/g, '-') || '';

  const fetchFiles = async () => {
    if (!bucketName) return;
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(`/minio/${bucketName}`);
      if (response.ok) {
        const data = await response.json();
        // The backend returns an array of strings (filenames)
        setFiles(Array.isArray(data) ? data : []);
      } else if (response.status === 404) {
        // Bucket might not exist, try to create it
        await createBucket();
      } else {
        throw new Error(`Failed to fetch files: ${response.status}`);
      }
    } catch (err: any) {
      setError(err.message || 'Error loading files');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const createBucket = async () => {
    if (!bucketName) return;
    try {
      const response = await fetch(`/minio/${bucketName}`, {
        method: 'POST',
      });
      if (response.ok) {
        setFiles([]);
        setError(null);
      } else {
        throw new Error(`Failed to create bucket: ${response.status}`);
      }
    } catch (err) {
      console.error('Error creating bucket', err);
      setError('Error creating bucket');
      throw err;
    }
  };

  useEffect(() => {
    if (user) {
      fetchFiles();
    }
  }, [user]);

  const handleUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !bucketName) return;

    setUploading(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch(`/minio/${bucketName}/upload`, {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        fetchFiles();
      } else {
        alert('Upload failed');
      }
    } catch (err) {
      console.error('Upload error', err);
      alert('Upload error');
    } finally {
      setUploading(false);
      // Clear input
      e.target.value = '';
    }
  };

  const handleDownload = (filename: string) => {
    if (!bucketName) return;
    window.open(`/minio/${bucketName}/download/${filename}`, '_blank');
  };

  if (!user) {
    return (
      <div className="vault-container">
        <h2>Vault</h2>
        <p>Please log in to access your vault.</p>
      </div>
    );
  }

  return (
    <div className="vault-container">
      <h2>Vault</h2>
      <p>Secure storage for {user.username}</p>

      <div className="upload-section">
        <label className="upload-button">
          {uploading ? 'Uploading...' : 'Upload File'}
          <input type="file" onChange={handleUpload} disabled={uploading} hidden />
        </label>
      </div>

      {loading ? (
        <p>Loading files...</p>
      ) : error ? (
        <div className="error-section">
          <p className="error">{error}</p>
          <button className="create-vault-button" onClick={() => createBucket().catch(() => {})}>
            Create Vault
          </button>
        </div>
      ) : (
        <ul className="file-list">
          {files.length === 0 ? (
            <p>No files yet.</p>
          ) : (
            files.map((fileName) => (
              <li key={fileName} className="file-item">
                <button 
                  className="file-link" 
                  onClick={() => handleDownload(fileName)}
                  title="Download"
                >
                  {fileName}
                </button>
              </li>
            ))
          )}
        </ul>
      )}
    </div>
  );
}
