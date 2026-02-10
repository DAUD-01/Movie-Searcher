const searchBtn = document.getElementById("searchBtn");
const searchInput = document.getElementById("searchInput");
const results = document.getElementById("results");

const API_KEY = "706a00bb";

searchBtn.addEventListener("click", async () => {
  const query = searchInput.value.trim();
  if (!query) return;

  results.innerHTML = "<p>Loading...</p>";

  try {
    const res = await fetch(
      `https://www.omdbapi.com/?t=${encodeURIComponent(query)}&apikey=${API_KEY}`
    );
    const data = await res.json();

    if (data.Response === "False") {
      results.innerHTML = `<p>Movie not found</p>`;
      return;
    }

    renderMovie(data);
  } catch (err) {
    results.innerHTML = `<p>Error fetching data</p>`;
    console.error(err);
  }
});

// 'Enter Key' Search

searchInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    searchBtn.click();
  }
});

// Render Movies

function renderMovie(movie) {
  // Get Rotten Tomatoes rating if it exists
  const rtRatingObj = movie.Ratings.find(r => r.Source === "Rotten Tomatoes");
  const rtRating = rtRatingObj ? rtRatingObj.Value : "N/A";

  results.innerHTML = `
    <div class="card">
      <img src="${movie.Poster}" alt="${movie.Title}">
      <h4>${movie.Title} (${movie.Year})</h4><br>

      <p><strong>Rated:</strong> ${movie.Rated}</p>
      <p><strong>Released:</strong> ${movie.Released}</p>
      <p><strong>Runtime:</strong> ${movie.Runtime}</p>
      <p><strong>Genre:</strong> ${movie.Genre}</p>

      <p>${movie.Plot}</p>
      <br>
      <div class="links">
        <a href="https://www.imdb.com/title/${movie.imdbID}/" target="_blank">
          IMDb: ${movie.imdbRating} - ${movie.imdbVotes} votes
        </a>
        <br>
        <a href="https://www.rottentomatoes.com/search?search=${encodeURIComponent(movie.Title)}" target="_blank">
          Rotten Tomatoes: ${rtRating}
        </a>
        <br>
        <span>Box Office: ${movie.BoxOffice}</span>
        <br>
        <a href="https://www.youtube.com/results?search_query=${encodeURIComponent(movie.Title + ' trailer')}" target="_blank">
          Watch Trailer
        </a>
      </div>
    </div>
  `;
}

