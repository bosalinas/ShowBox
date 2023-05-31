var searchButton = document.getElementById("searchButton")
var tmdbApiKey = "0d6d6b4bebecbfdfd42593dcd6f307e6"
var watchmodeApiKey = "Pmd5eUDJou34DMGyeaDChDeFLhOJHRxVt1MfzboM"

//function to find all data for both APIs
function searchAPI(movie) {
    console.log("move string: ",movie)
   var tmdbUrl = "https://api.themoviedb.org/3/movie/343611?api_key=0d6d6b4bebecbfdfd42593dcd6f307e6"
   //var tmdbUrl = `https://api.themoviedb.org/3/search/movie?api_key=${tmdbApiKey}&query=${movie}` 
   //var tmdbUrl = `https://api.themoviedb.org/3/search/movie?api_key=${tmdbApiKey}&query=Jack+Reacher`
   fetch(tmdbUrl, {
        method: 'GET',
        header: { 'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwZDZkNmI0YmViZWNiZmRmZDQyNTkzZGNkNmYzMDdlNiIsInN1YiI6IjY0NmMxZmVkMmJjZjY3MDBlM2JjMWE2NiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.bEtgFi5IKAEdaFJ8zNyOegQkkKebjAHKwb61zNPj5_I', 'accept': 'application/json' }
    }).then(function (response) {
        console.log(response);
        return response.json();
    }).then(function (data) {
        console.log("tmdbapi:", data)
        var tmdbApiId = data.imdb_id;
  
        var watchmodeApiUrl = `https://api.watchmode.com/v1/title/${tmdbApiId}/details/?apiKey=${watchmodeApiKey}}&append_to_response=sources`

        fetch(watchmodeApiUrl).then(function (response) {
            return response.json();
        }).then(function (data) {
            console.log("watchmodeapi:", data);
        })
    });
};

// searchAPI();

//function to display search results
// function displayResults(){

// };

//movie that user chooses 
function userMovieChoice(movie){
    console.log("movie: ", movie);
    var movieEntered = document.getElementById("movieInput").value;
    searchAPI(movieEntered);

};
//search button event listener and function - DONE
function searchBtn(event){
    event.preventDefault();

    var movieSearched = document.getElementById("movieInput").value;

    if (!movieSearched) {
        console.error('You need a search input value!');
        return;
    }
    userMovieChoice(movieSearched);
};
searchButton.addEventListener("click",searchBtn);

