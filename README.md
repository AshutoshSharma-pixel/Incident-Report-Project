Incident Report Project

A full-stack web application for real-time public incident reporting and visualization, built as part of a hackathon challenge.

The platform allows users to report incidents, view them live on a map, assess severity, avoid duplicates, and trigger emergency actions. The system is designed with a clean separation between frontend and backend for scalability and fast development.

🧩 Features Implemented
1️⃣ Incident Reporting

Users can report incidents with:

Type

Description

Location (map-based)

Severity (Low / Medium / High)

Each incident is:

Timestamped

Uniquely identifiable

Duplicate incidents are automatically detected and handled.

2️⃣ Live Incident Feed & Map

Real-time incident feed with polling

Interactive map view with markers

Severity-based visual indicators

Live updates without page refresh

3️⃣ Verification & De-duplication

Duplicate incidents are detected based on:

Location proximity

Incident type

Instead of creating duplicates:

Existing incidents are upvoted

Clear distinction between:

Unverified incidents

Incidents gaining credibility via upvotes

4️⃣ Emergency Interaction

Users can directly trigger emergency calls from the interface

Designed to simulate real-world rapid response workflows

5️⃣ Deployment

Frontend deployed on Vercel

Backend API deployed on Render

Publicly accessible and functional

🏗️ Tech Stack
Frontend

React (Vite)

React Router

React Leaflet (Map)

Three.js / React Three Fiber (3D Hero Section)

Deployed on Vercel

Backend

Node.js

Express.js

REST API

In-memory data store (for hackathon scope)

Deployed on Render

🌐 Live URLs

Frontend:
https://incident-report-project-frontend-8vj6jy9xe.vercel.app/

Backend API:
https://incident-report-project.onrender.com

⚠️ Deployment Notes (Important)

The backend is deployed on a free-tier serverless platform (Render).
As a result:

The backend may enter a sleep state after inactivity

The first request (especially POST) may experience a short delay

Once active, all features function as expected

This architecture was chosen to allow rapid development, clean separation of concerns, and public deployment within hackathon constraints.

🧠 Architecture Overview
[ React Frontend (Vercel) ]
              ↓
        [ Express API (Render) ]


This separation mirrors real-world production systems and enables scalability.

🚀 How to Run Locally
Backend
cd backend
npm install
node index.js

Frontend
cd frontend
npm install
npm run dev

📌 Notes

This project prioritizes functionality, clarity, and real-world feasibility over excessive polish.

Additional features like a dedicated admin dashboard or persistent database can be added easily if extended beyond hackathon scope.

👨‍💻 Author

Ashutosh Sharma
