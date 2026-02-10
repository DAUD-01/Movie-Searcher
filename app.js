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

// ENTER KEY SUPPORT ✅
searchInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    searchBtn.click();
  }
});

function renderMovie(movie) {
    const trailer = encodeURIComponent(
        `${movie.Title} ${movie.Year} official trailer`
    );

    const trailerURL = `https://www.youtube.com/results?search_query=${trailer}`
    
  results.innerHTML = `
    <div class="card">
      <img src="${movie.Poster}" alt="${movie.Title}">
      <h4>${movie.Title} (${movie.Year})</h4>
      <p>${movie.Plot}</p>
      <div class="links">
        <span>IMDb: ${movie.imdbRating}</span>
      </div>
    </div>
  `;
}
