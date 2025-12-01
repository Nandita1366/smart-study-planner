// frontend/src/components/Planner.jsx
import React, { useState } from 'react';
import API from '../api/api';

function SmallBadge({ children }) {
  return <span style={{ background: '#eef2ff', padding: '2px 8px', borderRadius: 6, fontSize: 12 }}>{children}</span>;
}

export default function Planner() {
  const [text, setText] = useState('');
  const [subject, setSubject] = useState('General');
  const [summary, setSummary] = useState(null);
  const [loadingSumm, setLoadingSumm] = useState(false);
  const [quiz, setQuiz] = useState(null);
  const [loadingQuiz, setLoadingQuiz] = useState(false);

  const handleSimplify = async () => {
    if (!text.trim()) {
      alert('Paste some text first (lecture notes, abstract, or slide text).');
      return;
    }
    try {
      setLoadingSumm(true);
      const resp = await API.post('/summarize', { text, max_sentences: 3, key_points: 5 });
      setSummary(resp.data);
    } catch (err) {
      console.error('summarize error', err);
      alert('Error generating summary. Check backend (POST /api/summarize) and AI microservice.');
    } finally {
      setLoadingSumm(false);
    }
  };

  const handleGenerateQuiz = async () => {
    if (!text.trim()) {
      alert('Paste some text first.');
      return;
    }
    try {
      setLoadingQuiz(true);
      const resp = await API.post('/quizzes/generate', { userId: 'demo-user-id', subject, text });
      setQuiz(resp.data.quiz);
      // optionally show a small confirmation
      alert('Quiz generated and saved on backend (demo user). Now go to Quizzes page to take it.');
    } catch (err) {
      console.error('generate quiz error', err);
      alert('Error generating quiz. Check backend (POST /api/quizzes/generate).');
    } finally {
      setLoadingQuiz(false);
    }
  };

  const handleClear = () => {
    setText('');
    setSummary(null);
    setQuiz(null);
  };

  return (
    <div className="container">
      <div className="card">
        <h2>Planner — paste notes or abstract</h2>

        <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginBottom: 10 }}>
          <label style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            <SmallBadge>Subject</SmallBadge>
            <select value={subject} onChange={(e) => setSubject(e.target.value)}>
              <option>General</option>
              <option>Math</option>
              <option>Physics</option>
              <option>Programming</option>
            </select>
          </label>
          <div style={{ marginLeft: 'auto' }} className="small">API: <code>/api/summarize</code> & <code>/api/quizzes/generate</code></div>
        </div>

        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Paste lecture transcript, slide notes, or the abstract here..."
        />

        <div style={{ marginTop: 12, display: 'flex', gap: 10 }}>
          <button onClick={handleSimplify} disabled={loadingSumm}>
            {loadingSumm ? 'Simplifying...' : 'Simplify (3-line summary)'}
          </button>

          <button onClick={handleGenerateQuiz} disabled={loadingQuiz}>
            {loadingQuiz ? 'Generating quiz...' : 'Generate Quiz from text'}
          </button>

          <button className="secondary" onClick={handleClear}>Clear</button>
        </div>

        {summary && (
          <div style={{ marginTop: 16 }} className="card">
            <h3>Plain summary</h3>
            <div style={{ fontWeight: 600 }}>{summary.plain_summary}</div>

            <h4 style={{ marginTop: 8 }}>Key points</h4>
            <ul>{(summary.key_points || []).map((kp, i) => <li key={i}>{kp}</li>)}</ul>

            <div className="small" style={{ marginTop: 8 }}>
              <strong>Keywords:</strong> {(summary.keywords || []).join(', ')}
            </div>
          </div>
        )}

        {quiz && (
          <div style={{ marginTop: 16 }} className="card">
            <h3>Generated Quiz (saved)</h3>
            {quiz.questions && quiz.questions.map((q, i) => (
              <div key={i} style={{ marginBottom: 8 }}>
                <strong>{i + 1}.</strong> {q.question}
                {q.options && (
                  <ul>{q.options.map((opt, j) => <li key={j}>{opt}</li>)}</ul>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
