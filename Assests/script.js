var searchButton = document.querySelector(".searchButton")

//function to find all data for both APIs
function searchAPI() {
    var tmdbUrl = "https://api.themoviedb.org/3/movie/343611?api_key=0d6d6b4bebecbfdfd42593dcd6f307e6"
    fetch(tmdbUrl, {
        method: 'GET',
        header: { 'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwZDZkNmI0YmViZWNiZmRmZDQyNTkzZGNkNmYzMDdlNiIsInN1YiI6IjY0NmMxZmVkMmJjZjY3MDBlM2JjMWE2NiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.bEtgFi5IKAEdaFJ8zNyOegQkkKebjAHKwb61zNPj5_I', 'accept': 'application/json' }
    }).then(function (response) {
        console.log(response);
        return response.json();
    }).then(function (data) {
        console.log("tmdbapi:", data)
        var tmdbApiId = data.imdb_id;

        var watchmodeApiUrl = `https://api.watchmode.com/v1/title/${tmdbApiId}/details/?apiKey=hr9u8TGmWHKemrBe5k1uVAYuLpindRYF8el3C1jp&append_to_response=sources`

        fetch(watchmodeApiUrl).then(function (response) {
            return response.json();
        }).then(function (data) {
            console.log("watchmodeapi:", data);
        })
    });
};

searchAPI();

//function to display search results
function displayResults(data) {
for (var i = 0; i < data.length; i++) {
    var movieNameEl = document.querySelector('#movieName');
    var posterEl = document.querySelector('#poster-image');
    var whereToWatchEl = document.querySelector('#whereToWatch');
    var dateEl = document.querySelector('#release-date');

    movieNameEl.textContent = data[i].title;
    posterEl.textContent = data[i].poster;
    whereToWatchEl.textContent = data[i].sources.web_url;
    dateEl.textContent = data[i].release_date;

    console.log('title', movieNameEl);
    console.log('poster', posterEl);
    console.log('where to watch', whereToWatchEl);
    console.log('date', dateEl);
}
};


//movie that user chooses 
//function userMovieChoice() {



//};
//search button event listener and function - DONE
// function searchBtn(event) {
//     event.preventDefault();

//     var movieSearched = document.querySelector(".search-input").value;

//     if (!searchInputVal) {
//         console.error('You need a search input value!');
//         return;
//     }
//     userMovieChoice(movieSearched);
// };
// searchButton.addEventListener("click", searchBtn);

