FROM python:3.9-slim

WORKDIR /app

# Copy requirements first to leverage cache
COPY backend/requirements.txt /app/backend/requirements.txt

# Install dependencies
RUN pip install --no-cache-dir -r /app/backend/requirements.txt

# Copy the rest of the backend code
COPY backend /app/backend

# Expose the API port
EXPOSE 8000

# Run the application
CMD ["uvicorn", "backend.main:app", "--host", "0.0.0.0", "--port", "8000"]
