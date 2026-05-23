import { useState, useEffect, useRef } from "react";

// ─── DATA ─────────────────────────────────────────────────────────────────────
const STREAMERS = [
  { id:1, name:"NeonViper_GG", game:"Valorant",      viewers:47, rank:"Rising",    avatar:"🐍", color:"#00ff88", hype:82, isLive:true,  followers:1240, bio:"Valorant Immortal | Daily grind 🎯" },
  { id:2, name:"PixelKnight",  game:"Elden Ring",      viewers:31, rank:"Spark",     avatar:"⚔️", color:"#ff6b35", hype:65, isLive:true,  followers:890,  bio:"Souls veteran. No cheese runs 💀" },
  { id:3, name:"CryoStarX",    game:"Apex Legends",    viewers:58, rank:"Rising",    avatar:"❄️", color:"#4ecdc4", hype:91, isLive:true,  followers:2100, bio:"Apex Predator S18 | Cryo gaming 🧊" },
  { id:4, name:"DuskHunter",   game:"Minecraft",       viewers:22, rank:"Newcomer",  avatar:"🌙", color:"#a855f7", hype:44, isLive:true,  followers:340,  bio:"Builder & Explorer | SMP creator" },
  { id:5, name:"BlazeFPS",     game:"CS2",              viewers:73, rank:"Hype King", avatar:"🔥", color:"#f59e0b", hype:97, isLive:true,  followers:3800, bio:"CS2 Faceit Lvl 10 | Coach available" },
  { id:6, name:"ShadowLane",   game:"League of Legends",viewers:19,rank:"Newcomer", avatar:"👤", color:"#6366f1", hype:38, isLive:false, followers:210,  bio:"Support main. Diamond climber 💎" },
  { id:7, name:"AlbaStrike",   game:"FIFA 25",         viewers:35, rank:"Spark",     avatar:"🦅", color:"#ef4444", hype:72, isLive:true,  followers:670,  bio:"Shqipëria forever 🇦🇱 FIFA grinder" },
  { id:8, name:"KosovaGamer",  game:"Fortnite",         viewers:28, rank:"Rising",    avatar:"🏔️", color:"#22d3ee", hype:60, isLive:false, followers:520,  bio:"Fortnite champ from Pristina 🏆" },
];
const GAMES = [
  { name:"Valorant",   icon:"🎯", streamers:342, color:"#ff4655" },
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
const TICKS =
