// src/App.jsx
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Header from './components/Shared/Header';
import Planner from './components/Planner';
import QuizTaker from './components/QuizTaker';
import Dashboard from './components/Dashboard';
import Pomodoro from './components/Pomodoro';

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <main style={{ padding: 20 }}>
        <Routes>
          <Route path="/" element={<Planner />} />
          <Route path="/quizzes" element={<QuizTaker />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/pomodoro" element={<Pomodoro />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}
