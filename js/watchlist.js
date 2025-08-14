import { removeFromWatchlist, renderMovieList } from "./movieUtils.js"

const movieListDiv = document.getElementById('movie-list')
let myWatchlist = loadWatchlist()

function loadWatchlist() {
    try {
        const myWatchListString = localStorage.getItem('movieWatchlist')
        return myWatchListString ? JSON.parse(myWatchListString) : []
    } catch (error) {
        console.error('Error loading watchlist:', error)
        return []
    }
}

function saveWatchlist() {
    try {
        localStorage.setItem('movieWatchlist', JSON.stringify(myWatchlist))
    } catch (error) {
        console.error('Error saving watchlist:', error)
    }
}

function renderCurrentState() {
    if (myWatchlist.length === 0) {
        renderEmptyState()
    } else {
        renderMovieList(movieListDiv, myWatchlist, myWatchlist)
    }
}

renderCurrentState()

document.addEventListener("click", e => {
    if(e.target.dataset.movieId){ 
        const movieId = e.target.dataset.movieId
        // Remove movie from watchlist
        removeFromWatchlist(movieId, myWatchlist)
        saveWatchlist()
        renderCurrentState()
    }
})

function renderEmptyState() {
    movieListDiv.innerHTML = `
        <div class="empty-state">
            <h2>Your watchlist is looking a little empty...</h2>
            <a href="index.html" class="add-movies">
              <img src="./assets/add_circle.svg" />
              Let's add some movies!
            </a>
        </div>
    `
}
