import { CONFIG } from "./config.js"

// OMBD API Key
const omdbKey = CONFIG.API_KEY
// DOM Elements
const searchForm = document.getElementById('search-form')
const movieListDiv = document.getElementById('movie-list')

searchForm.addEventListener("submit", e => {
    e.preventDefault()

    const searchInputValue = document.getElementById('search-input').value 

    getMovieResultsHTML(searchInputValue)
})

async function getMovieIds(searchInputValue) {
    const response = await fetch(`http://www.omdbapi.com/?apikey=${omdbKey}&type=movie&s=${searchInputValue}`)
    const data = await response.json()
    let movieIds = []
    data.Search.forEach(movie => movieIds.push(movie.imdbID))
    return movieIds
}

async function getMovieMetadata(movieIdsArray){
    let movieMetadata = []

    for (const movieId of movieIdsArray) {
        const response = await fetch(`http://www.omdbapi.com/?apikey=${omdbKey}&i=${movieId}`)
        const data = await response.json()
            const movieObject = {
                title: data.Title,
                genre: data.Genre,
                plot: data.Plot,
                runtime: data.Runtime,
                imdbId: data.imdbID,
                imdbRating: data.imdbRating,
                poster: data.Poster
            }
        movieMetadata.push(movieObject)
    }
    return movieMetadata
}

async function getMovieResultsHTML(searchInputValue) {

    try {
        const movieIds = await getMovieIds(searchInputValue)
        const movieMetadata = await getMovieMetadata(movieIds)
        let movieResultsHTML = movieMetadata.map(movie => `
            <div class="movie-card">
            <img
              src="${movie.poster}"
              alt="${movie.title} movie poster"
              class="movie-poster"
            />
            <div class="movie-data">
              <div class="movie-title-rating">
                <h2 class="movie-title">${movie.title}</h2>
                <img src="./assets/star.svg" />
                <p class="movie-rating">${movie.imdbRating}</p>
              </div>
              <div class="movie-metadata">
                <p class="movie-runtime">${movie.runtime}</p>
                <p class="movie-genre">${movie.genre}</p>
                <button class="add-to-watchlist-btn">
                    <img src="./assets/add_circle.svg" /> 
                    Watchlist
                </button>
              </div>
              <p class="movie-plot">
                ${movie.plot}
              </p>
            </div>
          </div>
            `).join('')

        movieListDiv.innerHTML = movieResultsHTML
            
        } catch (error) {
            console.error('Error fetching movie data:', error)
        }

}

