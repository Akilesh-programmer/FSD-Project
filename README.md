# Rubik's Cube Solve Assister

A full-stack web application for timing Rubik's Cube solves with statistics tracking.

## Project Overview

This is a college project for the Full Stack Development course, built using the MERN stack. The current implementation includes a fully functional frontend with timer capabilities and solve tracking.

## Features

- User authentication (Login/Signup)
- Spacebar-controlled timer
- Solve statistics (Best time, Avg of 5, Avg of 12)
- Solve history with timestamps
- Clean and simple interface

## Tech Stack

- **Frontend**: React + Vite
- **Routing**: React Router DOM
- **Styling**: Plain CSS

## Getting Started

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

The application will be available at `http://localhost:5173/`

## How to Use

1. Open the application in your browser
2. Sign up or login
3. Press **SPACEBAR** to start the timer
4. Solve your Rubik's Cube
5. Press **SPACEBAR** again to stop and record your time
6. View your statistics and solve history

## Project Structure

```
FSD-Project/
├── frontend/          # React frontend application
│   ├── src/
│   │   ├── pages/    # Login, Signup, Home pages
│   │   ├── App.jsx
│   │   └── ...
│   └── package.json
└── README.md
```

## Future Enhancements

- Backend API with MongoDB
- User authentication with JWT
- Persistent data storage
- Scramble generator
- Advanced statistics and charts

## Author

College Student - Full Stack Development Course
