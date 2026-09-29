import "./globals.css";
import type { Metadata } from "next";
export const metadata: Metadata = { title: "FARMO-BOT | Edge-AI Smart Farming Assistant", description: "SIH 2026 prototype: crop vision, sensing, edge AI and targeted intervention." };
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="en"><body>{children}</body></html>;
}
