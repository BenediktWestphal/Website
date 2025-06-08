# Tony Stark's Portfolio Website

## Project Description
A modern multipage portfolio website for Tony Stark, showcasing his work as a tech entrepreneur and superhero. This project features a React-based frontend and a Node.js/Express backend with a PostgreSQL database.

## Technologies Used

- **Frontend:**
  - React (v19)
  - Vite
  - Tailwind CSS
  - React Router DOM (v7)
- **Backend:**
  - Node.js (v18.x compatible)
  - Express
  - PostgreSQL
  - pg (node-postgres)
  - dotenv

## Local Development Setup

### Prerequisites
- Node.js (v18.x or ideally v20.x or higher due to `react-router-dom` requirements. The environment used for development was v18.19.1, which generated warnings for `react-router-dom` but was functional for basic setup).
- npm (comes with Node.js) or yarn.
- A running PostgreSQL server.

### Backend Setup
1.  Navigate to the `backend` directory:
    ```bash
    cd backend
    ```
2.  Create a `.env` file by copying `.env.example`. Then, fill in your PostgreSQL connection details:
    ```bash
    cp .env.example .env
    ```
    Open `.env` and modify the variables:
    ```env
    DATABASE_URL="postgresql://YOUR_USER:YOUR_PASSWORD@YOUR_HOST:YOUR_PORT/YOUR_DATABASE"
    PORT="3001"
    ```
    -   `DATABASE_URL`: Your full PostgreSQL connection string.
    -   `PORT`: (Optional) The port for the backend server. Defaults to `3001` if not set in your `.env` file. The server is configured to use `process.env.PORT`.

3.  Install dependencies:
    ```bash
    npm install
    ```
4.  Start the backend server:
    ```bash
    npm start
    ```
    The server will attempt to connect to the database and create the `projects` table if it doesn't exist. It will run on `http://localhost:3001` (or the port specified in `PORT`).

### Frontend Setup
1.  Navigate to the `frontend` directory:
    ```bash
    cd frontend
    ```
2.  Create a `.env` file by copying `.env.example`:
    ```bash
    cp .env.example .env
    ```
    Open `.env` and ensure the `VITE_API_BASE_URL` points to your running backend API:
    ```env
    VITE_API_BASE_URL="http://localhost:3001/api"
    ```
3.  Install dependencies:
    ```bash
    npm install
    ```
4.  Start the frontend development server:
    ```bash
    npm run dev
    ```
    The frontend will typically be accessible at `http://localhost:5173`. If port 5173 is in use, Vite will automatically pick another available port.

## Environment Variables

### Backend (`backend/.env`)
-   `DATABASE_URL`: **(Required)** Connection string for your PostgreSQL database.
    -   Format: `postgresql://USER:PASSWORD@HOST:PORT/DATABASE`
    -   Example: `postgresql://postgres:mysecretpassword@localhost:5432/portfolio_db`
-   `PORT`: **(Optional)** Port for the backend server to listen on. Defaults to `3001`.

### Frontend (`frontend/.env`)
-   `VITE_API_BASE_URL`: **(Required)** Base URL for the backend API.
    -   During local development, this is typically `http://localhost:3001/api`.
    -   For production, this should be the URL of your deployed backend service.

## API Endpoints

Currently, one main endpoint is available:

-   **`GET /api/projects`**
    -   **Description:** Retrieves a list of Tony Stark's projects from the database. If the database table is empty, it returns a predefined list of sample projects.
    -   **Response:** JSON array of project objects.
    -   **Example Response (from database or sample):**
        ```json
        [
          { "id": 1, "name": "Arc Reactor", "description": "Clean energy source." },
          { "id": 2, "name": "Iron Man Armor Mark I", "description": "Advanced powered exoskeleton, built in a cave." },
          { "id": 3, "name": "J.A.R.V.I.S.", "description": "Just A Rather Very Intelligent System." }
        ]
        ```

## Deployment on Railway

This project is structured for deployment as two separate services on Railway: one for the backend and one for the frontend.

### Backend Service (Node.js)
1.  **Create Database:** In your Railway project, add a new PostgreSQL database service. Railway will automatically provide a `DATABASE_URL` environment variable to connected services.
2.  **Create Backend Service:**
    -   Add a new service and point it to your GitHub repository.
    -   Specify the **Root Directory** as `backend/`.
3.  **Environment Variables:**
    -   Railway should automatically inject the `DATABASE_URL` from the PostgreSQL service you created in step 1.
    -   Railway provides its own `PORT` variable, which the Express application (`backend/server.js`) is already configured to use via `process.env.PORT`. No need to set this manually.
4.  **Build Command:** Railway will typically auto-detect `npm install` or you can set it to `npm install --legacy-peer-deps` if needed.
5.  **Start Command:** `npm start`. This should be automatically detected from the `scripts.start` in `backend/package.json`.

### Frontend Service (React/Vite Static Site)
1.  **Create Frontend Service:**
    -   Add a new service and point it to your GitHub repository.
    -   Specify the **Root Directory** as `frontend/`.
2.  **Environment Variables:**
    -   `VITE_API_BASE_URL`: Set this to the public URL of your deployed backend service on Railway. This will look something like `https://your-backend-service-name.up.railway.app/api`.
    -   `NODE_VERSION`: You might want to set this to `18` or `20` to ensure compatibility, especially considering `react-router-dom` preferences.
3.  **Build Command:** `npm run build`. This is defined in `frontend/package.json`.
4.  **Publish Directory:** `dist`. This is Vite's default build output directory and must be specified in the Railway service settings so Railway knows where to serve the static files from.

---
This README provides a comprehensive guide to setting up, running, and deploying the application.
