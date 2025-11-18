from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware  # Import CORSMiddleware
import pandas as pd
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.neighbors import NearestNeighbors
import re  # Import for regular expressions

app = FastAPI()

# Allow all origins (you can limit this later if needed)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins (use specific URLs in production)
    allow_credentials=True,
    allow_methods=["*"],  # Allow all HTTP methods (GET, POST, etc.)
    allow_headers=["*"],  # Allow all headers
)

# Load the dataset
movies_df = pd.read_csv('backend/data/movies.csv')

# Preprocess genres
movies_df['genre_str'] = movies_df['genres'].apply(lambda x: x.replace("|", " "))

# Convert genres into one-hot encoded vectors
vectorizer = CountVectorizer()
genre_matrix = vectorizer.fit_transform(movies_df['genre_str'])

# Train KNN model
knn_model = NearestNeighbors(n_neighbors=6, metric='cosine')
knn_model.fit(genre_matrix)

def get_movie_recommendations_knn(movie_title: str):
    movie_title_lower = movie_title.strip().lower()  # Normalize movie title
    print(f"Looking for movie: {movie_title_lower}")

    # Find the movie in the dataset (case-insensitive search)
    idx = movies_df.index[movies_df['title'].str.lower().str.contains(movie_title_lower)].tolist()

    if not idx:
        raise HTTPException(status_code=404, detail="Movie not found")

    movie_index = idx[0]

    # Find nearest neighbors
    distances, indices = knn_model.kneighbors([genre_matrix[movie_index].toarray()[0]])

    # Remove the first result (it is the movie itself)
    recommended_indices = indices[0][1:]

    # Get recommended movies with their genres and year
    recommended_movies = []
    for index in recommended_indices:
        title = movies_df['title'].iloc[index]
        genres = movies_df['genres'].iloc[index]
        
        # Extract the year from the movie title using regex
        match = re.search(r'\((\d{4})\)', title)
        year = match.group(1) if match else "Unknown Year"

        # Add year to the movie title
        recommended_movies.append({"title": title, "genres": genres, "year": year})

    return recommended_movies

@app.get("/")
def read_root():
    return {"message": "Welcome to the KNN Movie Recommendation System!"}

@app.get("/movies")
def get_movies():
    return movies_df.to_dict(orient="records")

@app.get("/recommendations/{movie_title}")
def recommend_movies(movie_title: str):
    recommendations = get_movie_recommendations_knn(movie_title)
    return {"recommended_movies": recommendations}
