"use client";
import { useEffect, useRef, useState } from "react";
const STOP = 15;
type Cmd = "F" | "B" | "L" | "R" | null;
export default function Demo() {
  const [mode, setMode] = useState<"MANUAL" | "AUTONOMOUS">("AUTONOMOUS");
  const [run, setRun] = useState(false);
  const [pump, setPump] = useState(false);
  const [pos, setPos] = useState(5);
  const [obs, setObs] = useState(60);
  const [safety, setSafety] = useState(false);
  const [env, setEnv] = useState({ m: 42, t: 29, h: 60 });
  const [cmd, setCmd] = useState<Cmd>(null);
  const [lane, setLane] = useState(1);
  const dist = Math.max(0, Math.round(obs - pos));
  const st = useRef({ mode, run, cmd, dist, safety });
  st.current = { mode, run, cmd, dist, safety };
  useEffect(() => {
    const id = setInterval(() => {
      const s = st.current;
      setEnv((e) => ({ m: Math.min(90, Math.max(10, e.m + (Math.random() - 0.5) * 3)), t: Math.min(42, Math.max(20, e.t + (Math.random() - 0.5))), h: Math.min(90, Math.max(30, e.h + (Math.random() - 0.5) * 2)) }));
      const fwd = (s.mode === "AUTONOMOUS" && s.run) || s.cmd === "F";
      if (fwd) {
        if (s.dist <= STOP) { setSafety(true); return; }
        setPos((p) => p + 1.5);
      } else if (s.cmd === "B") setPos((p) => Math.max(0, p - 1.5));
      if (s.cmd === "L") setLane((l) => Math.max(0, l - 0.1));
      if (s.cmd === "R") setLane((l) => Math.min(2, l + 0.1));
      if (s.safety && s.dist > STOP + 2) setSafety(false);
    }, 120);
    return () => clearInterval(id);
  }, []);
  useEffect(() => {
    if (!safety) return;
    const t = setTimeout(() => { if (st.current.mode === "AUTONOMOUS") { setObs((o) => o + 120); setSafety(false); } }, 2500);
    return () => clearTimeout(t);
  }, [safety]);
  const moving = !safety && ((mode === "AUTONOMOUS" && run) || cmd === "F");
  const ai = safety ? "STANDBY" : mode === "AUTONOMOUS" && run ? "ANALYZING" : "IDLE";
  const crop = env.m < 30 ? "POSSIBLE DISEASE" : "HEALTHY";
  const hold = (l: string, c: Cmd) => <button key={l} onPointerDown={() => setCmd(c)} onPointerUp={() => setCmd(null)} onPointerLeave={() => setCmd(null)} className="px-3 py-2 rounded-lg border border-emerald-400/40 active:bg-emerald-400/20 text-sm">{l}</button>;
  return (
    <section id="demo" className="max-w-6xl mx-auto px-4 py-20">
      <h2 className="text-3xl font-bold">LIVE FARMO-BOT SIMULATION</h2>
      <p className="text-sm text-emerald-100/60 mt-1">Website simulation only. No real hardware is controlled. Sensor values are DEMO DATA.</p>
      <div className="grid lg:grid-cols-2 gap-6 mt-6">
        <div className="glass p-3">
          <svg viewBox="0 0 400 200" className="w-full grid-bg rounded-lg">
            {[0, 1, 2].map((i) => <line key={i} x1="0" x2="400" y1={46 + i * 50} y2={46 + i * 50} stroke="#166534" strokeWidth="14" opacity=".4" />)}
            <rect x={20 + obs * 2.5} y={35 + 50} width="18" height="30" fill="#ef4444" opacity={obs - pos < 120 ? 1 : 0.2} />
            <g transform={`translate(${10 + pos * 2.5} ${35 + lane * 50})`}><rect width="34" height="22" rx="5" fill={safety ? "#ef4444" : "#34d399"} /><circle cx="30" cy="11" r="3" fill="#050b07" />{pump && <circle cx="17" cy="-4" r="4" fill="#38bdf8" />}</g>
          </svg>
          {safety && <p role="alert" className="mono text-red-400 mt-2 text-center">SAFETY STOP: Obstacle detected. Robot stopped.</p>}
          <div className="flex flex-wrap gap-2 mt-3">
            {(["MANUAL", "AUTONOMOUS"] as const).map((m) => <button key={m} onClick={() => { setMode(m); setRun(false); }} className={`px-3 py-2 rounded-lg text-sm ${mode === m ? "bg-lime text-black font-semibold" : "border border-emerald-400/40"}`}>{m}</button>)}
            <button onClick={() => setRun(true)} className="px-3 py-2 rounded-lg bg-emerald-600 text-sm">START</button>
            <button onClick={() => { setRun(false); setCmd(null); }} className="px-3 py-2 rounded-lg bg-red-600 text-sm">STOP</button>
            <button onClick={() => setPump(!pump)} className="px-3 py-2 rounded-lg border border-sky-400/50 text-sm">PUMP {pump ? "OFF" : "ON"}</button>
          </div>
          {mode === "MANUAL" && <div className="flex flex-wrap gap-2 mt-2">{hold("FORWARD", "F")}{hold("LEFT", "L")}{hold("RIGHT", "R")}{hold("BACKWARD", "B")}</div>}
        </div>
        <dl className="grid grid-cols-2 gap-3 mono text-sm">
          {[["ROBOT STATUS", safety ? "SAFETY STOP" : moving ? mode : "STOPPED"], ["AI STATUS", ai], ["DISTANCE", `${dist} cm`], ["CROP STATUS", crop], ["SOIL MOISTURE", `${env.m.toFixed(0)}%`], ["TEMPERATURE", `${env.t.toFixed(1)} °C`], ["HUMIDITY", `${env.h.toFixed(0)}%`], ["PUMP", pump ? "ON" : "OFF"], ["MODE", mode]].map(([k, v]) => (
            <div key={k} className="glass p-3"><dt className="text-emerald-500 text-xs">{k}</dt><dd className={v === "SAFETY STOP" ? "text-red-400" : "text-lime"}>{v}</dd></div>
          ))}
        </dl>
      </div>
    </section>
  );
}
