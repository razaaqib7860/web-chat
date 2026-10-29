# WebSocket Chat Application

A real-time WebSocket chat application with an Express & Socket.io backend and a React + Vite frontend.

## Features

- Real-time bidirectional messaging powered by WebSockets / Socket.io
- React frontend styled with Tailwind CSS
- Express backend server

## Project Structure

```
websocket-chat/
├── backend/
│   ├── server.js
│   ├── package.json
│   └── package-lock.json
├── frontend/
│   ├── src/
│   │   ├── App.jsx
│   │   ├── App.css
│   │   ├── main.jsx
│   │   └── ws.js
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
└── package.json
```

## Getting Started

### 1. Install dependencies

From the project root:
```bash
npm run install:all
```

Or install them individually:
```bash
# Backend
cd backend && npm install

# Frontend
cd ../frontend && npm install
```

### 2. Run the application

To build the frontend and start the backend server:
```bash
npm run dev
```

Or start them separately:
```bash
# Start backend (runs on http://localhost:5000)
cd backend
npm start

# In another terminal, start frontend dev server (runs on http://localhost:5173)
cd frontend
npm run dev
```
