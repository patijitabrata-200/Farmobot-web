"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
const phases = [
  ["MOVING", "SCANNING FIELD", "—"], ["SCANNING", "CAPTURING FRAME", "—"], ["ANALYZING", "ANALYZING", "—"],
  ["TARGET IDENTIFIED", "POSSIBLE DISEASE", "CENTER"], ["PUMP ACTIVE", "INTERVENING", "CENTER"],
] as const;
const durations = [3500, 1200, 1500, 1500, 2000];
export default function Hero() {
  const [p, setP] = useState(0);
  const [plant, setPlant] = useState(0);
  useEffect(() => {
    const t = setTimeout(() => { const n = (p + 1) % 5; if (n === 0) setPlant((x) => (x + 1) % 3); setP(n); }, durations[p]);
    return () => clearTimeout(t);
  }, [p]);
  const x = 60 + plant * 130;
  return (
    <section id="home" className="relative min-h-screen grid-bg flex items-center pt-20 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(52,211,153,.18),transparent_60%)]" />
      <div className="relative max-w-6xl mx-auto px-4 grid lg:grid-cols-2 gap-10 items-center">
        <div>
          <span className="mono text-xs text-lime"><span className="animate-pulse">●</span> EDGE AI ONLINE</span>
          <h1 className="text-5xl sm:text-7xl font-black tracking-tight mt-3 bg-gradient-to-r from-emerald-300 to-lime bg-clip-text text-transparent">FARMO-BOT</h1>
          <p className="text-xl mt-2 text-emerald-100">Edge-AI Powered Smart Farming Assistant</p>
          <p className="mono text-sm mt-3 text-emerald-300/80">Sense. Detect. Decide. Navigate. Intervene. Advise.</p>
          <p className="mt-4 text-emerald-100/70 max-w-lg">An intelligent field-deployable platform that combines crop vision, environmental sensing, edge AI, autonomous navigation and targeted intervention to support faster, data-driven farming decisions.</p>
          <div className="flex flex-wrap gap-3 mt-6">
            <a href="#solution" className="px-5 py-2.5 rounded-full bg-lime text-black font-semibold hover:scale-105 transition">Explore FARMO-BOT</a>
            <a href="#tech" className="px-5 py-2.5 rounded-full border border-emerald-400/40 hover:bg-emerald-400/10 transition">View System Architecture</a>
          </div>
        </div>
        <div className="glass p-3">
          <svg viewBox="0 0 440 240" className="w-full" role="img" aria-label="Animated simulation of the rover scanning crops">
            {[0, 1, 2].map((i) => <g key={i}>{[0, 1, 2].map((r) => <circle key={r} cx={60 + i * 130} cy={60 + r * 45} r={9} fill={i === plant && r === 1 && p >= 3 ? "#f59e0b" : "#22c55e"} opacity={0.8} />)}</g>)}
            <motion.g animate={{ x }} transition={{ duration: p === 0 ? 3.4 : 0, ease: "linear" }}>
              <rect x="-18" y="150" width="36" height="24" rx="5" fill="#34d399" />
              {p === 1 && <motion.rect x="-1" y="105" width="2" height="45" fill="#a3e635" animate={{ x: [-30, 30, -30] }} transition={{ duration: 1.1, repeat: Infinity }} />}
              {p === 4 && <motion.path d="M0 150 V105" stroke="#38bdf8" strokeWidth="3" strokeDasharray="4 4" animate={{ strokeDashoffset: [0, -16] }} transition={{ duration: 0.4, repeat: Infinity, ease: "linear" }} />}
              {p >= 2 && <rect x="-24" y="80" width="48" height="50" fill="none" stroke="#a3e635" strokeWidth="1.5" strokeDasharray="4 3" />}
            </motion.g>
          </svg>
          <dl className="mono text-xs grid grid-cols-3 gap-2 mt-2 text-center">
            <div><dt className="text-emerald-500">ROBOT</dt><dd>{phases[p][0]}</dd></div>
            <div><dt className="text-emerald-500">AI</dt><dd>{phases[p][1]}</dd></div>
            <div><dt className="text-emerald-500">TARGET</dt><dd>{phases[p][2]}</dd></div>
          </dl>
          <p className="mono text-[10px] text-center text-emerald-500/60 mt-1">SIMULATED VISUALIZATION</p>
        </div>
      </div>
    </section>
  );
}
