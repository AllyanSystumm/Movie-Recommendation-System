# <h1 style="font-size: 36px;">Movie Recommendation System</h1>

## <h2 style="font-size: 28px;">Description:</h2>
The **Movie Recommendation System** is a web-based application designed to provide personalized movie suggestions. By inputting a movie title, the system leverages the **K-Nearest Neighbors (KNN)** algorithm to recommend movies with similar genres. The project utilizes **FastAPI** for the backend and **HTML, CSS**, and **JavaScript** for the frontend to create a smooth, interactive user experience.

## <h2 style="font-size: 28px;">Key Features:</h2>

### <h3 style="font-size: 24px;">Movie Recommendations:</h3>
Suggests similar movies based on genres using the **KNN algorithm**. The system compares the genre of the user-provided movie with other movies in the dataset to find the best matches.

### <h3 style="font-size: 24px;">Real-Time Suggestions:</h3>
As users type in a movie title, the system fetches recommendations dynamically and displays them immediately.

### <h3 style="font-size: 24px;">Search Functionality:</h3>
Allows users to search movies by title or genre. It filters through the movies and shows only the relevant results based on the search query.

### <h3 style="font-size: 24px;">Cross-Origin Resource Sharing (CORS):</h3>
The backend supports **CORS** to enable communication between frontend and backend even when they are hosted on different ports, allowing the application to work seamlessly.

### <h3 style="font-size: 24px;">Genre and Year Display:</h3>
Along with the movie titles, the recommendations display the genres and release year of the recommended movies, giving users additional context.

## <h2 style="font-size: 28px;">Technologies Used:</h2>

### <h3 style="font-size: 24px;">Backend:</h3>
- **FastAPI**: A modern web framework for building fast APIs with Python.
- **Scikit-learn (KNN)**: A machine learning library used for implementing the **K-Nearest Neighbors** algorithm to find similar movies based on genre similarity.
- **Pandas**: A data analysis library used to load, process, and manipulate the movie dataset.

### <h3 style="font-size: 24px;">Frontend:</h3>
- **HTML**: For structuring the web page and defining the layout.
- **CSS**: For styling the UI to make it clean and user-friendly.
- **JavaScript**: For interacting with the backend API and dynamically updating the UI with movie recommendations.

### <h3 style="font-size: 24px;">Dataset:</h3>
The movie dataset is stored in a **CSV file**, containing movie titles, genres, and release years.

## <h2 style="font-size: 28px;">How It Works:</h2>

### <h3 style="font-size: 24px;">User Input:</h3>
The user enters the movie title in the input field.

### <h3 style="font-size: 24px;">Recommendation Process:</h3>
The frontend sends the movie title to the backend via a **GET** request. The backend uses the **KNN algorithm** to find movies with similar genres based on the title provided by the user.

### <h3 style="font-size: 24px;">Movie Recommendation:</h3>
The backend responds with a list of recommended movies, including the movie title, genres, and release year.

### <h3 style="font-size: 24px;">Display Recommendations:</h3>
The frontend displays the recommended movies dynamically in the UI with their respective genres and release years.
