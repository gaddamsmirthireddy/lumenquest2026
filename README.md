# LumenQuest 2026

This is a full-stack web application with separate frontend and backend components.

## Project Structure

```
lumenquest2026/
├── frontend/          # React frontend application
│   ├── src/          # Source files
│   ├── public/       # Public assets
│   └── package.json  # Frontend dependencies
└── backend/          # Node.js backend application
    ├── src/          # Source files
    └── package.json  # Backend dependencies
```

## Getting Started

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the backend directory with your environment variables:
   ```
   PORT=5000
   ```

4. Start the backend server:
   ```bash
   npm run dev
   ```

The backend server will run on http://localhost:5000

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the frontend development server:
   ```bash
   npm start
   ```

The frontend application will run on http://localhost:3000

## Available Scripts

### Backend

- `npm start` - Start the production server
- `npm run dev` - Start the development server with hot-reload

### Frontend

- `npm start` - Start the development server
- `npm run build` - Build the app for production
- `npm test` - Run tests
- `npm run eject` - Eject from create-react-app