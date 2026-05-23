import React, { useState } from 'react';

// Të dhëna fillestare për streamer-at aktivë
const INITIAL_STREAMERS = [
  {
    id: 1,
    username: "GhostAlbania",
    platform: "TikTok",
    isLive: true,
    badge: "Spark 🔥",
    title: "Live duke luajtur me ndjekësit! Ejani 🚀",
    avatar: "https://images.unsplash.com/photo-1566492031773-4f4e44671857?w=150"
  },
  {
    id: 2,
    username: "Klaudi_King",
    platform: "TikTok",
    isLive: true,
    badge: "Premium 👑",
    title: "Custom Rooms PUBG Mobile 🏆",
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150"
  }
];

export default function App() {
  const [streamers, setStreamers] = useState(INITIAL_STREAMERS);
  const [username, setUsername] = useState("");
  const [title, setTitle] = useState("");
  const [badge, setBadge] = useState("Free");
  const [showPremiumModal, setShowPremiumModal] = useState(false);

  const handleRegister = (e) => {
    e.preventDefault();
    if (!username || !title) return alert("Ju lutem plotësoni të gjitha fushat!");

    const newStreamer = {
      id: streamers.length + 1,
      username: username,
      platform: "TikTok",
      isLive: true,
      badge: badge === "Free" ? "Free" : badge,
      title: title,
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150"
    };

    setStreamers([newStreamer, ...streamers]);
    setUsername("");
    setTitle("");
    alert("U regjistruat me sukses! Tani jeni LIVE në listë.");
  };

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', backgroundColor: '#090d16', color: '#f8fafc', minHeight: '100vh', padding: '20px' }}>
      
      {/* Header */}
      <header style={{ borderBottom: '1px solid #1e293b', paddingBottom: '20px', marginBottom: '30px', textAlign: 'center' }}>
        <h1 style={{ color: '#ff0050', fontSize: '2.5rem', margin: '0', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
          📱 TikTok LIVE Hub
        </h1>
        <p style={{ color: '#94a3b8', fontSize: '1.1rem', marginTop: '10px' }}>Platforma për promovimin dhe rritjen e streamer-ave të rinj shqiptarë!</p>
      </header>

      <div style={{ display: 'flex', flexDirection: 'row', gap: '30px', flexWrap: 'wrap', justifyContent: 'center', maxWidth: '1200px', margin: '0 auto' }}>
        
        {/* Formular Regjistrimi (Majtas) */}
        <div style={{ backgroundColor: '#111827', padding: '25px', borderRadius: '16px', width: '350px', height: 'fit-content', border: '1px solid #1f2937' }}>
          <h2 style={{ marginTop: '0', color: '#f1f5f9', fontSize: '1.3rem', marginBottom: '20px' }}>Shto Kanalin Tënd</h2>
          
          <form onSubmit={handleRegister} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
              <label style={{ fontSize: '0.9rem', color: '#94a3b8' }}>Përdoruesi (TikTok Username):</label>
              <input 
                type="text" 
                value={username} 
                onChange={(e) => setUsername(e.target.value)}
                placeholder="psh. klaudi_gaming" 
                style={{ padding: '12px', borderRadius: '8px', border: '1px solid #374151', backgroundColor: '#1f2937', color: '#fff' }}
              />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
              <label style={{ fontSize: '0.9rem', color: '#94a3b8' }}>Titulli i Stream-it:</label>
              <input 
                type="text" 
                value={title} 
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Çfarë po luan ose po bën aktualisht..." 
                style={{ padding: '12px', borderRadius: '8px', border: '1px solid #374151', backgroundColor: '#1f2937', color: '#fff' }}
              />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
              <label style={{ fontSize: '0.9rem', color: '#94a3b8' }}>Zgjidh Planin (Badge):</label>
              <select 
                value={badge} 
                onChange={(e) => {
                  if (e.target.value !== "Free") {
                    setShowPremiumModal(true);
                  } else {
                    setBadge("Free");
                  }
                }}
                style={{ padding: '12px', borderRadius: '8px', border: '1px solid #374151', backgroundColor: '#1f2937', color: '#fff' }}
              >
                <option value="Free">Free Plan (Pa Badge)</option>
                <option value="Spark 🔥">Spark Plan 🔥 (Premium)</option>
                <option value="Pro 🚀">Pro Plan 🚀 (Premium)</option>
              </select>
            </div>

            <button type="submit" style={{ padding: '14px', borderRadius: '8px', border: 'none', backgroundColor: '#ff0050', color: '#fff', fontWeight: 'bold', cursor: 'pointer', marginTop: '10px', fontSize: '1rem' }}>
              Dalu LIVE në Platformë 🚀
            </button>
          </form>
        </div>

        {/* Lista e Streamer-ave (Djathtas) */}
        <div style={{ flex: '1', minWidth: '300px', maxWidth: '750px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <h2 style={{ margin: '0', color: '#f1f5f9' }}>Streamer-at Aktivë</h2>
            <span style={{ backgroundColor: '#00f2fe', color: '#000', padding: '4px 10px', borderRadius: '20px', fontSize: '0.85rem', fontWeight: 'bold' }}>
              🔴 TikTok LIVE Pulser
            </span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            {streamers.map((streamer) => (
              <div key={streamer.id} style={{ display: 'flex', alignItems: 'center', gap: '15px', backgroundColor: '#111827', padding: '15px', borderRadius: '14px', border: '1px solid #1f2937', position: 'relative' }}>
                
                {/* Avatar me rrethin TikTok Live */}
                <div style={{ position: 'relative' }}>
                  <img 
                    src={streamer.avatar} 
                    alt={streamer.username} 
                    style={{ width: '60px', height: '60px', borderRadius: '50%', objectFit: 'cover', border: '2px solid #ff0050' }} 
                  />
                  <span style={{ position: 'absolute', bottom: '-5px', right: '5px', backgroundColor: '#ff0050', color: '#fff', fontSize: '0.65rem', padding: '1px 5px', borderRadius: '4px', fontWeight: 'bold' }}>LIVE</span>
                </div>

                {/* Informacionet */}
                <div style={{ flex: '1' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <h3 style={{ margin: '0', fontSize: '1.1rem', color: '#f8fafc' }}>@{streamer.username}</h3>
                    
                    {/* Badge nëse ka */}
                    {streamer.badge !== "Free" && (
                      <span style={{ backgroundColor: '#1e293b', color: '#00f2fe', padding: '2px 8px', borderRadius: '6px', fontSize: '0.75rem', fontWeight: 'bold', border: '1px solid #00f2fe' }}>
                        {streamer.badge}
                      </span>
                    )}
                  </div>
                  <p style={{ margin: '6px 0 0 0', color: '#94a3b8', fontSize: '0.95rem' }}>{streamer.title}</p>
                </div>

                {/* Butoni Shiko */}
                <button 
                  style={{ padding: '10px 16px', borderRadius: '8px', border: 'none', backgroundColor: '#00f2fe', color: '#000', fontWeight: 'bold', cursor: 'pointer' }}
                  onClick={() => alert(`Po lidhesh me API-n e TikTok për streamer-in @${streamer.username}...`)}
                >
                  Shiko
                </button>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Modal për Pagesat Premium */}
      {showPremiumModal && (
        <div style={{ position: 'fixed', top: '0', left: '0', width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.8)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: '1000' }}>
          <div style={{ backgroundColor: '#111827', padding: '30px', borderRadius: '16px', maxWidth: '400px', textAlign: 'center', border: '1px solid #1f2937' }}>
            <h3 style={{ fontSize: '1.5rem', color: '#fff', marginTop: '0' }}>Zgjidhni Planin Tuaj 💎</h3>
            <p style={{ color: '#94a3b8', fontSize: '0.95rem', marginBottom: '20px' }}>Për të marrë një Badge (Spark 🔥 ose Pro 🚀) duhet të kaloni te sistemi i llogarisë Premium.</p>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '20px' }}>
              <div style={{ padding: '10px', backgroundColor: '#1f2937', borderRadius: '8px', cursor
