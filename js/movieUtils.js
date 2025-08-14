export function getMovieListHTML(moviesArray, watchlistArray = []) {
    let moviesListHTML = ``
    let buttonText = ``
    let iconLocation = ``

    moviesArray.forEach(movie => {

        const inWatchlist = isMovieInWatchlist(movie.imdbId, watchlistArray)
        if (inWatchlist) {
            buttonText = `Remove`
            iconLocation = `./assets/remove_circle.svg`
        } else {
            buttonText = `Watchlist`
            iconLocation = `./assets/add_circle.svg`
        }

        moviesListHTML += `
        <div class="movie-card">
        <img
            src="${movie.poster}"
            alt="${movie.title} movie poster"
            class="movie-poster"
            onerror="this.src='https://placehold.co/100x148?text=N/A';"
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
            <button class="add-to-watchlist-btn" data-movie-id="${movie.imdbId}">
                <img src="${iconLocation}" /> 
                ${buttonText}
            </button>
            </div>
            <p class="movie-plot">
            ${movie.plot}
            </p>
        </div>
        </div>
        `
    }) 
    return moviesListHTML
}

export function isMovieInWatchlist(movieId, watchlistArray) {
    return watchlistArray.some(movie => movie.imdbId === movieId)
}

export function removeFromWatchlist(movieId, watchlistArray) {
    const indexOfMovieToRemove = watchlistArray.findIndex(movie => movie.imdbId === movieId)
    watchlistArray.splice(indexOfMovieToRemove, 1)
    // Update local storage with the latest movieWatchlist Array
    localStorage.setItem('movieWatchlist', JSON.stringify(watchlistArray))
}

export function renderMovieList (divToRender, movieArray, watchlistArray) {
    divToRender.innerHTML = getMovieListHTML(movieArray, watchlistArray)
}