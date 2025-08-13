import { CONFIG } from "./config.js"
import { getMovieListHTML } from "./movieUtils.js"

// OMBD API Key
const omdbKey = CONFIG.API_KEY
// DOM Elements
const searchForm = document.getElementById('search-form')
const movieListDiv = document.getElementById('movie-list')

// Movie Medadata
let movieMetadata

// Attempt to retrieve watchlist from local storage
let movieWatchlist
const storedWatchlist = localStorage.getItem('movieWatchlist')
// If user has an existing watchlist then parse existing, if not then declare a new empty watchlist
storedWatchlist ? movieWatchlist = JSON.parse(storedWatchlist) : movieWatchlist = []


searchForm.addEventListener("submit", e => {
    e.preventDefault()
    handleMovieSearchClick()
})

document.addEventListener("click", e => {
    if(e.target.dataset.movieId){ 
        // Check if movie is in watchlist, if it isn't then call Add function, if not call Remove function
        if (!isMovieInWatchlist(e.target.dataset.movieId)) {
            addToWatchlist(e.target.dataset.movieId)
        } else {
            removeFromWatchlist(e.target.dataset.movieId)
        }
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
                poster: data.Poster,
                inWatchlist: isMovieInWatchlist(data.imdbID)
            }
        movieMetadata.push(movieObject)
    }
}

function addToWatchlist(selectedMovieId) {
    // Get the object of the movie the user is wanting to add to Watchlist
    const movieToAddToWatchlist = movieMetadata.find(movie => movie.imdbId === selectedMovieId)     
    // For the selected movie, flip the inWatchlist boolean    
    movieToAddToWatchlist.inWatchlist = !movieToAddToWatchlist.inWatchlist
    // Add the selected movie object into the movieWatchlist Array
    movieWatchlist.push(movieToAddToWatchlist)
    // Update local storage with the latest movieWatchlist Array
    localStorage.setItem('movieWatchlist', JSON.stringify(movieWatchlist))
}

function isMovieInWatchlist(movieId) {
    return movieWatchlist.some(movie => movie.imdbId === movieId)
}

function removeFromWatchlist(movieId) {
    console.log(`removing: ${movieId}`)
}