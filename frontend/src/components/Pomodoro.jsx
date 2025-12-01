// src/components/Pomodoro.jsx
import React, { useState, useEffect, useRef } from 'react';

export default function Pomodoro(){
  const [mins, setMins] = useState(25);
  const [secs, setSecs] = useState(0);
  const [running, setRunning] = useState(false);
  const timerRef = useRef(null);

  useEffect(()=>{
    if(running){
      timerRef.current = setInterval(()=>{
        setSecs(s => {
          if(s === 0){
            if(mins === 0){
              clearInterval(timerRef.current);
              setRunning(false);
              try{ new Audio('https://actions.google.com/sounds/v1/alarms/alarm_clock.ogg').play(); }catch(e){}
              return 0;
            } else {
              setMins(m => m-1);
              return 59;
            }
          } else {
            return s-1;
          }
        });
      }, 1000);
      return ()=> clearInterval(timerRef.current);
    }
  }, [running, mins]);

  const reset = ()=>{ setRunning(false); setMins(25); setSecs(0); if(timerRef.current) clearInterval(timerRef.current); };

  return (
    <div className="container">
      <div className="card" style={{textAlign:'center'}}>
        <h2>Pomodoro</h2>
        <div style={{fontSize:64, fontWeight:600}}>{String(mins).padStart(2,'0')}:{String(secs).padStart(2,'0')}</div>
        <div style={{marginTop:12}}>
          <button onClick={()=>setRunning(true)}>Start</button>
          <button className="secondary" onClick={()=>setRunning(false)}>Pause</button>
          <button className="secondary" onClick={reset}>Reset</button>
        </div>
        <div style={{marginTop:12}} className="small">Use this timer during a scheduled session. For demo, shorten minutes if you want quick tests.</div>
      </div>
    </div>
  );
}
