import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { LoginButton } from './auth/LoginButton'

interface UserInfo {
  username: string;
  name: string;
  email: string;
  roles: string[];
}

function App() {
  const [count, setCount] = useState(0)
  const [user, setUser] = useState<UserInfo | null>(null)

  useEffect(() => {
    fetch('/bff/me')
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
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        {user ? (
          <div>
            <p>Welcome, {user.name}!</p>
          </div>
        ) : (
          <LoginButton />
        )}
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
