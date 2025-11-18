async function getRecommendations() {
    const movieTitle = document.getElementById("movie-title").value;
    
    if (movieTitle === "") {
        alert("Please enter a movie title.");
        return;
    }

    try {
        console.log("Requesting recommendations for:", movieTitle); // Log for debugging

        const formattedTitle = movieTitle.trim(); // Remove any extra spaces
        const url = `http://127.0.0.1:8000/recommendations/${encodeURIComponent(formattedTitle)}`;
        console.log("Request URL:", url); // Log the request URL

        const response = await fetch(url);
        
        if (!response.ok) {
            throw new Error("Failed to fetch recommendations");
        }

        const data = await response.json();
        console.log("Recommendations received:", data); // Log the recommendations

        const recommendationsList = document.getElementById("recommendations-list");
        recommendationsList.innerHTML = ""; // Clear previous recommendations

        if (data.recommended_movies && data.recommended_movies.length > 0) {
            data.recommended_movies.forEach(movie => {
                // Display movie title, genre, and year properly
                const li = document.createElement("li");
                li.textContent = `${movie.title} (${movie.year}) - Genres: ${movie.genres}`;
                recommendationsList.appendChild(li);
            });
        } else {
            recommendationsList.innerHTML = "<li>No recommendations found.</li>";
        }
    } catch (error) {
        console.error("Error fetching recommendations:", error);
        alert("An error occurred while fetching recommendations.");
    }
}
