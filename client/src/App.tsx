import { Link, Route, Routes, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';

const API_BASE = 'http://localhost:5000/profile';

function App() {
  const [isLogin, setIsLogin] = useState(true);
  const [identifier, setIdentifier] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('');

    try {
      const endpoint = isLogin ? '/signin' : '/signup';
      const payload = isLogin
        ? { identifier, password }
        : { email, name, password, username };

      const response = await axios.post(`${API_BASE}${endpoint}`, payload);
      localStorage.setItem('token', response.data.token);
      setMessage(response.data.msg);
      navigate('/dashboard');
    } catch (error: any) {
      setMessage(error.response?.data?.msg || 'Request failed');
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: '#111827', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ width: '100%', maxWidth: 420, padding: 24, borderRadius: 16, background: '#1f2937', boxShadow: '0 10px 30px rgba(0,0,0,0.3)' }}>
        <h2 style={{ marginBottom: 8 }}>{isLogin ? 'Sign In' : 'Sign Up'}</h2>
        <p style={{ marginBottom: 16, color: '#9ca3af' }}>React frontend connected to your Node server.</p>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {!isLogin && (
            <>
              <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" required style={inputStyle} />
              <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" type="email" required style={inputStyle} />
              <input value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" required style={inputStyle} />
            </>
          )}

          <input value={identifier} onChange={(e) => setIdentifier(e.target.value)} placeholder={isLogin ? 'Email or Username' : 'Email or Username'} required style={inputStyle} />
          <input value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" type="password" required style={inputStyle} />

          <button type="submit" style={{ padding: '10px 14px', borderRadius: 8, background: '#2563eb', color: 'white', border: 'none', cursor: 'pointer' }}>
            {isLogin ? 'Sign In' : 'Create Account'}
          </button>
        </form>

        <div style={{ marginTop: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <button onClick={() => setIsLogin(!isLogin)} style={{ background: 'transparent', border: 'none', color: '#60a5fa', cursor: 'pointer' }}>
            {isLogin ? 'Create account' : 'Already have an account?'}
          </button>
          <Link to="/dashboard" style={{ color: '#60a5fa' }}>Dashboard</Link>
        </div>

        {message && <p style={{ marginTop: 12, color: '#fbbf24' }}>{message}</p>}
      </div>
    </div>
  );
}

const inputStyle: React.CSSProperties = {
  padding: '10px 12px',
  borderRadius: 8,
  border: '1px solid #4b5563',
  background: '#111827',
  color: 'white',
};

export default App;
