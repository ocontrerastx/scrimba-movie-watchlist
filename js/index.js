import { CONFIG } from "./config.js"
import { getMovieListHTML } from "./movieUtils.js"

// OMBD API Key
const omdbKey = CONFIG.API_KEY
// DOM Elements
const searchForm = document.getElementById('search-form')
const movieListDiv = document.getElementById('movie-list')

// Movie Medadata & Watchlist Arrays
let movieMetadata

let movieWatchlist
// Attempt to retrieve watchlist from local storage
const storedWatchlist = localStorage.getItem('movieWatchlist')
// If user has an existing watchlist then parse existing, if not then declare a new empty watchlist
storedWatchlist ? movieWatchlist = JSON.parse(storedWatchlist) : movieWatchlist = []


searchForm.addEventListener("submit", e => {
    e.preventDefault()
    handleMovieSearchClick()
})

document.addEventListener("click", e => {
    if(e.target.dataset.movieId){
        addToWatchlist(e.target.dataset.movieId)
    }
})

async function handleMovieSearchClick() {
    // Make sure movieMetadata is empty before adding results
    movieMetadata = []
    // Call OMBD API to get Movie IDs
    const searchInputValue = document.getElementById('search-input').value
    const movieIds = await getMovieIds(searchInputValue)
    // Take Movie IDs array and then call OMBD API for Movie Metadata for movies that matched search string
    await getMovieMetadata(movieIds)
    // Get Movie List HTML from Movies found in the Movie Metadata Object
    movieListDiv.innerHTML = getMovieListHTML(movieMetadata)
    // Render the Movie List HTML
}

async function getMovieIds(searchString) {
    const response = await fetch(`http://www.omdbapi.com/?apikey=${omdbKey}&type=movie&s=${searchString}`)
    const data = await response.json()
    let movieIds = []
    data.Search.forEach(movie => movieIds.push(movie.imdbID))
    return movieIds
}

async function getMovieMetadata(movieIdsArray){
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
}

function addToWatchlist(selectedMovieId) {
    movieWatchlist.push(...movieMetadata.filter(movie => movie.imdbId === selectedMovieId))
    console.log(movieWatchlist)
    localStorage.setItem('movieWatchlist', JSON.stringify(movieWatchlist))
}