import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import { Layout } from './components/Layout'
import { Vault } from './components/Vault'
import { About } from './components/About'

interface UserInfo {
  username: string;
  name: string;
  email: string;
  roles: string[];
}

function Home() {
  return (
    <div className="home">
      <h1>Welcome to Execodex!</h1>
      <p>Securely manage your execution environments and secrets.</p>
    </div>
  )
}

function App() {
  const [user, setUser] = useState<UserInfo | null>(null)

  useEffect(() => {
    fetch('/api/bff/me')
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error('Not authenticated');
      })
      .then(data => setUser(data))
      .catch(() => setUser(null));
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout user={user} />}>
          <Route index element={<Home />} />
          <Route path="vault" element={<Vault user={user} />} />
          <Route path="about" element={<About />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App
