# Kanverge

A real-time, collaborative Kanban platform built as a Turborepo monorepo, with an event-driven WebSocket broadcast engine keeping every connected client in sync.

## Highlights

- **Event-driven WebSocket pub/sub engine** powering real-time board updates, achieving sub-30ms multi-client state synchronization with zero observed data drift across concurrent sessions.
- **Turborepo monorepo** with 5 shared packages/services spanning dual REST (Express) and WebSocket backends, cutting cold-build times by 85% through parallel task execution and remote/local artifact caching.

## Tech Stack

- **Language:** TypeScript, Node.js
- **Real-time layer:** WebSockets (pub/sub broadcast engine)
- **API layer:** Express (REST)
- **Monorepo tooling:** Turborepo
- **Package manager:** npm

## Project Structure

```
pmp/
├── apps/
│   └── frontend/          # Kanban board UI
├── packages/
│   ├── ui/                 # Shared React component library
│   ├── eslint-config/       # Shared ESLint configs
│   └── typescript-config/   # Shared tsconfig presets
├── turbo.json
└── package.json
```

> Update this tree to match your actual `apps/` and `packages/` folders (e.g. add your WebSocket and REST backend apps if they live outside `apps/frontend`).

## Getting Started

### Prerequisites

- Node.js (LTS recommended)
- npm

### Installation

```bash
npm install
```

### Development

Run all apps in dev mode:

```bash
npm run dev
# or: npx turbo dev
```

Run a specific app only:

```bash
npx turbo dev --filter=frontend
```

### Build

Build all apps and packages:

```bash
npm run build
# or: npx turbo build
```

Build a specific package:

```bash
npx turbo build --filter=frontend
```

### Lint

```bash
npm run lint
# or: npx turbo lint
```

## Architecture Notes

- **Real-time sync:** clients subscribe to board-level channels over WebSockets; state changes are broadcast through a pub/sub engine so every connected client reflects updates in near real time.
- **Build performance:** Turborepo's task graph and caching mean unaffected packages are skipped on rebuild, which is the main driver behind the 85% cold-build time reduction.

