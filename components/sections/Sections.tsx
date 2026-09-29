"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { ChevronDown } from "lucide-react";
import Reveal from "../Reveal";
import { problems, solutions, workflow, hardware, roadmap, capabilities, site } from "@/lib/data";
const H = ({ id, t, s }: { id: string; t: string; s?: string }) => <div id={id} className="pt-20"><h2 className="text-3xl font-bold">{t}</h2>{s && <p className="text-emerald-100/60 mt-1 text-sm">{s}</p>}</div>;
const W = ({ children }: { children: React.ReactNode }) => <section className="max-w-6xl mx-auto px-4">{children}</section>;

export function Problem() {
  return <W><H id="problem" t="The Problem" /><div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 mt-6">{problems.map((p, i) => <Reveal key={p} delay={i * 0.04} className="glass p-4">{p}</Reveal>)}</div></W>;
}
export function Solution() {
  const [o, setO] = useState<number | null>(null);
  return <W><H id="solution" t="One Platform. Multiple Field Decisions." s="A mobile edge-AI farming assistant." /><div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">{solutions.map(([t, d, x], i) => (
    <Reveal key={t} delay={i * 0.05} className="glass p-4 hover:border-lime/60 hover:-translate-y-1 transition"><h3 className="font-semibold text-emerald-300">{t}</h3><p className="text-sm mt-2 text-emerald-100/70">{d}</p>
      <button aria-expanded={o === i} onClick={() => setO(o === i ? null : i)} className="mt-3 text-xs text-lime flex items-center gap-1">How it works <ChevronDown size={14} /></button>{o === i && <p className="text-sm mt-2 text-emerald-100/60">{x}</p>}</Reveal>))}</div></W>;
}
export function Workflow() {
  const [a, setA] = useState(0);
  useEffect(() => { const t = setInterval(() => setA((x) => (x + 1) % workflow.length), 1100); return () => clearInterval(t); }, []);
  return <W><H id="tech" t="Core Workflow" /><ol className="grid sm:grid-cols-2 lg:grid-cols-7 gap-3 mt-6">{workflow.map(([n, d], i) => <li key={n} className={`glass p-3 transition ${i === a ? "border-lime shadow-[0_0_20px_rgba(163,230,53,.3)]" : ""}`}><b className="mono text-lime text-sm">{n}</b><p className="text-xs mt-1 text-emerald-100/70">{d}</p></li>)}</ol></W>;
}
export function Architecture() {
  const rows = [["ESP32-CAM", "Live camera stream"], ["YOLO + OpenCV", "Runs on a local computer"], ["Target position", "LEFT / CENTER / RIGHT"], ["Wi-Fi / HTTP", "Result sent to robot"], ["ESP32 controller", "Motor + sensor + relay control"], ["L298N → DC motors", "Movement"]];
  const side = [["Soil, temperature, humidity, ultrasonic sensors", "Read by ESP32 for environmental + safety analysis"], ["ESP32 → Relay → Water pump", "Targeted intervention"]];
  return <W><H id="arch" t="System Architecture" s="Hover or focus a block for its role." /><div className="grid lg:grid-cols-3 gap-4 mt-6"><div className="lg:col-span-2 grid gap-2">{rows.map(([n, d], i) => <div key={n}><div tabIndex={0} title={d} className="glass p-3 mono text-sm group">{n}<span className="block text-xs text-emerald-100/60 opacity-0 group-hover:opacity-100 group-focus:opacity-100 transition">{d}</span></div>{i < rows.length - 1 && <div className="h-4 w-px mx-auto bg-gradient-to-b from-lime to-transparent animate-pulse" />}</div>)}</div><div className="grid gap-2 content-start">{side.map(([n, d]) => <div key={n} tabIndex={0} className="glass p-3 text-sm">{n}<p className="text-xs text-emerald-100/60">{d}</p></div>)}</div></div></W>;
}
export function Hardware() {
  return <W><H id="hw" t="Built From Real Hardware" /><div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-3 mt-6">{hardware.map(([n, d, ok]) => <Reveal key={n} className="glass p-3"><b className="text-sm">{n}</b><p className="text-xs text-emerald-100/60 mt-1">{d}</p><span className={`mono text-[10px] ${ok ? "text-lime" : "text-amber-400"}`}>{ok ? "IMPLEMENTED" : "PLANNED / EXTENSIBLE"}</span></Reveal>)}</div></W>;
}
const LOGS = ["[CAMERA] Frame received", "[AI] Analyzing crop...", "[YOLO] Possible disease detected", "[TARGET] CENTER", "[ROBOT] STOP", "[PUMP] ACTIVATING"];
export function EdgeAI() {
  const [n, setN] = useState(1);
  useEffect(() => { const t = setInterval(() => setN((x) => (x % (LOGS.length + 2)) + 1), 900); return () => clearInterval(t); }, []);
  return <W><H id="edge" t="AI WITHOUT THE CLOUD" s="FARMO-BOT is designed around local processing so that core monitoring and decision functions do not depend on continuous cloud connectivity." /><div className="grid lg:grid-cols-2 gap-4 mt-6"><pre className="glass p-4 mono text-sm text-lime min-h-[170px]" aria-live="off">{LOGS.slice(0, n).join("\n")}<span className="animate-pulse">▌</span></pre><p className="glass p-4 text-sm text-emerald-100/70">Current architecture: a local computer runs YOLO inference and the ESP32 handles robot and sensor control. The model does not run on the ESP32 itself.</p></div></W>;
}
export function Irrigation() {
  const [m, setM] = useState(30); const [t, setT] = useState(35);
  const stress = m < 35 && t > 32;
  return <W><H id="irr" t="SMART IRRIGATION" s="Prototype decision layer; can later incorporate weather forecasts and crop-specific models. Demo values." /><div className="glass p-5 mt-6 grid sm:grid-cols-2 gap-4">
    <div className="grid gap-3 text-sm"><label>Soil moisture: {m}%<input className="w-full accent-lime" type="range" min={0} max={100} value={m} onChange={(e) => setM(+e.target.value)} /></label><label>Temperature: {t} °C<input className="w-full accent-lime" type="range" min={15} max={45} value={t} onChange={(e) => setT(+e.target.value)} /></label></div>
    <div className="mono"><p className="text-xs text-emerald-500">IF moisture low AND temperature high → WATER STRESS</p><p className={`text-2xl font-bold mt-2 ${stress ? "text-amber-400" : "text-lime"}`}>Recommendation: {stress ? "IRRIGATE NOW" : "DELAY IRRIGATION"}</p></div></div></W>;
}
export function Prototype() {
  const tabs = ["HARDWARE", "AI", "ROBOT", "SOFTWARE"]; const [tab, setTab] = useState(0);
  const info = ["ESP32, ESP32-CAM, L298N, ultrasonic, soil moisture, temp/humidity, relay, pump, battery.", "YOLO + OpenCV on a local computer analyse the ESP32-CAM stream.", "Manual and autonomous modes; safety stop at 15 cm.", "Wi-Fi/HTTP commands between the computer and the ESP32."];
  return <W><H id="proto" t="FROM CODE TO FIELD" /><div className="grid lg:grid-cols-2 gap-4 mt-6"><div className="grid grid-cols-2 gap-2">{site.photos.map((p, i) => <Image key={p} src={p} alt={`FARMO-BOT prototype photo ${i + 1}`} width={600} height={500} className="rounded-xl object-cover h-56 w-full" />)}</div>
    <div className="glass p-4"><div role="tablist" className="flex gap-2 flex-wrap">{tabs.map((x, i) => <button key={x} role="tab" aria-selected={tab === i} onClick={() => setTab(i)} className={`px-3 py-1 rounded-full text-xs ${tab === i ? "bg-lime text-black" : "border border-emerald-400/40"}`}>{x}</button>)}</div><p className="text-sm mt-3 text-emerald-100/70">{info[tab]}</p><h3 className="mt-4 font-semibold text-emerald-300 text-sm">Prototype capabilities</h3><ul className="text-sm list-disc pl-5 text-emerald-100/70">{capabilities.map((c) => <li key={c}>{c}</li>)}</ul></div></div></W>;
}
export function Roadmap() {
  return <W><H id="roadmap" t="Future Roadmap" /><ol className="mt-6 border-l border-emerald-400/30 ml-2 grid gap-4">{roadmap.map((r, i) => <Reveal key={r} className="pl-5 relative"><span className="absolute -left-[5px] top-1.5 w-2.5 h-2.5 rounded-full bg-lime" /><span className="mono text-xs text-emerald-500">PHASE {i + 1}</span><p>{r}</p></Reveal>)}</ol></W>;
}
export function Impact() {
  return <W><H id="impact" t="How FARMO-BOT Addresses the Challenge" /><div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 mt-6">{solutions.map(([t, d]) => <Reveal key={t} className="glass p-4"><b className="text-lime">✓ {t}</b><p className="text-sm mt-1 text-emerald-100/70">{d}</p></Reveal>)}</div></W>;
}
export function Footer() {
  return <footer className="mt-24 border-t border-emerald-400/20 py-8 text-center text-sm text-emerald-100/60"><b className="text-emerald-300">FARMO-BOT</b><p>Edge-AI Smart Farming Assistant · Built for SIH 2026</p><p className="mt-2 flex gap-4 justify-center">{(["github", "demo", "team", "contact"] as const).map((k) => <a key={k} className="capitalize hover:text-lime" href={site.links[k]}>{k === "demo" ? "Demo Video" : k}</a>)}</p></footer>;
}
