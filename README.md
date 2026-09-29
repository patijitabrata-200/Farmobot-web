# FARMO-BOT

**Edge-AI Powered Smart Farming Assistant**

FARMO-BOT is a student-built SIH 2026 prototype combining crop vision, environmental sensing, robot navigation, and targeted intervention for farming workflows.

## Prototype Capabilities

- Live camera monitoring
- YOLO-based crop disease detection
- Visual target positioning
- Manual and autonomous robot control
- Ultrasonic safety stop at 15 cm
- Wi-Fi/HTTP communication
- Relay-controlled pump intervention

The current architecture uses a local computer for YOLO inference and an ESP32 for robot and sensor control. The website simulation does not control real hardware, and displayed sensor values are demo data.

## Website

The site presents the prototype, system architecture, workflow, hardware, edge-AI design, irrigation decision layer, live simulation, roadmap, and project photos.

## Run Locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Production Build

```bash
npm run build
npm run start
```

## Project Structure

```text
app/                    Next.js App Router entry points and global styles
components/             Reusable UI and page sections
lib/data.ts             Central project content and configuration
public/                 Prototype photos and static assets
```

## Scope Notes

Pest detection, rain/flood monitoring, mobile delivery, GPS mapping, historical analytics, and larger-scale deployment are planned or extensible features. This repository does not claim unverified accuracy, adoption, or efficiency results.

Built for SIH 2026.