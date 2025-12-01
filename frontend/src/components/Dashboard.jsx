// src/components/Dashboard.jsx
import React, { useEffect, useState } from 'react';
import API from '../api/api';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip);

export default function Dashboard(){
  const [progress, setProgress] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(()=>{ fetchProgress(); }, []);

  async function fetchProgress(){
    try{
      // fallback: demo user endpoint; will work if backend exists
      const resp = await API.get('/users/demo-user-id/progress').catch(()=>null);
      if(resp && resp.data && resp.data.progress){
        setProgress(resp.data.progress);
      } else {
        // demo fallback data
        setProgress({ Math: { score: 0.6 }, Physics: { score: 0.9 }, Programming: { score: 0.75 } });
      }
    } catch(e){
      console.error(e);
    } finally { setLoading(false); }
  }

  const subjects = Object.keys(progress);
  const scores = subjects.map(s => Math.round((progress[s].score || 0) * 100));

  const data = { labels: subjects, datasets: [{ label: 'Score (%)', data: scores }] };

  return (
    <div className="container">
      <div className="card">
        <h2>Dashboard</h2>
        {loading ? <div>Loading...</div> : (
          subjects.length === 0 ? <div className="small">No progress yet — take quizzes to populate this chart.</div> :
          <div style={{maxWidth:700}}><Bar data={data} /></div>
        )}
        <div style={{marginTop:12}}>
          <h4>Quick tips</h4>
          <ul>
            <li>If score &lt; 60%: scheduler will allocate more time to that subject.</li>
            <li>Use Planner → Generate Quiz → Quizzes → Take Quiz to populate progress.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
