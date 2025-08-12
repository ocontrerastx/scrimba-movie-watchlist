import { getMovieListHTML } from "./movieUtils.js"

const movieListDiv = document.getElementById('movie-list')


const myWatchListString = localStorage.getItem('movieWatchlist')
let myWatchlist = JSON.parse(myWatchListString)

movieListDiv.innerHTML = getMovieListHTML(myWatchlist)


