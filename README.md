# Movie Recommendation System

A dockerized Movie Recommendation System with a FastAPI backend and a static HTML/JS frontend.

## How to Run

**Prerequisites:**
- Docker installed (command `docker` must be available).

**Start the application:**

Run the helper script from the project root:

```bash
./start.sh
```

This script will:
1. Build the backend and frontend Docker images.
2. Start the containers.

**Access the application:**
- **Frontend**: [http://localhost:3000](http://localhost:3000)
- **Backend**: [http://localhost:8000](http://localhost:8000)

**Stop the application:**

```bash
docker stop movie-backend movie-frontend
```

## Project Structure
- `backend/`: FastAPI application code.
- `frontend/`: Static HTML/CSS/JS files.
- `start.sh`: Script to build and run the application using Docker.
- `docker-compose.yml`: (Optional) Standard Docker Compose configuration.

- <img width="2926" height="1582" alt="Demo pic" src="https://github.com/user-attachments/assets/7f85db71-28ee-4366-bce8-d7f70a5c9710" />

