// frontend/src/components/Shared/Spinner.jsx
import React from 'react';
export default function Spinner() {
  return <span style={{display:'inline-block',width:16,height:16,border:'2px solid rgba(255,255,255,0.5)',borderTop:'2px solid white',borderRadius:8,animation:'spin 0.9s linear infinite'}}></span>;
}
