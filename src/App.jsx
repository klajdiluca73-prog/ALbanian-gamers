import { useState, useEffect, useRef } from "react";

// ─── DATA ─────────────────────────────────────────────────────────────────────
const STREAMERS = [
  { id:1, name:"NeonViper_GG", game:"Valorant",       viewers:47, rank:"Rising",    avatar:"🐍", color:"#00ff88", hype:82, isLive:true,  followers:1240, bio:"Valorant Immortal | Daily grind 🎯" },
  { id:2, name:"PixelKnight",  game:"Elden Ring",      viewers:31, rank:"Spark",     avatar:"⚔️", color:"#ff6b35", hype:65, isLive:true,  followers:890,  bio:"Souls veteran. No cheese runs 💀" },
  { id:3, name:"CryoStarX",    game:"Apex Legends",    viewers:58, rank:"Rising",    avatar:"❄️", color:"#4ecdc4", hype:91, isLive:true,  followers:2100, bio:"Apex Predator S18 | Cryo gaming 🧊" },
  { id:4, name:"DuskHunter",   game:"Minecraft",       viewers:22, rank:"Newcomer",  avatar:"🌙", color:"#a855f7", hype:44, isLive:true,  followers:340,  bio:"Builder & Explorer | SMP creator" },
  { id:5, name:"BlazeFPS",     game:"CS2",             viewers:73, rank:"Hype King", avatar:"🔥", color:"#f59e0b", hype:97, isLive:true,  followers:3800, bio:"CS2 Faceit Lvl 10 | Coach available" },
  { id:6, name:"ShadowLane",   game:"League of Legends",viewers:19,rank:"Newcomer", avatar:"👤", color:"#6366f1", hype:38, isLive:false, followers:210,  bio:"Support main. Diamond climber 💎" },
  { id:7, name:"AlbaStrike",   game:"FIFA 25",         viewers:35, rank:"Spark",     avatar:"🦅", color:"#ef4444", hype:72, isLive:true,  followers:670,  bio:"Shqipëria forever 🇦🇱 FIFA grinder" },
  { id:8, name:"KosovaGamer",  game:"Fortnite",        viewers:28, rank:"Rising",    avatar:"🏔️", color:"#22d3ee", hype:60, isLive:false, followers:520,  bio:"Fortnite champ from Pristina 🏆" },
];
const GAMES = [
  { name:"Valorant",     icon:"🎯", streamers:342, color:"#ff4655" },
  { name:"Apex Legends", icon:"💥", streamers:289, color:"#cd4e00" },
  { name:"CS2",          icon:"🔫", streamers:408, color:"#f6a30b" },
  { name:"Minecraft",    icon:"🧱", streamers:521, color:"#5aaf3d" },
  { name:"Elden Ring",   icon:"⚔️", streamers:156, color:"#c5a028" },
  { name:"FIFA 25",      icon:"⚽", streamers:198, color:"#1d4ed8" },
  { name:"Fortnite",     icon:"🏗️", streamers:374, color:"#9333ea" },
  { name:"League",       icon:"🏆", streamers:617, color:"#c8aa6e" },
];
const INIT_POSTS = [
  { id:1, user:"BlazeFPS",  avatar:"🔥", color:"#f59e0b", time:"2m ago",  text:"POV: 2 viewers për 6 muaj. Sot 3800 followers. MOS DORËZOHESH 💪🔥", likes:312, comments:[], liked:false },
  { id:2, user:"CryoStarX", avatar:"❄️", color:"#4ecdc4", time:"15m ago", text:"Apex ranked grind fillon pas 30 min! Bëjmë raid me njëri-tjetrin pas 🔁 #AlbanianGamers", likes:89, comments:[], liked:false },
  { id:3, user:"AlbaStrike",avatar:"🦅", color:"#ef4444", time:"1h ago",  text:"Kush luan FIFA 25 sot? Organizojmë tournament mes vetes 🏆🇦🇱", likes:156, comments:[], liked:false },
];
const PLANS = [
  { id:"free",  name:"Free",  price:0,    icon:"🎮", color:"#555555", badge:null,          features:[{t:"Profil bazë",inc:true},{t:"Komunitet & Chat",inc:true},{t:"Hype & Raid",inc:true},{t:"TikTok Live sync",inc:false},{t:"Badge i veçantë",inc:false},{t:"Statistika avancuara",inc:false},{t:"Prioritet në listë",inc:false}] },
  { id:"spark", name:"Spark", price:1.99, icon:"⚡", color:"#3b82f6", badge:"MË POPULLAR", features:[{t:"Gjithçka nga Free",inc:true},{t:"TikTok Live sync",inc:true},{t:"Badge ⚡ Spark",inc:true},{t:"Statistika bazë",inc:true},{t:"Prioritet raid",inc:true},{t:"Statistika avancuara",inc:false},{t:"Prioritet në listë",inc:false}] },
  { id:"pro",   name:"Pro",   price:3.99, icon:"🔥", color:"#f59e0b", badge:"BEST VALUE",  features:[{t:"Gjithçka nga Spark",inc:true},{t:"TikTok+YouTube+Twitch",inc:true},{t:"Badge 🔥 Pro",inc:true},{t:"Statistika të plota",inc:true},{t:"#1 në listë Live",inc:true},{t:"Raid VIP slot",inc:true},{t:"Suport 24/7",inc:true}] },
];
const TICKS = ["🔥 BlazeFPS sapo ra 100 viewers!","⚡ CryoStarX bëri 5-kill streak!","🎉 NeonViper_GG raidoi PixelKnight!","🚀 AlbaStrike trending në FIFA 25!","🏆 DuskHunter fitoi Hype King!"];
const RANK_COLORS = { "Newcomer":"#6b7280","Spark":"#3b82f6","Rising":"#10b981","Hype King":"#f59e0b" };
const CHAT_ROOMS = [
  { id:"general", name:"# general",      desc:"Biseda të përgjithshme", icon:"💬", color:"#7c3aed", unread:3 },
  { id:"raids",   name:"# raids",        desc:"Organizo raid trains",    icon:"🚀", color:"#f59e0b", unread:7 },
  { id:"tips",    name:"# stream-tips",  desc:"Këshilla streaming",      icon:"📡", color:"#10b981", unread:1 },
  { id:"albanian",name:"# 🇦🇱 shqip",   desc:"Vetëm shqip këtu!",      icon:"🦅", color:"#ef4444", unread:12 },
];
const INIT_MSGS = {
  general:  [{user:"BlazeFPS",avatar:"🔥",color:"#f59e0b",text:"Kush luan sonte? 🎮",time:"20:14"},{user:"CryoStarX",avatar:"❄️",color:"#4ecdc4",text:"Unë! Apex ranked 💪",time:"20:15"}],
  raids:    [{user:"AlbaStrike",avatar:"🦅",color:"#ef4444",text:"Raid train ora 21:00! 🙋",time:"19:45"}],
  albanian: [{user:"KosovaGamer",avatar:"🏔️",color:"#22d3ee",text:"Krenari shqiptare! 🇦🇱🦅",time:"20:00"},{user:"AlbaStrike",avatar:"🦅",color:"#ef4444",text:"Bashkë jemi të fortë! 💪",time:"20:02"}],
  tips:     [{user:"BlazeFPS",avatar:"🔥",color:"#f59e0b",text:"Konsistenca është çelësi. Stream çdo ditë 📡",time:"18:30"}],
};

// ─── ATOMS ────────────────────────────────────────────────────────────────────
const Dot = ({color,size=8})=>(
  <span style={{position:"relative",display:"inline-flex",width:size,height:size,flexShrink:0}}>
    <span style={{position:"absolute",inset:0,borderRadius:"50%",background:color,opacity:.5,animation:"ping 1.4s ease-out infinite"}}/>
    <span style={{position:"relative",width:size,height:size,borderRadius:"50%",background:color,display:"inline-block"}}/>
  </span>
);
const Av=({emoji,color,size=40})=>(
  <div style={{width:size,height:size,borderRadius:"50%",fontSize:size*.48,display:"flex",alignItems:"center",justifyContent:"center",background:`${color}22`,border:`2px solid ${color}66`,flexShrink:0}}>{emoji}</div>
);
const Bdg=({label,color})=>{
  const c=color||RANK_COLORS[label]||"#555";
  return <span style={{background:`${c}22`,color:c,fontSize:9,padding:"2px 7px",borderRadius:20,fontFamily:"monospace",fontWeight:700}}>{label}</span>;
};
const HypeBar=({value,color})=>(
  <div style={{display:"flex",alignItems:"center",gap:6}}>
    <div style={{flex:1,height:5,background:"#1a1a2e",borderRadius:3,overflow:"hidden"}}>
      <div style={{width:`${value}%`,height:"100%",background:`linear-gradient(90deg,${color}88,${color})`,borderRadius:3,boxShadow:`0 0 6px ${color}`,transition:"width 1s ease"}}/>
    </div>
    <span style={{fontSize:10,color:"#666",fontFamily:"monospace",width:28}}>{value}%</span>
  </div>
);
function Notif({msg,color,onClose}){
  useEffect(()=>{const t=setTimeout(onClose,3500);return()=>clearTimeout(t);},[msg]);
  if(!msg)return null;
  return <div style={{position:"fixed",top:66,left:"50%",transform:"translateX(-50%)",background:color||"linear-gradient(135deg,#7c3aed,#ef4444)",color:"#fff",padding:"9px 20px",borderRadius:30,fontWeight:700,fontSize:13,zIndex:9999,whiteSpace:"nowrap",boxShadow:"0 6px 24px #0009",animation:"slideDown .3s ease"}}>{msg}</div>;
}

// ─── STREAMER CARD ────────────────────────────────────────────────────────────
function SCard({s,onHype,onProfile}){
  const [hyped,setHyped]=useState(false);
  const [hv,setHv]=useState(s.hype);
  const go=()=>{if(hyped)return;setHyped(true);setHv(v=>Math.min(99,v+1));onHype(s.name);};
  return(
    <div style={{background:"linear-gradient(160deg,#0d0d1f,#111228)",border:`1px solid ${hyped?s.color+"88":"#1e1e3a"}`,borderRadius:14,padding:14,position:"relative",overflow:"hidden",boxShadow:hyped?`0 0 20px ${s.color}33`:"none",transition:"all .3s"}}>
      <div style={{position:"absolute",top:0,left:0,right:0,height:3,background:s.isLive?`linear-gradient(90deg,transparent,${s.color},transparent)`:"transparent"}}/>
      <div style={{display:"flex",justifyContent:"space-between",marginBottom:10}}>
        <div style={{display:"flex",gap:8,alignItems:"center",cursor:"pointer"}} onClick={()=>onProfile(s)}>
          <Av emoji={s.avatar} color={s.color} size={36}/>
          <div>
            <div style={{color:"#fff",fontWeight:700,fontSize:12}}>{s.name}</div>
            <div style={{color:s.color,fontSize:10,fontFamily:"monospace"}}>{s.game}</div>
          </div>
        </div>
        <div style={{textAlign:"right"}}>
          {s.isLive?<span style={{background:"#ff1744",color:"#fff",fontSize:9,padding:"2px 5px",borderRadius:3,fontWeight:700,fontFamily:"monospace",animation:"pulse 1.5s infinite"}}>● LIVE</span>
                   :<span style={{color:"#333",fontSize:9,fontFamily:"monospace"}}>OFFLINE</span>}
          <div style={{color:"#555",fontSize:10,fontFamily:"monospace",marginTop:3}}>{s.viewers} 👁</div>
        </div>
      </div>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:8}}>
        <Bdg label={s.rank}/><span style={{color:"#555",fontSize:10,fontFamily:"monospace"}}>❤ {s.followers}</span>
      </div>
      <HypeBar value={hv} color={s.color}/>
      <button onClick={go} style={{marginTop:10,width:"100%",padding:"8px",background:hyped?s.color:`${s.color}18`,border:`1px solid ${s.color}44`,borderRadius:8,color:hyped?"#000":s.color,fontWeight:700,fontSize:12,cursor:hyped?"default":"pointer",transition:"all .25s"}}>
        {hyped?"✓ HYPED!":"⚡ HYPE UP"}
      </button>
    </div>
  );
}

// ─── PROFILE MODAL ────────────────────────────────────────────────────────────
function PModal({s,onClose,onHype}){
  if(!s)return null;
  return(
    <div style={{position:"fixed",inset:0,background:"#000b",zIndex:500,display:"flex",alignItems:"flex-end"}} onClick={onClose}>
      <div onClick={e=>e.stopPropagation()} style={{width:"100%",maxWidth:480,margin:"0 auto",background:"#0d0d1f",borderRadius:"20px 20px 0 0",border:`1px solid ${s.color}44`,padding:20,animation:"slideUp .3s ease"}}>
        <div style={{width:36,height:4,background:"#333",borderRadius:2,margin:"0 auto 16px"}}/>
        <div style={{display:"flex",gap:14,alignItems:"center",marginBottom:14}}>
          <div style={{width:58,height:58,borderRadius:"50%",background:`${s.color}22`,border:`3px solid ${s.color}`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:26}}>{s.avatar}</div>
          <div>
            <div style={{fontWeight:700,fontSize:17}}>{s.name}</div>
            <div style={{color:s.color,fontSize:11,fontFamily:"monospace"}}>{s.game}</div>
            <div style={{display:"flex",gap:6,marginTop:4}}><Bdg label={s.rank}/>{s.isLive&&<span style={{background:"#ff174422",color:"#ff1744",fontSize:9,padding:"2px 6px",borderRadius:3,fontFamily:"monospace",fontWeight:700}}>● LIVE</span>}</div>
          </div>
        </div>
        <p style={{color:"#888",fontSize:12,lineHeight:1.6,marginBottom:14}}>{s.bio}</p>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:8,marginBottom:14}}>
          {[["❤",s.followers,"Followers"],["👁",s.viewers,"Viewers"],["⚡",s.hype+"%","Hype"]].map(([ic,v,l])=>(
            <div key={l} style={{background:"#07071a",borderRadius:8,padding:"10px 4px",textAlign:"center"}}>
              <div style={{fontSize:15,marginBottom:3}}>{ic}</div>
              <div style={{fontWeight:700,fontSize:14,color:s.color}}>{v}</div>
              <div style={{color:"#444",fontSize:9}}>{l}</div>
            </div>
          ))}
        </div>
        <div style={{display:"flex",gap:8}}>
          <button onClick={()=>{onHype(s.name);onClose();}} style={{flex:1,padding:"11px",background:`linear-gradient(135deg,${s.color}88,${s.color})`,border:"none",borderRadius:10,color:"#000",fontWeight:700,fontSize:13,cursor:"pointer"}}>⚡ HYPE UP</button>
          <button style={{flex:1,padding:"11px",background:"#ffffff11",border:"1px solid #333",borderRadius:10,color:"#aaa",fontWeight:700,fontSize:13,cursor:"pointer"}}>🚀 Raid</button>
        </div>
      </div>
    </div>
  );
}

// ─── TIKTOK MODAL ─────────────────────────────────────────────────────────────
function TikTokModal({onClose,onSuccess}){
  const [step,setStep]=useState(0);
  const go=()=>{
    setStep(1);
    setTimeout(()=>{
      setStep(2);
      setTimeout(()=>{onSuccess({username:"AlbaGamer_TV",displayName:"AlbaGamer 🦅",followers:4820,isLive:false,viewers:0,connectedAt:new Date().toISOString().slice(0,10)});onClose();},1200);
    },2000);
  };
  return(
    <div style={{position:"fixed",inset:0,background:"#000d",zIndex:600,display:"flex",alignItems:"flex-end",justifyContent:"center"}} onClick={step<1?onClose:undefined}>
      <div onClick={e=>e.stopPropagation()} style={{width:"100%",maxWidth:440,background:"#0a0a1a",border:"1px solid #ff005044",borderRadius:"20px 20px 0 0",padding:22,animation:"slideUp .3s ease"}}>
        <div style={{width:36,height:4,background:"#222",borderRadius:2,margin:"0 auto 18px"}}/>
        {step===0&&<>
          <div style={{textAlign:"center",marginBottom:20}}>
            <div style={{width:60,height:60,borderRadius:14,background:"#ff005018",border:"2px solid #ff005055",display:"flex",alignItems:"center",justifyContent:"center",fontSize:28,margin:"0 auto 12px"}}>🎵</div>
            <div style={{fontWeight:700,fontSize:17,marginBottom:4}}>Lidh TikTok-un</div>
            <div style={{color:"#555",fontSize:12}}>Albanian Gamers do të detektojë LIVE-in tënd automatikisht</div>
          </div>
          <div style={{background:"#07071a",borderRadius:10,padding:14,marginBottom:18}}>
            <div style={{color:"#555",fontSize:11,marginBottom:8,fontFamily:"monospace"}}>Albanian Gamers do të ketë qasje në:</div>
            {["Emrin e profilit & avatarin","Statusi LIVE (po/jo)","Numri i viewers kur live","🔒 NUK lexon fjalëkalimet"].map((p,i)=>(
              <div key={i} style={{display:"flex",alignItems:"center",gap:8,marginBottom:6}}>
                <span style={{color:i===3?"#10b981":"#ff0050",fontSize:12}}>{i===3?"✓":"✓"}</span>
                <span style={{color:i===3?"#10b981":"#ccc",fontSize:12}}>{p}</span>
              </div>
            ))}
          </div>
          <div style={{display:"flex",gap:8}}>
            <button onClick={onClose} style={{flex:1,padding:"10px",background:"#0f0f1a",border:"1px solid #1e1e3a",borderRadius:10,color:"#666",fontWeight:700,fontSize:13,cursor:"pointer"}}>Anulo</button>
            <button onClick={go} style={{flex:2,padding:"10px",background:"linear-gradient(135deg,#ff0050,#ff0050cc)",border:"none",borderRadius:10,color:"#fff",fontWeight:700,fontSize:13,cursor:"pointer",boxShadow:"0 4px 20px #ff005044"}}>Lidh me TikTok →</button>
          </div>
        </>}
        {step===1&&<div style={{textAlign:"center",padding:"30px 0"}}>
          <div style={{fontSize:36,marginBottom:12,animation:"spin 1s linear infinite"}}>⟳</div>
          <div style={{color:"#ff0050",fontSize:13,fontFamily:"monospace"}}>Duke autorizuar me TikTok...</div>
        </div>}
        {step===2&&<div style={{textAlign:"center",padding:"20px 0"}}>
          <div style={{fontSize:52,marginBottom:12,animation:"pop .4s ease"}}>✅</div>
          <div style={{fontWeight:700,fontSize:17,color:"#10b981",marginBottom:6}}>U Lidh!</div>
          <div style={{color:"#555",fontSize:12}}>TikTok është aktiv. Do të shfaqesh LIVE automatikisht.</div>
        </div>}
      </div>
    </div>
  );
}

// ─── PAYMENT MODAL ────────────────────────────────────────────────────────────
function PayModal({plan,yearly,onClose,onSuccess}){
  const [step,setStep]=useState(0);
  const [card,setCard]=useState({number:"",expiry:"",cvv:"",name:""});
  const price=yearly&&plan.price>0?(plan.price*10).toFixed(2):plan.price.toFixed(2);
  const fmtCard=v=>v.replace(/\D/g,"").replace(/(.{4})/g,"$1 ").trim().slice(0,19);
  const fmtExp=v=>{const d=v.replace(/\D/g,"");return d.length>=3?d.slice(0,2)+"/"+d.slice(2,4):d;};
  const pay=()=>{
    if(!card.name||!card.number||!card.expiry||!card.cvv)return;
    setStep(1);
    setTimeout(()=>{setStep(2);setTimeout(()=>{onSuccess(plan.id);onClose();},1500);},2000);
  };
  return(
    <div style={{position:"fixed",inset:0,background:"#000d",zIndex:600,display:"flex",alignItems:"flex-end",justifyContent:"center"}} onClick={step<1?onClose:undefined}>
      <div onClick={e=>e.stopPropagation()} style={{width:"100%",maxWidth:440,background:"#0a0a1a",border:`1px solid ${plan.color}44`,borderRadius:"20px 20px 0 0",padding:22,animation:"slideUp .3s ease",maxHeight:"90vh",overflowY:"auto"}}>
        <div style={{width:36,height:4,background:"#222",borderRadius:2,margin:"0 auto 18px"}}/>
        {step===0&&<>
          <div style={{background:`${plan.color}11`,border:`1px solid ${plan.color}33`,borderRadius:12,padding:14,marginBottom:18,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
            <div>
              <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:3}}><span style={{fontSize:18}}>{plan.icon}</span><span style={{fontWeight:700,fontSize:14,color:plan.color}}>{plan.name} Plan</span></div>
              <div style={{color:"#555",fontSize:11}}>{yearly?"Faturim vjetor":"Faturim mujor"} · Anulo kudo</div>
            </div>
            <div style={{textAlign:"right"}}><div style={{fontWeight:900,fontSize:20}}>€{price}</div><div style={{color:"#444",fontSize:10}}>/{yearly?"vit":"muaj"}</div></div>
          </div>
          <div style={{marginBottom:14}}>
            <label style={{color:"#444",fontSize:10,fontFamily:"monospace",display:"block",marginBottom:4}}>Emri mbi kartë</label>
            <input placeholder="Emri Mbiemri" value={card.name} onChange={e=>setCard(p=>({...p,name:e.target.value}))} style={{width:"100%",background:"#07071a",border:"1px solid #1e1e3a",borderRadius:8,padding:"9px 12px",color:"#fff",fontSize:13,fontFamily:"monospace",outline:"none",boxSizing:"border-box"}}/>
          </div>
          <div style={{marginBottom:14}}>
            <label style={{color:"#444",fontSize:10,fontFamily:"monospace",display:"block",marginBottom:4}}>Numri i kartës</label>
            <input placeholder="1234 5678 9012 3456" value={card.number} onChange={e=>setCard(p=>({...p,number:fmtCard(e.target.value)}))} style={{width:"100%",background:"#07071a",border:"1px solid #1e1e3a",borderRadius:8,padding:"9px 12px",color:"#fff",fontSize:13,fontFamily:"monospace",outline:"none",boxSizing:"border-box"}}/>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:18}}>
            <div>
              <label style={{color:"#444",fontSize:10,fontFamily:"monospace",display:"block",marginBottom:4}}>Skadenca</label>
              <input placeholder="MM/YY" value={card.expiry} maxLength={5} onChange={e=>setCard(p=>({...p,expiry:fmtExp(e.target.value)}))} style={{width:"100%",background:"#07071a",border:"1px solid #1e1e3a",borderRadius:8,padding:"9px 12px",color:"#fff",fontSize:13,fontFamily:"monospace",outline:"none",boxSizing:"border-box"}}/>
            </div>
            <div>
              <label style={{color:"#444",fontSize:10,fontFamily:"monospace",display:"block",marginBottom:4}}>CVV</label>
              <input placeholder="123" value={card.cvv} maxLength={3} onChange={e=>setCard(p=>({...p,cvv:e.target.value.replace(/\D/g,"")}))} style={{width:"100%",background:"#07071a",border:"1px solid #1e1e3a",borderRadius:8,padding:"9px 12px",color:"#fff",fontSize:13,fontFamily:"monospace",outline:"none",boxSizing:"border-box"}}/>
            </div>
          </div>
          <div style={{display:"flex",alignItems:"center",gap:6,marginBottom:14,color:"#333",fontSize:10}}>🔒 Pagesa e sigurt SSL · Rimburso brenda 7 ditëve</div>
          <button onClick={pay} style={{width:"100%",padding:"13px",borderRadius:12,border:"none",cursor:"pointer",background:`linear-gradient(135deg,${plan.color},${plan.color}cc)`,color:"#fff",fontWeight:900,fontSize:15,boxShadow:`0 4px 20px ${plan.color}44`}}>Paguaj €{price} →</button>
        </>}
        {step===1&&<div style={{textAlign:"center",padding:"40px 20px"}}>
          <div style={{fontSize:40,marginBottom:16,animation:"spin 1s linear infinite"}}>⟳</div>
          <div style={{fontWeight:700,fontSize:16,marginBottom:6}}>Duke procesuar...</div>
          <div style={{color:"#555",fontSize:12}}>Mos e mbyll faqen</div>
        </div>}
        {step===2&&<div style={{textAlign:"center",padding:"30px 20px"}}>
          <div style={{fontSize:52,marginBottom:14,animation:"pop .4s ease"}}>🎉</div>
          <div style={{fontWeight:700,fontSize:18,color:plan.color,marginBottom:6}}>{plan.name} Aktiv!</div>
          <div style={{color:"#888",fontSize:13,lineHeight:1.6}}>Mirë se vini! Tani mund të lidhni TikTok-un. 🦅</div>
        </div>}
      </div>
    </div>
  );
}

// ─── LOGIN ────────────────────────────────────────────────────────────────────
function Login({onLogin}){
  const [mode,setMode]=useState("login");
  const [form,setForm]=useState({username:"",email:"",password:"",game:"Valorant"});
  const [loading,setLoading]=useState(false);
  const [err,setErr]=useState("");
  const submit=()=>{
    if(!form.username||!form.password){setErr("Plotëso të gjitha fushat!");return;}
    if(mode==="register"&&!form.email){setErr("Email-i është i detyrueshëm!");return;}
    setErr("");setLoading(true);
    setTimeout(()=>{
      setLoading(false);
      onLogin({username:form.username,email:form.email||`${form.username}@ag.gg`,game:form.game,avatar:"🎮",color:"#7c3aed",rank:"Newcomer",followers:0,hype:10,bio:"Streamer i ri në AlbanianGamers 🎮",plan:"free",tiktok:null});
    },1200);
  };
  const fields=mode==="register"
    ?[{k:"username",ph:"Username (NeonViper_GG)",l:"Username"},{k:"email",ph:"email@tua.com",l:"Email"},{k:"password",ph:"Fjalëkalimi",l:"Password",t:"password"}]
    :[{k:"username",ph:"Username ose Email",l:"Username / Email"},{k:"password",ph:"Fjalëkalimi",l:"Password",t:"password"}];
  return(
    <div style={{minHeight:"100%",background:"#07071a",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:24,position:"relative",overflow:"hidden"}}>
      {[...Array(8)].map((_,i)=>(
        <div key={i} style={{position:"absolute",width:2,height:2,borderRadius:"50%",background:["#ef4444","#f59e0b","#00ff88","#7c3aed","#22d3ee","#a855f7","#ff0050","#10b981"][i],left:`${8+i*12}%`,top:`${15+(i*13)%70}%`,boxShadow:`0 0 ${10+i*3}px currentColor`,opacity:.7}}/>
      ))}
      <div style={{textAlign:"center",marginBottom:28,zIndex:1}}>
        <div style={{fontSize:52,marginBottom:8,filter:"drop-shadow(0 0 20px #ef4444)"}}>🦅</div>
        <div style={{fontSize:28,fontWeight:900,background:"linear-gradient(90deg,#ef4444,#f59e0b)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>ALBANIAN</div>
        <div style={{fontSize:28,fontWeight:900,background:"linear-gradient(90deg,#f59e0b,#ef4444)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",marginTop:-4}}>GAMERS</div>
        <div style={{color:"#444",fontSize:11,marginTop:6,fontFamily:"monospace"}}>Platforma e streamerëve shqiptarë 🇦🇱</div>
      </div>
      <div style={{width:"100%",maxWidth:340,background:"#0d0d1f",border:"1px solid #1e1e3a",borderRadius:18,padding:22,zIndex:1}}>
        <div style={{display:"flex",background:"#07071a",borderRadius:10,padding:4,marginBottom:18}}>
          {["login","register"].map(m=>(
            <button key={m} onClick={()=>{setMode(m);setErr("");}} style={{flex:1,padding:"8px",borderRadius:7,border:"none",cursor:"pointer",background:mode===m?"linear-gradient(135deg,#ef4444,#f59e0b)":"transparent",color:mode===m?"#fff":"#555",fontWeight:700,fontSize:12,transition:"all .2s"}}>
              {m==="login"?"HYRJE":"REGJISTROHU"}
            </button>
          ))}
        </div>
        {fields.map(f=>(
          <div key={f.k} style={{marginBottom:12}}>
            <label style={{color:"#555",fontSize:10,fontFamily:"monospace",display:"block",marginBottom:4}}>{f.l}</label>
            <input type={f.t||"text"} placeholder={f.ph} value={form[f.k]} onChange={e=>setForm(p=>({...p,[f.k]:e.target.value}))} onKeyDown={e=>e.key==="Enter"&&submit()}
              style={{width:"100%",background:"#07071a",border:"1px solid #1e1e3a",borderRadius:8,padding:"9px 12px",color:"#fff",fontSize:13,fontFamily:"monospace",outline:"none",boxSizing:"border-box"}}/>
          </div>
        ))}
        {mode==="register"&&(
          <div style={{marginBottom:12}}>
            <label style={{color:"#555",fontSize:10,fontFamily:"monospace",display:"block",marginBottom:4}}>Loja kryesore</label>
            <select value={form.game} onChange={e=>setForm(p=>({...p,game:e.target.value}))} style={{width:"100%",background:"#07071a",border:"1px solid #1e1e3a",borderRadius:8,padding:"9px 12px",color:"#fff",fontSize:13,fontFamily:"monospace",outline:"none"}}>
              {GAMES.map(g=><option key={g.name} value={g.name}>{g.icon} {g.name}</option>)}
            </select>
          </div>
        )}
        {err&&<div style={{color:"#ef4444",fontSize:11,fontFamily:"monospace",marginBottom:10}}>⚠ {err}</div>}
        <button onClick={submit} disabled={loading} style={{width:"100%",padding:"11px",borderRadius:10,border:"none",background:loading?"#333":"linear-gradient(135deg,#ef4444,#f59e0b)",color:loading?"#888":"#fff",fontWeight:900,fontSize:14,cursor:loading?"not-allowed":"pointer",transition:"all .2s"}}>
          {loading?"Duke hyrë...":mode==="login"?"HYRJE →":"KRIJO LLOGARINË →"}
        </button>
        <div style={{textAlign:"center",marginTop:12,color:"#444",fontSize:11}}>
          <span style={{color:"#f59e0b",cursor:"pointer"}} onClick={()=>onLogin({username:"Guest",email:"guest@ag.gg",game:"Valorant",avatar:"👤",color:"#6366f1",rank:"Newcomer",followers:0,hype:0,bio:"",plan:"free",tiktok:null})}>Vazhdo si mysafir →</span>
        </div>
      </div>
    </div>
  );
}

// ─── HOME ─────────────────────────────────────────────────────────────────────
function Home({user,streamers,onHype,onProfile,onNav}){
  const [tick,setTick]=useState(0);
  useEffect(()=>{const t=setInterval(()=>setTick(p=>(p+1)%TICKS.length),3200);return()=>clearInterval(t);},[]);
  const live=streamers.filter(s=>s.isLive).length;
  return(
    <div>
      <div style={{background:"#0a0a1f",borderBottom:"1px solid #1e1e3a",padding:"7px 16px",display:"flex",alignItems:"center",gap:8}}>
        <span style={{background:"#ef4444",color:"#fff",fontSize:8,padding:"2px 5px",borderRadius:3,fontWeight:700,fontFamily:"monospace",animation:"pulse 1.5s infinite"}}>● LIVE</span>
        <span style={{color:"#666",fontSize:11,fontFamily:"monospace"}}>{TICKS[tick]}</span>
      </div>
      <div style={{padding:16}}>
        <div style={{background:"linear-gradient(135deg,#1a0a0a,#1a0a1a,#0a0a2a)",border:"1px solid #2d1b1b",borderRadius:16,padding:"18px 16px",marginBottom:16,position:"relative",overflow:"hidden"}}>
          <div style={{position:"absolute",top:-30,right:-30,width:130,height:130,background:"radial-gradient(circle,#ef444422,transparent 70%)",borderRadius:"50%",pointerEvents:"none"}}/>
          <div style={{fontSize:10,color:"#ef4444",fontFamily:"monospace",letterSpacing:3,marginBottom:5}}>🦅 ALBANIAN GAMERS</div>
          <div style={{fontWeight:900,fontSize:20,lineHeight:1.2,marginBottom:8}}>
            Rritu si<br/><span style={{background:"linear-gradient(90deg,#ef4444,#f59e0b)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>Streamer</span>
          </div>
          <p style={{color:"#777",fontSize:12,lineHeight:1.6,marginBottom:12}}>Hype njëri-tjetrin. Raid bashkë. Rritu bashkë. 🇦🇱</p>
          <div style={{display:"flex",gap:8}}>
            <button onClick={()=>onNav("live")} style={{background:"linear-gradient(135deg,#ef4444,#f59e0b)",border:"none",borderRadius:8,color:"#fff",padding:"8px 14px",fontSize:12,fontWeight:700,cursor:"pointer"}}>⚡ Shko Live</button>
            <button onClick={()=>onNav("chat")} style={{background:"#ffffff11",border:"1px solid #333",borderRadius:8,color:"#aaa",padding:"8px 14px",fontSize:12,cursor:"pointer"}}>💬 Chat</button>
          </div>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:10,marginBottom:16}}>
          {[{l:"Live Tani",v:live,i:"🔴",c:"#ef4444"},{l:"Anëtarë",v:"18.2K",i:"👥",c:"#7c3aed"},{l:"Raid Sot",v:"341",i:"🚀",c:"#f59e0b"}].map(s=>(
            <div key={s.l} style={{background:"#0d0d1f",border:`1px solid ${s.c}22`,borderRadius:10,padding:"12px 4px",textAlign:"center"}}>
              <div style={{fontSize:18,marginBottom:3}}>{s.i}</div>
              <div style={{fontWeight:700,fontSize:15,color:s.c}}>{s.v}</div>
              <div style={{color:"#444",fontSize:9,marginTop:2}}>{s.l}</div>
            </div>
          ))}
        </div>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:10}}>
          <span style={{fontWeight:700,fontSize:14}}>🔥 Top Hype Tani</span>
          <span onClick={()=>onNav("live")} style={{color:"#ef4444",fontSize:11,cursor:"pointer"}}>Shiko →</span>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
          {streamers.filter(s=>s.isLive).slice(0,4).map(s=><SCard key={s.id} s={s} onHype={onHype} onProfile={onProfile}/>)}
        </div>
      </div>
    </div>
  );
}

// ─── LIVE ─────────────────────────────────────────────────────────────────────
function Live({streamers,onHype,onProfile}){
  const [f,setF]=useState("all");
  const list=f==="live"?streamers.filter(s=>s.isLive):f==="offline"?streamers.filter(s=>!s.isLive):streamers;
  return(
    <div style={{padding:16}}>
      <div style={{marginBottom:12}}><div style={{fontWeight:700,fontSize:16,marginBottom:3}}>🎥 Streamerat</div><p style={{color:"#555",fontSize:12}}>Jep hype kolegjëve shqiptarë!</p></div>
      <div style={{display:"flex",gap:8,marginBottom:14}}>
        {[["all","Të gjithë"],["live","● Live"],["offline","Offline"]].map(([v,l])=>(
          <button key={v} onClick={()=>setF(v)} style={{padding:"6px 12px",borderRadius:20,border:`1px solid ${f===v?"#ef4444":"#1e1e3a"}`,background:f===v?"#ef444422":"transparent",color:f===v?"#ef4444":"#555",fontSize:11,cursor:"pointer",fontFamily:"monospace",fontWeight:700}}>{l}</button>
        ))}
      </div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:14}}>
        {list.map(s=><SCard key={s.id} s={s} onHype={onHype} onProfile={onProfile}/>)}
      </div>
      <div style={{background:"linear-gradient(135deg,#1a0a0a,#1a0a1a)",border:"1px solid #ef444433",borderRadius:14,padding:16,textAlign:"center"}}>
        <div style={{fontSize:26,marginBottom:6}}>🚀</div>
        <div style={{fontWeight:700,fontSize:14,marginBottom:6}}>Organizo Raid Train</div>
        <p style={{color:"#666",fontSize:11,marginBottom:12,lineHeight:1.5}}>Mbledh 3+ streamera dhe kryeni raid me radhë — gjithkush fiton viewers!</p>
        <div style={{display:"flex",justifyContent:"center",marginBottom:12}}>
          {streamers.filter(s=>s.isLive).slice(0,4).map((s,i)=>(
            <div key={s.id} style={{width:30,height:30,borderRadius:"50%",background:`${s.color}22`,border:`2px solid ${s.color}`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:13,marginLeft:i>0?-8:0,zIndex:4-i}}>{s.avatar}</div>
          ))}
        </div>
        <button style={{background:"linear-gradient(135deg,#ef4444,#f59e0b)",border:"none",borderRadius:8,color:"#fff",padding:"10px 22px",fontSize:13,fontWeight:700,cursor:"pointer"}}>⚡ NIS RAID TRAIN</button>
      </div>
    </div>
  );
}

// ─── GAMES ────────────────────────────────────────────────────────────────────
function GamesScreen(){
  const [sel,setSel]=useState(null);
  return(
    <div style={{padding:16}}>
      <div style={{marginBottom:12}}><div style={{fontWeight:700,fontSize:16,marginBottom:3}}>🎮 Lojrat & Komunitetet</div><p style={{color:"#555",fontSize:12}}>Gjej streamera të lojës tënde</p></div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:14}}>
        {GAMES.map(g=>(
          <div key={g.name} onClick={()=>setSel(sel===g.name?null:g.name)} style={{background:sel===g.name?`${g.color}15`:"#0d0d1f",border:`1px solid ${sel===g.name?g.color:"#1e1e3a"}`,borderRadius:12,padding:14,cursor:"pointer",transition:"all .25s",boxShadow:sel===g.name?`0 0 16px ${g.color}22`:"none"}}>
            <div style={{fontSize:26,marginBottom:7}}>{g.icon}</div>
            <div style={{fontWeight:700,fontSize:13}}>{g.name}</div>
            <div style={{color:g.color,fontSize:10,fontFamily:"monospace",marginTop:3}}>{g.streamers} streamera</div>
            {sel===g.name&&<button style={{marginTop:10,width:"100%",padding:"7px",background:`${g.color}22`,border:`1px solid ${g.color}55`,borderRadius:6,color:g.color,fontWeight:700,fontSize:11,cursor:"pointer"}}>Bashkohu →</button>}
          </div>
        ))}
      </div>
      <div style={{background:"#0d0d1f",border:"1px solid #1e1e3a",borderRadius:14,padding:14}}>
        <div style={{fontWeight:700,fontSize:13,marginBottom:10}}>📊 Trending Kësaj Jave</div>
        {GAMES.slice(0,5).map((g,i)=>(
          <div key={g.name} style={{display:"flex",alignItems:"center",gap:10,padding:"7px 0",borderBottom:i<4?"1px solid #0f0f22":"none"}}>
            <span style={{color:"#333",fontSize:10,width:14,fontFamily:"monospace"}}>#{i+1}</span>
            <span style={{fontSize:15}}>{g.icon}</span>
            <span style={{flex:1,fontSize:12,fontWeight:600}}>{g.name}</span>
            <span style={{color:g.color,fontSize:10,fontFamily:"monospace"}}>↑{[24,18,31,12,27][i]}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── CHAT ─────────────────────────────────────────────────────────────────────
function Chat({user}){
  const [room,setRoom]=useState(null);
  const [msgs,setMsgs]=useState(INIT_MSGS);
  const [inp,setInp]=useState("");
  const endRef=useRef(null);
  useEffect(()=>{endRef.current?.scrollIntoView({behavior:"smooth"});},[msgs,room]);
  const send=()=>{
    if(!inp.trim()||!room)return;
    setMsgs(p=>({...p,[room]:[...(p[room]||[]),{user:user.username,avatar:user.avatar,color:user.color,text:inp.trim(),time:new Date().toTimeString().slice(0,5)}]}));
    setInp("");
  };
  const cur=CHAT_ROOMS.find(r=>r.id===room);
  if(room)return(
    <div style={{display:"flex",flexDirection:"column",height:"calc(100vh - 120px)"}}>
      <div style={{padding:"10px 14px",borderBottom:"1px solid #1e1e3a",display:"flex",alignItems:"center",gap:10,background:"#09091f"}}>
        <button onClick={()=>setRoom(null)} style={{background:"none",border:"none",color:"#888",cursor:"pointer",fontSize:18}}>←</button>
        <span style={{fontSize:16}}>{cur?.icon}</span>
        <div><div style={{fontWeight:700,fontSize:13,color:cur?.color}}>{cur?.name}</div><div style={{color:"#444",fontSize:10,fontFamily:"monospace"}}>{cur?.desc}</div></div>
      </div>
      <div style={{flex:1,overflowY:"auto",padding:"12px 14px",display:"flex",flexDirection:"column",gap:10}}>
        {(msgs[room]||[]).map((m,i)=>(
          <div key={i} style={{display:"flex",gap:10}}>
            <Av emoji={m.avatar} color={m.color} size={30}/>
            <div style={{flex:1}}>
              <div style={{display:"flex",gap:8,alignItems:"baseline",marginBottom:3}}>
                <span style={{color:m.color,fontWeight:700,fontSize:12}}>{m.user}</span>
                <span style={{color:"#333",fontSize:9,fontFamily:"monospace"}}>{m.time}</span>
              </div>
              <div style={{background:"#0d0d1f",border:"1px solid #1e1e3a",borderRadius:"4px 12px 12px 12px",padding:"8px 10px",color:"#ccc",fontSize:13,lineHeight:1.5}}>{m.text}</div>
            </div>
          </div>
        ))}
        <div ref={endRef}/>
      </div>
      <div style={{padding:"10px 14px",borderTop:"1px solid #1e1e3a",display:"flex",gap:8,background:"#09091f"}}>
        <input value={inp} onChange={e=>setInp(e.target.value)} onKeyDown={e=>e.key==="Enter"&&send()} placeholder={`Shkruaj në ${cur?.name}...`}
          style={{flex:1,background:"#0d0d1f",border:"1px solid #1e1e3a",borderRadius:10,padding:"9px 12px",color:"#fff",fontSize:13,fontFamily:"monospace",outline:"none"}}/>
        <button onClick={send} style={{background:"linear-gradient(135deg,#ef4444,#f59e0b)",border:"none",borderRadius:10,color:"#fff",padding:"0 14px",fontSize:16,cursor:"pointer"}}>→</button>
      </div>
    </div>
  );
  return(
    <div style={{padding:16}}>
      <div style={{marginBottom:12}}><div style={{fontWeight:700,fontSize:16,marginBottom:3}}>💬 Chat Rooms</div><p style={{color:"#555",fontSize:12}}>Bashkohu me komunitetin shqiptar</p></div>
      <div style={{display:"flex",flexDirection:"column",gap:10}}>
        {CHAT_ROOMS.map(r=>(
          <div key={r.id} onClick={()=>setRoom(r.id)} style={{background:"#0d0d1f",border:`1px solid ${r.color}22`,borderRadius:12,padding:"13px 14px",display:"flex",alignItems:"center",gap:12,cursor:"pointer"}}>
            <div style={{width:42,height:42,borderRadius:10,background:`${r.color}22`,border:`1px solid ${r.color}44`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:18}}>{r.icon}</div>
            <div style={{flex:1}}><div style={{fontWeight:700,fontSize:13,color:r.color}}>{r.name}</div><div style={{color:"#444",fontSize:11,marginTop:2}}>{r.desc}</div></div>
            {r.unread>0&&<div style={{background:"#ef4444",color:"#fff",fontSize:10,fontWeight:700,borderRadius:"50%",width:20,height:20,display:"flex",alignItems:"center",justifyContent:"center"}}>{r.unread}</div>}
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── COMMUNITY ────────────────────────────────────────────────────────────────
function Community({user,posts,setPosts}){
  const [txt,setTxt]=useState("");
  const [cmtI,setCmtI]=useState({});
  const [openC,setOpenC]=useState({});
  const post=()=>{if(!txt.trim())return;setPosts(p=>[{id:Date.now(),user:user.username,avatar:user.avatar,color:user.color,time:"tani",text:txt.trim(),likes:0,comments:[],liked:false},...p]);setTxt("");};
  const like=id=>setPosts(p=>p.map(x=>x.id===id?{...x,liked:!x.liked,likes:x.liked?x.likes-1:x.likes+1}:x));
  const addC=id=>{const t=cmtI[id];if(!t?.trim())return;setPosts(p=>p.map(x=>x.id===id?{...x,comments:[...x.comments,{user:user.username,avatar:user.avatar,color:user.color,text:t.trim()}]}:x));setCmtI(p=>({...p,[id]:""}));};
  return(
    <div style={{padding:16}}>
      <div style={{marginBottom:12}}><div style={{fontWeight:700,fontSize:16,marginBottom:3}}>🏆 Komuniteti</div><p style={{color:"#555",fontSize:12}}>Ndaj rrugëtimin tënd.</p></div>
      <div style={{background:"#0d0d1f",border:"1px solid #1e1e3a",borderRadius:12,padding:12,marginBottom:14}}>
        <div style={{display:"flex",gap:10,marginBottom:10}}>
          <Av emoji={user.avatar} color={user.color} size={34}/>
          <textarea value={txt} onChange={e=>setTxt(e.target.value)} placeholder="Çfarë po ndodh me streamin tënd sot? 🎮"
            style={{flex:1,background:"#07071a",border:"1px solid #1e1e3a",borderRadius:8,padding:"9px 10px",color:"#fff",fontSize:12,fontFamily:"monospace",resize:"none",height:65,outline:"none"}}/>
        </div>
        <div style={{display:"flex",justifyContent:"flex-end"}}>
          <button onClick={post} style={{background:"linear-gradient(135deg,#ef4444,#f59e0b)",border:"none",borderRadius:8,color:"#fff",padding:"7px 16px",fontSize:12,fontWeight:700,cursor:"pointer"}}>Posto 🚀</button>
        </div>
      </div>
      {posts.map(p=>(
        <div key={p.id} style={{background:"#0d0d1f",border:"1px solid #1e1e3a",borderRadius:12,padding:14,marginBottom:10}}>
          <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:10}}>
            <Av emoji={p.avatar} color={p.color} size={32}/>
            <div><div style={{color:p.color,fontWeight:700,fontSize:12}}>{p.user}</div><div style={{color:"#333",fontSize:10,fontFamily:"monospace"}}>{p.time}</div></div>
          </div>
          <p style={{color:"#ccc",fontSize:13,lineHeight:1.6,marginBottom:10}}>{p.text}</p>
          <div style={{display:"flex",gap:14,paddingBottom:openC[p.id]?10:0,borderBottom:openC[p.id]?"1px solid #111128":"none"}}>
            <button onClick={()=>like(p.id)} style={{background:"none",border:"none",cursor:"pointer",color:p.liked?"#f59e0b":"#555",fontSize:12,fontWeight:700,transition:"color .2s"}}>{p.liked?"🔥":"🤍"} {p.likes}</button>
            <button onClick={()=>setOpenC(x=>({...x,[p.id]:!x[p.id]}))} style={{background:"none",border:"none",cursor:"pointer",color:"#555",fontSize:12,fontWeight:700}}>💬 {p.comments.length}</button>
            <button style={{background:"none",border:"none",cursor:"pointer",color:"#555",fontSize:12,fontWeight:700}}>🔁 Raid</button>
          </div>
          {openC[p.id]&&(
            <div style={{marginTop:10}}>
              {p.comments.map((c,i)=>(
                <div key={i} style={{display:"flex",gap:8,marginBottom:7}}>
                  <Av emoji={c.avatar} color={c.color} size={24}/>
                  <div style={{flex:1,background:"#07071a",borderRadius:8,padding:"6px 10px"}}>
                    <span style={{color:c.color,fontSize:10,fontWeight:700}}>{c.user} </span>
                    <span style={{color:"#aaa",fontSize:12}}>{c.text}</span>
                  </div>
                </div>
              ))}
              <div style={{display:"flex",gap:8,marginTop:8}}>
                <input value={cmtI[p.id]||""} onChange={e=>setCmtI(x=>({...x,[p.id]:e.target.value}))} onKeyDown={e=>e.key==="Enter"&&addC(p.id)} placeholder="Komento..."
                  style={{flex:1,background:"#07071a",border:"1px solid #1e1e3a",borderRadius:8,padding:"6px 10px",color:"#fff",fontSize:12,fontFamily:"monospace",outline:"none"}}/>
                <button onClick={()=>addC(p.id)} style={{background:"#ef4444",border:"none",borderRadius:8,color:"#fff",padding:"0 12px",cursor:"pointer"}}>→</button>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

// ─── PROFILE ──────────────────────────────────────────────────────────────────
function Profile({user,setUser,onNav}){
  const [tikModal,setTikModal]=useState(false);
  const [payModal,setPayModal]=useState(null);
  const [yearly,setYearly]=useState(false);
  const [tab,setTab]=useState("profile");
  const plan=PLANS.find(p=>p.id===user.plan)||PLANS[0];
  const canTikTok=user.plan==="spark"||user.plan==="pro";

  const handleTikSuccess=(data)=>setUser(u=>({...u,tiktok:data}));
  const handlePaySuccess=(planId)=>setUser(u=>({...u,plan:planId}));
  const handleTikLive=()=>setUser(u=>({...u,tiktok:u.tiktok?{...u.tiktok,isLive:!u.tiktok.isLive,viewers:!u.tiktok.isLive?127:0}:u.tiktok}));

  return(
    <div style={{padding:16}}>
      {tikModal&&<TikTokModal onClose={()=>setTikModal(false)} onSuccess={handleTikSuccess}/>}
      {payModal&&<PayModal plan={payModal} yearly={yearly} onClose={()=>setPayModal(null)} onSuccess={handlePaySuccess}/>}

      {/* Sub tabs */}
      <div style={{display:"flex",background:"#0a0a1a",borderRadius:10,padding:3,marginBottom:16}}>
        {[["profile","👤 Profili"],["tiktok","🎵 TikTok"],["premium","⚡ Premium"]].map(([id,label])=>(
          <button key={id} onClick={()=>setTab(id)} style={{flex:1,padding:"8px 4px",borderRadius:8,border:"none",cursor:"pointer",background:tab===id?"linear-gradient(135deg,#1a1a3a,#1e1e40)":"transparent",color:tab===id?"#fff":"#444",fontWeight:700,fontSize:10,borderBottom:tab===id?"2px solid #ef4444":"2px solid transparent",transition:"all .2s"}}>
            {label}
          </button>
        ))}
      </div>

      {/* PROFILE TAB */}
      {tab==="profile"&&<>
        <div style={{background:"linear-gradient(135deg,#1a0a0a,#0a0a1a)",border:"1px solid #2d1b1b",borderRadius:16,padding:20,marginBottom:14,textAlign:"center",position:"relative",overflow:"hidden"}}>
          <div style={{position:"absolute",top:0,left:0,right:0,height:3,background:`linear-gradient(90deg,transparent,${user.color},transparent)`}}/>
          <div style={{width:66,height:66,borderRadius:"50%",background:`${user.color}22`,border:`3px solid ${user.color}`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:30,margin:"0 auto 10px"}}>{user.avatar}</div>
          <div style={{fontWeight:700,fontSize:19,marginBottom:3}}>{user.username}</div>
          <div style={{color:user.color,fontSize:12,fontFamily:"monospace",marginBottom:6}}>{user.game}</div>
          <div style={{display:"flex",justifyContent:"center",gap:6,marginBottom:8}}>
            <Bdg label={user.rank} color={user.color}/>
            {user.plan!=="free"&&<Bdg label={`${plan.icon} ${plan.name}`} color={plan.color}/>}
            {user.tiktok&&<span style={{background:"#ff005022",color:"#ff0050",fontSize:9,padding:"2px 7px",borderRadius:20,fontFamily:"monospace",fontWeight:700}}>{user.tiktok.isLive?"● TikTok LIVE":"🎵 TikTok ✓"}</span>}
          </div>
          <p style={{color:"#555",fontSize:12,lineHeight:1.5}}>{user.bio||"Streamer i ri në AlbanianGamers 🎮"}</p>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:14}}>
          {[{l:"Followers",v:user.followers||0,i:"❤"},{l:"Hype Score",v:user.hype||0,i:"⚡"},{l:"Streamet",v:0,i:"🎥"},{l:"Raid Bërë",v:0,i:"🚀"}].map(s=>(
            <div key={s.l} style={{background:"#0d0d1f",border:"1px solid #1e1e3a",borderRadius:10,padding:12,textAlign:"center"}}>
              <div style={{fontSize:18,marginBottom:3}}>{s.i}</div>
              <div style={{fontWeight:700,fontSize:17,color:user.color}}>{s.v}</div>
              <div style={{color:"#444",fontSize:10,marginTop:2}}>{s.l}</div>
            </div>
          ))}
        </div>
        <div style={{background:"#0d0d1f",border:"1px solid #1e1e3a",borderRadius:12,overflow:"hidden",marginBottom:14}}>
          {[{i:"🔔",l:"Njoftimet Push",s:"Aktivizuar"},{i:"🎮",l:"Loja kryesore",s:user.game},{i:"🔒",l:"Privatësia",s:"Publik"},{i:"💳",l:"Plani aktual",s:`${plan.icon} ${plan.name}`}].map((x,idx)=>(
            <div key={x.l} onClick={()=>{if(idx===3)setTab("premium");}} style={{display:"flex",alignItems:"center",gap:12,padding:"12px 14px",borderBottom:idx<3?"1px solid #0f0f22":"none",cursor:"pointer"}}>
              <span style={{fontSize:17}}>{x.i}</span>
              <div style={{flex:1}}><div style={{fontSize:13,fontWeight:600}}>{x.l}</div><div style={{color:"#444",fontSize:10,fontFamily:"monospace"}}>{x.s}</div></div>
              <span style={{color:"#2a2a3a"}}>›</span>
            </div>
          ))}
        </div>
        <button onClick={()=>setUser(null)} style={{width:"100%",padding:"11px",background:"#1a0a0a",border:"1px solid #ef444433",borderRadius:10,color:"#ef4444",fontWeight:700,fontSize:13,cursor:"pointer"}}>← Dil nga llogaria</button>
      </>}

      {/* TIKTOK TAB */}
      {tab==="tiktok"&&<>
        <div style={{background:user.tiktok?.isLive?"linear-gradient(135deg,#1a0010,#0a0a1a)":"linear-gradient(135deg,#100a14,#0a0a1a)",border:`1px solid ${user.tiktok?.isLive?"#ff005088":user.tiktok?"#ff005044":"#1e1e3a"}`,borderRadius:18,padding:20,marginBottom:14,position:"relative",overflow:"hidden",boxShadow:user.tiktok?.isLive?"0 0 40px #ff005033":"none",transition:"all .4s"}}>
          {user.tiktok?.isLive&&<div style={{position:"absolute",top:0,left:0,right:0,height:2,background:"linear-gradient(90deg,transparent,#ff0050,#00f2ea,transparent)"}}/>}
          <div style={{display:"flex",alignItems:"center",gap:14,marginBottom:16}}>
            <div style={{width:52,height:52,borderRadius:14,fontSize:24,display:"flex",alignItems:"center",justifyContent:"center",background:"linear-gradient(135deg,#ff005022,#00f2ea11)",border:`2px solid ${user.tiktok?"#ff005066":"#1e1e3a"}`,boxShadow:user.tiktok?.isLive?"0 0 24px #ff005055":"none",flexShrink:0}}>🎵</div>
            <div style={{flex:1}}>
              <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:3}}>
                <span style={{fontWeight:900,fontSize:16,background:"linear-gradient(90deg,#ff0050,#00f2ea)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>TikTok</span>
                {user.tiktok?.isLive&&<span style={{display:"flex",alignItems:"center",gap:5,background:"#ff005022",border:"1px solid #ff005066",borderRadius:20,padding:"2px 8px"}}><Dot color="#ff0050" size={6}/><span style={{color:"#ff0050",fontSize:10,fontWeight:700,fontFamily:"monospace"}}>LIVE</span></span>}
                {user.tiktok&&!user.tiktok.isLive&&<span style={{background:"#10b98122",color:"#10b981",fontSize:10,padding:"2px 8px",borderRadius:20,fontFamily:"monospace",fontWeight:700}}>✓ LIDHUR</span>}
              </div>
              <div style={{color:"#555",fontSize:11,fontFamily:"monospace"}}>{user.tiktok?`@${user.tiktok.username}`:"TikTok LIVE sync automatik"}</div>
            </div>
            {!canTikTok&&<div style={{background:"#f59e0b22",border:"1px solid #f59e0b44",borderRadius:8,padding:"4px 10px"}}><span style={{color:"#f59e0b",fontSize:10,fontWeight:700,fontFamily:"monospace"}}>⚡ SPARK+</span></div>}
          </div>

          {user.tiktok&&(
            <div style={{background:"#07071a",borderRadius:12,padding:14,marginBottom:14}}>
              <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:user.tiktok.isLive?12:0}}>
                <div style={{width:38,height:38,borderRadius:"50%",background:"#ff005022",border:"2px solid #ff005066",display:"flex",alignItems:"center",justifyContent:"center",fontSize:16}}>🦅</div>
                <div><div style={{fontWeight:700,fontSize:13}}>{user.tiktok.displayName}</div><div style={{color:"#ff0050",fontSize:10,fontFamily:"monospace"}}>@{user.tiktok.username} · {user.tiktok.followers.toLocaleString()} followers</div></div>
              </div>
              {user.tiktok.isLive&&(
                <div>
                  <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:8,marginTop:12,marginBottom:10}}>
                    {[["👁",user.tiktok.viewers,"Viewers"],["⏱","23:14","Kohëzgjatja"],["🔄","42s","Refresh"]].map(([ic,v,l])=>(
                      <div key={l} style={{background:"#0d0d1f",borderRadius:8,padding:"8px 4px",textAlign:"center"}}>
                        <div style={{fontSize:13,marginBottom:2}}>{ic}</div>
                        <div style={{color:"#ff0050",fontWeight:700,fontSize:12,fontFamily:"monospace"}}>{v}</div>
                        <div style={{color:"#333",fontSize:8,marginTop:1}}>{l}</div>
                      </div>
                    ))}
                  </div>
                  <div style={{background:"#ff005011",border:"1px solid #ff005033",borderRadius:8,padding:"8px 12px",display:"flex",alignItems:"center",gap:8}}>
                    <Dot color="#ff0050" size={6}/><span style={{color:"#ff0050",fontSize:11,fontFamily:"monospace"}}>Albanian Gamers po shfaq statusin tënd LIVE!</span>
                  </div>
                </div>
              )}
              {!user.tiktok.isLive&&<div style={{color:"#333",fontSize:10,fontFamily:"monospace",marginTop:8}}>🔄 Kontrollohet çdo 60s · Herën e fundit: tani</div>}
            </div>
          )}

          {!user.tiktok&&(
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:16}}>
              {[{i:"🔴",t:"Live automatik",d:"Detekton LIVE-in TikTok"},{i:"🔔",t:"Push followers",d:"Njofton fansat"},{i:"📊",t:"Stats real-time",d:"Viewers, likes"},{i:"🚀",t:"Hype nga app",d:"Komuniteti shikon"}].map(f=>(
                <div key={f.t} style={{background:"#07071a",borderRadius:10,padding:"10px"}}>
                  <div style={{fontSize:16,marginBottom:4}}>{f.i}</div>
                  <div style={{fontWeight:700,fontSize:11,marginBottom:2}}>{f.t}</div>
                  <div style={{color:"#444",fontSize:10,lineHeight:1.4}}>{f.d}</div>
                </div>
              ))}
            </div>
          )}

          <div style={{display:"flex",gap:8}}>
            {!user.tiktok&&(
              <button onClick={()=>{if(!canTikTok){setTab("premium");}else{setTikModal(true);}}} style={{flex:1,padding:"12px",border:"none",borderRadius:12,cursor:"pointer",background:canTikTok?"linear-gradient(135deg,#ff0050,#ff0050cc)":"linear-gradient(135deg,#1a1a2e,#1e1e3a)",color:canTikTok?"#fff":"#666",fontWeight:700,fontSize:13,boxShadow:canTikTok?"0 4px 20px #ff005044":"none"}}>
                {canTikTok?"🎵 Lidh TikTok-un":"🔒 Kërkon Spark Plan"}
              </button>
            )}
            {user.tiktok&&<>
              <button onClick={handleTikLive} style={{flex:1,padding:"10px",borderRadius:10,border:`1px solid ${user.tiktok.isLive?"#ff005066":"#333"}`,cursor:"pointer",background:user.tiktok.isLive?"#ff005022":"#0f0f1a",color:user.tiktok.isLive?"#ff0050":"#888",fontWeight:700,fontSize:12,display:"flex",alignItems:"center",justifyContent:"center",gap:6}}>
                {user.tiktok.isLive?<><Dot color="#ff0050" size={6}/> Ndale LIVE</>:<>▶ Testo LIVE</>}
              </button>
              <button onClick={()=>setUser(u=>({...u,tiktok:null}))} style={{padding:"10px 14px",borderRadius:10,border:"1px solid #ef444433",cursor:"pointer",background:"#1a0a0a",color:"#ef4444",fontWeight:700,fontSize:12}}>✕</button>
            </>}
          </div>
        </div>

        <div style={{background:"#0d0d1f",border:"1px solid #1e1e3a",borderRadius:12,padding:14}}>
          <div style={{fontWeight:700,fontSize:12,color:"#ff0050",marginBottom:10}}>📋 Si të marrësh TikTok API:</div>
          {[{n:1,t:"Shko te developers.tiktok.com"},{n:2,t:"Krijo App → Entertainment"},{n:3,t:"Kërko scopes: user.info.basic + live.info"},{n:4,t:"Prit aprovimin (~3-14 ditë)"},{n:5,t:"Vendos çelësin në .env → Deploy → Gati!"}].map(s=>(
            <div key={s.n} style={{display:"flex",gap:10,marginBottom:9,alignItems:"center"}}>
              <span style={{background:"#ff005022",color:"#ff0050",fontSize:10,fontWeight:700,borderRadius:"50%",width:20,height:20,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>{s.n}</span>
              <span style={{color:"#666",fontSize:12}}>{s.t}</span>
            </div>
          ))}
        </div>
      </>}

      {/* PREMIUM TAB */}
      {tab==="premium"&&<>
        <div style={{display:"flex",alignItems:"center",justifyContent:"center",gap:12,marginBottom:18}}>
          <span style={{color:!yearly?"#fff":"#444",fontSize:13,fontWeight:700}}>Mujor</span>
          <div onClick={()=>setYearly(!yearly)} style={{width:46,height:26,borderRadius:13,background:yearly?"#10b981":"#1e1e3a",position:"relative",cursor:"pointer",transition:"background .3s",border:"1px solid #333"}}>
            <div style={{width:20,height:20,borderRadius:"50%",background:"#fff",position:"absolute",top:2,left:yearly?22:2,transition:"left .3s",boxShadow:"0 2px 6px #0005"}}/>
          </div>
          <span style={{color:yearly?"#10b981":"#444",fontSize:13,fontWeight:700}}>Vjetor <span style={{background:"#10b98122",color:"#10b981",fontSize:9,padding:"2px 6px",borderRadius:20,fontFamily:"monospace",marginLeft:4}}>-17%</span></span>
        </div>
        <div style={{display:"flex",flexDirection:"column",gap:12,marginBottom:18}}>
          {PLANS.map(p=>{
            const isCur=user.plan===p.id;
            const price=yearly&&p.price>0?(p.price*10).toFixed(2):p.price;
            return(
              <div key={p.id} style={{background:isCur?`linear-gradient(160deg,${p.color}18,#0d0d1f)`:"#0d0d1f",border:`1.5px solid ${isCur?p.color+"88":p.badge?p.color+"44":"#1e1e3a"}`,borderRadius:16,padding:18,position:"relative",overflow:"hidden",boxShadow:isCur?`0 0 28px ${p.color}33`:"none"}}>
                {p.badge&&<div style={{position:"absolute",top:12,right:12,background:p.badge==="MË POPULLAR"?`linear-gradient(135deg,${p.color},${p.color}cc):`${p.color}22`,color:p.badge==="MË POPULLAR"?"#fff":p.color,fontSize:8,padding:"3px 8px",borderRadius:20,fontWeight:700,fontFamily:"monospace"}}>{p.badge}</div>}
                <div style={{marginBottom:12}}>
                  <div style={{fontSize:22,marginBottom:4}}>{p.icon}</div>
                  <div style={{fontWeight:700,fontSize:14,color:p.color,marginBottom:3}}>{p.name}</div>
                  {p.price===0?<div style={{fontWeight:900,fontSize:20}}>Falas</div>:<div style={{display:"flex",alignItems:"baseline",gap:4}}><span style={{fontWeight:900,fontSize:20}}>€{price}</span><span style={{color:"#555",fontSize:11}}>/{yearly?"vit":"muaj"}</span></div>}
                  {yearly&&p.price>0&&<div style={{color:"#10b981",fontSize:10,fontFamily:"monospace",marginTop:2}}>Kursej €{(p.price*2).toFixed(2)}/vit 🎉</div>}
                </div>
                <div style={{marginBottom:12}}>
                  {p.features.map((f,i)=>(
                    <div key={i} style={{display:"flex",alignItems:"flex-start",gap:8,marginBottom:6}}>
                      <span style={{color:f.inc?p.color:"#2a2a3a",fontSize:12,flexShrink:0,marginTop:1}}>{f.inc?"✓":"✕"}</span>
                      <span style={{color:f.inc?"#ccc":"#333",fontSize:11}}>{f.t}</span>
                    </div>
                  ))}
                </div>
                <button onClick={()=>{if(!isCur&&p.price>0)setPayModal(p);}} disabled={isCur||p.price===0} style={{width:"100%",padding:"10px",borderRadius:10,border:"none",cursor:isCur||p.price===0?"default":"pointer",background:isCur?`${p.color}22`:p.price===0?"#1a1a2e":`linear-gradient(135deg,${p.color}cc,${p.color})`,color:isCur?p.color:p.price===0?"#555":"#fff",fontWeight:700,fontSize:12,boxShadow:!isCur&&p.price>0?`0 4px 16px ${p.color}44`:"none"}}>
                  {isCur?"✓ Plani Aktual":p.price===0?"Fillo Falas":`Merr ${p.name} →`}
                </button>
              </div>
            );
          })}
        </div>
        <div style={{background:"#0d0d1f",border:"1px solid #1e1e3a",borderRadius:12,padding:14}}>
          <div style={{fontWeight:700,fontSize:12,marginBottom:10}}>🔒 Siguria & Politikat</div>
          {["Anulo kudo, asnjë penalizim","Rimburso brenda 7 ditëve pa pyetje","Pagesa e sigurt me SSL · Stripe / PayPal","Të dhënat fshihen nëse fshini llogarinë"].map((t,i)=>(
            <div key={i} style={{display:"flex",alignItems:"center",gap:8,marginBottom:6,color:"#555",fontSize:11}}><span style={{color:"#10b981"}}>✓</span>{t}</div>
          ))}
        </div>
      </>}
    </div>
  );
}

// ─── ROOT APP ─────────────────────────────────────────────────────────────────
export default function App(){
  const [user,setUser]=useState(null);
  const [tab,setTab]=useState("home");
  const [streamers,setStreamers]=useState(STREAMERS);
  const [posts,setPosts]=useState(INIT_POSTS);
  const [notif,setNotif]=useState(null);
  const [profModal,setProfModal]=useState(null);

  const showN=(msg,color)=>{setNotif({msg,color});};
  const hype=name=>{
    setStreamers(p=>p.map(s=>s.name===name?{...s,hype:Math.min(99,s.hype+1)}:s));
    showN(`⚡ Ke dhënë Hype tek ${name}!`,"linear-gradient(135deg,#7c3aed,#00ff88)");
  };

  const TABS=[
    {id:"home",icon:"🏠",label:"Home"},
    {id:"live",icon:"🎥",label:"Live"},
    {id:"games",icon:"🎮",label:"Games"},
    {id:"chat",icon:"💬",label:"Chat"},
    {id:"community",icon:"🏆",label:"AG"},
    {id:"profile",icon:user?.avatar||"👤",label:"Profili"},
  ];

  if(!user) return(
    <div style={{height:"100vh",background:"#07071a",overflow:"auto"}}>
      <style>{CSS}</style>
      <Login onLogin={u=>{setUser(u);setTab("home");}}/>
    </div>
  );

  return(
    <div style={{height:"100vh",background:"#07071a",color:"#fff",fontFamily:"'Segoe UI',sans-serif",display:"flex",flexDirection:"column",maxWidth:480,margin:"0 auto",overflow:"hidden",position:"relative"}}>
      <style>{CSS}</style>
      {notif&&<Notif msg={notif.msg} color={notif.color} onClose={()=>setNotif(null)}/>}
      <PModal s={profModal} onClose={()=>setProfModal(null)} onHype={hype}/>

      {/* Header */}
      <header style={{height:54,display:"flex",alignItems:"center",justifyContent:"space-between",padding:"0 16px",background:"#09091f",borderBottom:"1px solid #1a1a2e",flexShrink:0}}>
        <div style={{display:"flex",alignItems:"center",gap:8}}>
          <span style={{fontSize:20,filter:"drop-shadow(0 0 8px #ef4444)"}}>🦅</span>
          <div>
            <div style={{fontSize:12,fontWeight:900,background:"linear-gradient(90deg,#ef4444,#f59e0b)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",lineHeight:1.1}}>ALBANIAN</div>
            <div style={{fontSize:12,fontWeight:900,background:"linear-gradient(90deg,#f59e0b,#ef4444)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",lineHeight:1.1}}>GAMERS</div>
          </div>
        </div>
        <div style={{display:"flex",alignItems:"center",gap:10}}>
          {user.tiktok?.isLive&&<span style={{display:"flex",alignItems:"center",gap:5,background:"#ff005022",border:"1px solid #ff005044",borderRadius:20,padding:"3px 8px"}}><Dot color="#ff0050" size={6}/><span style={{color:"#ff0050",fontSize:9,fontWeight:700,fontFamily:"monospace"}}>TikTok LIVE</span></span>}
          <div style={{width:7,height:7,borderRadius:"50%",background:"#ef4444",boxShadow:"0 0 8px #ef4444",animation:"pulse 1.5s infinite"}}/>
          <span style={{color:"#444",fontSize:10,fontFamily:"monospace"}}>{streamers.filter(s=>s.isLive).length} live</span>
          <button onClick={()=>showN("🔔 Njoftimet janë aktive!","#7c3aed")} style={{background:"none",border:"1px solid #1e1e3a",borderRadius:7,color:"#666",padding:"4px 7px",cursor:"pointer",fontSize:13}}>🔔</button>
        </div>
      </header>

      {/* Content */}
      <div style={{flex:1,overflowY:"auto",paddingBottom:4}}>
        {tab==="home"&&<Home user={user} streamers={streamers} onHype={hype} onProfile={setProfModal} onNav={setTab}/>}
        {tab==="live"&&<Live streamers={streamers} onHype={hype} onProfile={setProfModal}/>}
        {tab==="games"&&<GamesScreen/>}
        {tab==="chat"&&<Chat user={user}/>}
        {tab==="community"&&<Community user={user} posts={posts} setPosts={setPosts}/>}
        {tab==="profile"&&<Profile user={user} setUser={setUser} onNav={setTab}/>}
      </div>

      {/* Bottom nav */}
      <nav style={{display:"flex",height:58,background:"#09091f",borderTop:"1px solid #1a1a2e",flexShrink:0}}>
        {TABS.map(t=>(
          <button key={t.id} onClick={()=>setTab(t.id)} style={{flex:1,background:"none",border:"none",cursor:"pointer",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:2,color:tab===t.id?"#ef4444":"#333",borderTop:tab===t.id?"2px solid #ef4444":"2px solid transparent",transition:"color .2s",position:"relative"}}>
            {t.id==="chat"&&<div style={{position:"absolute",top:6,right:"18%",width:6,height:6,borderRadius:"50%",background:"#ef4444"}}/>}
            <span style={{fontSize:tab===t.id?19:17}}>{t.icon}</span>
            <span style={{fontSize:9,fontWeight:700}}>{t.label}</span>
          </button>
        ))}
      </nav>
    </div>
  );
}

const CSS=`
@import url('https://fonts.googleapis.com/css2?family=Rajdhani:wght@600;700&family=Orbitron:wght@700;900&display=swap');
*{box-sizing:border-box;margin:0;padding:0}
@keyframes ping{75%,100%{transform:scale(2.2);opacity:0}}
@keyframes pulse{0%,100%{opacity:1}50%{opacity:.4}}
@keyframes spin{to{transform:rotate(360deg)}}
@keyframes slideUp{from{transform:translateY(50px);opacity:0}to{transform:translateY(0);opacity:1}}
@keyframes slideDown{from{transform:translate(-50%,-16px);opacity:0}to{transform:translate(-50%,0);opacity:1}}
@keyframes pop{0%{transform:scale(0)}70%{transform:scale(1.2)}100%{transform:scale(1)}}
@keyframes float0{from{transform:translateY(0)}to{transform:translateY(-18px)}}
@keyframes float1{from{transform:translateY(0)}to{transform:translateY(-12px)}}
@keyframes float2{from{transform:translateY(0)}to{transform:translateY(-22px)}}
::-webkit-scrollbar{width:3px}::-webkit-scrollbar-thumb{background:#ef4444;border-radius:2px}
input::placeholder,textarea::placeholder{color:#222}
button:active{transform:scale(.97)}
`;
