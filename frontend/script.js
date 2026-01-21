const API_URL = "http://127.0.0.1:8000";

// Navbar scroll effect
window.addEventListener("scroll", () => {
    const navbar = document.getElementById("navbar");
    if (window.scrollY > 50) {
        navbar.classList.add("bg-black/90", "backdrop-blur-xl", "border-b", "border-white/10", "py-2");
        navbar.classList.remove("bg-gradient-to-b", "from-black/80", "py-4");
    } else {
        navbar.classList.remove("bg-black/90", "backdrop-blur-xl", "border-b", "border-white/10", "py-2");
        navbar.classList.add("bg-gradient-to-b", "from-black/80", "py-4");
    }
});

// Initial Load
document.addEventListener("DOMContentLoaded", () => {
    loadAllMovies();

    // Search Button Event
    document.getElementById("search-btn").addEventListener("click", getRecommendations);

    // Search Enter Key Event
    document.getElementById("search-input").addEventListener("keypress", (e) => {
        if (e.key === "Enter") getRecommendations();
    });
});

async function loadAllMovies() {
    try {
        const response = await fetch(`${API_URL}/movies`);
        if (!response.ok) throw new Error("Failed to fetch movies");

        const movies = await response.json();

        // Group movies by Genre (limit to top 5 genres for demo)
        const genres = ["Action", "Comedy", "Drama", "Horror", "Romance"];
        const genreRowsContainer = document.getElementById("genre-rows");
        genreRowsContainer.innerHTML = "";

        genres.forEach(genre => {
            // Filter movies containing this genre
            const genreMovies = movies.filter(m => m.genres.includes(genre));

            if (genreMovies.length > 0) {
                createRow(genre, genreMovies);
            }
        });

    } catch (error) {
        console.error("Error loading movies:", error);
    }
}

function createRow(title, movies) {
    const rowsContainer = document.getElementById("genre-rows");

    const section = document.createElement("section");
    section.className = "pl-4 md:pl-12 py-8"; // Correct padding/margin for row section

    const titleElem = document.createElement("h2");
    titleElem.className = "text-xl md:text-2xl font-semibold mb-4 text-white hover:text-netflixRed transition-colors cursor-pointer inline-block"; // Tailwind typography
    titleElem.textContent = title;

    const rowContainer = document.createElement("div");
    rowContainer.className = "flex overflow-x-auto gap-4 md:gap-6 pb-8 hide-scrollbar scroll-smooth px-1";

    // Shuffle and pick first 10 for variety
    const displayMovies = movies.sort(() => 0.5 - Math.random()).slice(0, 15);

    displayMovies.forEach(movie => {
        const card = createMovieCard(movie);
        rowContainer.appendChild(card);
    });

    section.appendChild(titleElem);
    section.appendChild(rowContainer);
    rowsContainer.appendChild(section);
}

function createMovieCard(movie) {
    const card = document.createElement("div");
    // Tailwind classes for the card
    card.className = "relative min-w-[200px] md:min-w-[240px] h-[300px] md:h-[360px] bg-zinc-800 rounded-lg overflow-hidden cursor-pointer flex-shrink-0 transition-all duration-300 hover:scale-105 hover:z-10 hover:shadow-2xl hover:shadow-black/60 group border border-transparent hover:border-zinc-600";

    // Generate gradients (kept consistent logic)
    const gradients = [
        "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        "linear-gradient(135deg, #ff9a9e 0%, #fecfef 99%, #fecfef 100%)",
        "linear-gradient(120deg, #a1c4fd 0%, #c2e9fb 100%)",
        "linear-gradient(120deg, #84fab0 0%, #8fd3f4 100%)",
        "linear-gradient(to right, #4facfe 0%, #00f2fe 100%)",
        "linear-gradient(to top, #c471f5 0%, #fa71cd 100%)",
        "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
        "linear-gradient(135deg, #5ee7df 0%, #b490ca 100%)",
        "linear-gradient(to top, #30cfd0 0%, #330867 100%)",
        "linear-gradient(to right, #b8cbb8 0%, #b8cbb8 0%, #b465da 0%, #cf6cc9 33%, #ee609c 66%, #ee609c 100%)"
    ];

    const charSum = movie.title.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const gradient = gradients[charSum % gradients.length];

    card.innerHTML = `
        <div class="w-full h-full flex items-center justify-center p-4 text-center" style="background: ${gradient};">
            <span class="text-white font-bold text-lg drop-shadow-md bg-black/20 p-2 rounded backdrop-blur-sm group-hover:opacity-20 transition-opacity duration-300">${movie.title}</span>
        </div>
        
        <!-- Hover Info Overlay -->
        <div class="absolute inset-0 bg-gradient-to-t from-black via-black/90 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col justify-end p-4 translate-y-4 group-hover:translate-y-0">
            <h3 class="text-white font-bold text-lg leading-tight mb-2">${movie.title}</h3>
            <div class="flex flex-wrap gap-2 text-xs text-gray-300 mb-3">
                ${(movie.genres || "Genre").split('|').slice(0, 3).map(g => `<span class="bg-gray-700 px-2 py-1 rounded-full">${g}</span>`).join('')}
            </div>
            <div class="flex gap-2">
                 <button class="flex-1 bg-white text-black py-1.5 rounded font-semibold text-sm hover:bg-gray-200 transition"><i class="fas fa-play mr-1"></i> Play</button>
                 <button class="w-8 h-8 rounded-full border border-gray-400 flex items-center justify-center text-white hover:border-white hover:bg-white/10 transition"><i class="fas fa-plus"></i></button>
                 <button class="w-8 h-8 rounded-full border border-gray-400 flex items-center justify-center text-white hover:border-white hover:bg-white/10 transition"><i class="fas fa-thumbs-up"></i></button>
            </div>
        </div>
    `;

    return card;
}

async function getRecommendations() {
    const query = document.getElementById("search-input").value;
    if (!query) return;

    try {
        const response = await fetch(`${API_URL}/recommendations/${encodeURIComponent(query)}`);

        if (response.status === 404) {
            alert("Movie not found!");
            return;
        }

        const data = await response.json();
        const recommendations = data.recommended_movies;

        const recSection = document.getElementById("recommendations-section");
        const recContainer = document.getElementById("recommendations-container");

        recContainer.innerHTML = ""; // Clear old params
        recSection.classList.remove("hidden");
        // Add a slight fade-in effect to the section if it was hidden

        if (recommendations.length === 0) {
            recContainer.innerHTML = "<p class='text-gray-400 p-4'>No recommendations found.</p>";
            return;
        }

        recommendations.forEach(movie => {
            const card = createMovieCard(movie);
            // Slightly smaller cards for recommendations could be nice, but sticking to standard size for consistency
            recContainer.appendChild(card);
        });

        // Scroll to recommendations
        recSection.scrollIntoView({ behavior: 'smooth', block: 'start' });

    } catch (error) {
        console.error("Error fetching recommendations:", error);
    }
}
