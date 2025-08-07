const searchForm = document.getElementById('search-form')

searchForm.addEventListener("submit", e => {
    e.preventDefault()
    const searchInputValue = document.getElementById('search-input').value 
    console.log(searchInputValue)
})