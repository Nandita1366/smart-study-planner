// src/components/Shared/Header.jsx
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const linkStyle = (active) => ({
  color: 'white',
  marginRight: 16,
  textDecoration: active ? 'underline' : 'none',
  fontWeight: active ? 700 : 500,
});

export default function Header(){
  const loc = useLocation();
  return (
    <header className="app-header">
      <div style={{ maxWidth: 1000, margin: '0 auto', padding: '12px 16px', display:'flex', alignItems:'center', justifyContent:'space-between' }}>
        <div style={{ display:'flex', alignItems:'center', gap:20 }}>
          <div style={{ fontSize:20, fontWeight:700, color:'white' }}>Smart Study Planner</div>
          <nav>
            <Link to="/" style={linkStyle(loc.pathname === '/')}>Planner</Link>
            <Link to="/quizzes" style={linkStyle(loc.pathname === '/quizzes')}>Quizzes</Link>
            <Link to="/dashboard" style={linkStyle(loc.pathname === '/dashboard')}>Dashboard</Link>
            <Link to="/pomodoro" style={linkStyle(loc.pathname === '/pomodoro')}>Pomodoro</Link>
          </nav>
        </div>

        <div style={{ color:'rgba(255,255,255,0.9)' }}>
          Demo
        </div>
      </div>
    </header>
  );
}
