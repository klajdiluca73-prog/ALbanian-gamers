import React, { useState } from 'react';

export default function App() {
  const [streamers, setStreamers] = useState([
    { id: 1, name: "GhostAlbania", game: "PUBG Mobile", live: true },
    { id: 2, name: "Klaudi_King", game: "TikTok Live", live: true }
  ]);
  const [name, setName] = useState("");
  const [game, setGame] = useState("PUBG Mobile");

  const shtoStreamer = (e) => {
    e.preventDefault();
    if (!name) return alert("Shkruaj emrin!");
    setStreamers([...streamers, { id: Date.now(), name, game, live: true }]);
    setName("");
  };

  return (
    <div style={{ padding: '40px', backgroundColor: '#0f172a', color: '#fff', minHeight: '100vh', fontFamily: 'sans-serif', textAlign: 'center' }}>
      <h1 style={{ color: '#38bdf8' }}>🇦🇱 Albanian Gamers Hub</h1>
      <p style={{ color: '#94a3b8' }}>Platforma për streamer-at e rinj shqiptarë</p>
      
      <form onSubmit={shtoStreamer} style={{ margin: '30px auto', maxWidth: '400px', padding: '20px', backgroundColor: '#1e293b', borderRadius: '8px' }}>
        <input 
          placeholder="TikTok ose Gaming Username" 
          value={name} 
          onChange={e => setName(e.target.value)} 
          style={{ width: '90%', padding: '10px', marginBottom: '10px', borderRadius: '4px', border: 'none' }}
        />
        <select value={game} onChange={e => setGame(e.target.value)} style={{ width: '96%', padding: '10px', marginBottom: '10px', borderRadius: '4px' }}>
          <option value="PUBG Mobile">PUBG Mobile</option>
          <option value="TikTok Live">TikTok Live</option>
          <option value="GTA RP">GTA RP</option>
        </select>
        <button type="submit" style={{ width: '96%', padding: '10px', backgroundColor: '#22c55e', color: '#fff', border: 'none', borderRadius: '4px', fontWeight: 'bold', cursor: 'pointer' }}>
          Fillo Stream-in 🚀
        </button>
      </form>

      <div style={{ maxWidth: '500px', margin: '0 auto', textAlign: 'left' }}>
        <h2>Streamer-at Aktivë:</h2>
        {streamers.map(s => (
          <div key={s.id} style={{ padding: '15px', backgroundColor: '#1e293b', marginBottom: '10px', borderRadius: '6px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <strong>@{s.name}</strong> - <span style={{ color: '#38bdf8' }}>{s.game}</span>
            </div>
            <span style={{ backgroundColor: '#ef4444', padding: '2px 8px', borderRadius: '4px', fontSize: '0.8rem', fontWeight: 'bold' }}>LIVE</span>
          </div>
        ))}
      </div>
    </div>
  );
}
