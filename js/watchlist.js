import { getMovieListHTML, isMovieInWatchlist, removeFromWatchlist, renderMovieList } from "./movieUtils.js"

const movieListDiv = document.getElementById('movie-list')
const myWatchListString = localStorage.getItem('movieWatchlist')
let myWatchlist = JSON.parse(myWatchListString)

if (myWatchlist.length === 0) {
    renderEmptyState()
} else {
    renderMovieList(movieListDiv, myWatchlist, myWatchlist)
}

document.addEventListener("click", e => {
    if(e.target.dataset.movieId){ 
        // Check if movie is in watchlist, if it isn't then call Add function, if not call Remove function
        if (!isMovieInWatchlist(e.target.dataset.movieId, myWatchlist)) {
            addToWatchlist(e.target.dataset.movieId)            
        } else {
            removeFromWatchlist(e.target.dataset.movieId, myWatchlist)
        }
        if (myWatchlist.length === 0) {
            renderEmptyState()
        } else {
            renderMovieList(movieListDiv, myWatchlist, myWatchlist)
        }
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
