import { CONFIG } from "./config.js"
import { getMovieListHTML, isMovieInWatchlist, removeFromWatchlist, renderMovieList } from "./movieUtils.js"

// OMBD API Key
const omdbKey = CONFIG.API_KEY
// DOM Elements
const searchForm = document.getElementById('search-form')
const movieListDiv = document.getElementById('movie-list')

// Movie Medadata
let movieMetadata

// Load watchlist from localStorage with error handling
let movieWatchlist = loadWatchlist()

function loadWatchlist() {
    try {
        const storedWatchlist = localStorage.getItem('movieWatchlist')
        return storedWatchlist ? JSON.parse(storedWatchlist) : []
    } catch (error) {
        console.error('Error loading watchlist:', error)
        return []
    }
}

function saveWatchlist() {
    try {
        localStorage.setItem('movieWatchlist', JSON.stringify(movieWatchlist))
    } catch (error) {
        console.error('Error saving watchlist:', error)
    }
}

searchForm.addEventListener("submit", e => {
    e.preventDefault()
    handleMovieSearchClick()
})

document.addEventListener("click", e => {
    if(e.target.dataset.movieId){ 
        const movieId = e.target.dataset.movieId
        // Check if movie is in watchlist, if it isn't then call Add function, if not call Remove function
        if (!isMovieInWatchlist(movieId, movieWatchlist)) {
            addToWatchlist(movieId)            
        } else {
            removeFromWatchlist(movieId, movieWatchlist)
        }

        saveWatchlist()
        renderMovieList(movieListDiv, movieMetadata, movieWatchlist)
    }
})

async function handleMovieSearchClick() {
    // Clear previous results
    movieMetadata = []
    // Call OMBD API to get Movie IDs
    const searchInputValue = document.getElementById('search-input').value
    const movieIds = await getMovieIds(searchInputValue)
    // Take Movie IDs array and then call OMBD API for Movie Metadata for movies that matched search string
    await getMovieMetadata(movieIds)
    // Get Movie List HTML from Movies found in the Movie Metadata Object and Render
    renderMovieList(movieListDiv, movieMetadata, movieWatchlist)
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
            }
        movieMetadata.push(movieObject)
    }
}

function addToWatchlist(selectedMovieId) {
    // Get the object of the movie the user is wanting to add to Watchlist
    const movieToAdd = movieMetadata.find(movie => movie.imdbId === selectedMovieId)     

    // Add to watchlist if not already present (double-check)
    if (!movieWatchlist.some(movie => movie.imdbId === selectedMovieId)) {
        movieWatchlist.push(movieToAdd)
    }
}