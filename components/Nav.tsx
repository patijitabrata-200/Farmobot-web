"use client";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { nav } from "@/lib/data";
export default function Nav() {
  const [open, setOpen] = useState(false);
  return (
    <header className="fixed top-0 inset-x-0 z-50 glass !rounded-none border-x-0 border-t-0">
      <nav className="max-w-6xl mx-auto flex items-center justify-between px-4 h-14" aria-label="Main">
        <a href="#home" className="font-bold tracking-widest text-emerald-300">FARMO-BOT</a>
        <ul className="hidden lg:flex gap-6 text-sm text-emerald-100/80">{nav.map(([n, h]) => <li key={h}><a className="hover:text-lime" href={h}>{n}</a></li>)}</ul>
        <a href="#demo" className="hidden lg:block px-4 py-1.5 rounded-full bg-lime text-black text-sm font-semibold hover:scale-105 transition">Launch Demo</a>
        <button className="lg:hidden" aria-label="Toggle menu" aria-expanded={open} onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</button>
      </nav>
      {open && <ul className="lg:hidden px-4 pb-4 grid gap-3">{nav.map(([n, h]) => <li key={h}><a onClick={() => setOpen(false)} href={h}>{n}</a></li>)}</ul>}
    </header>
  );
}
