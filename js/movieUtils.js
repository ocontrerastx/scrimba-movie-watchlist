export function getMovieListHTML(moviesArray) {
    let moviesListHTML = ``
    let buttonText = ``
    let iconLocation = ``

    moviesArray.forEach(movie => {

        if (movie.inWatchlist) {
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