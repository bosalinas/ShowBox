



//variables
var searchButton = document.querySelector("#searchButton")

var sampleData = [{
    release_date: "2016-10-19",
    title: "Jack Reacher: Never Go Back",
    poster_path: "/cOg3UT2NYWHZxp41vpxAnVCOC4M.jpg",
    sources: {
        web_url: "https://www.amazon.com/gp/video/detail/amzn1.dv.gti.acabc6b0-07af-2d3f-d166-ccd78097dd17?tag="
    }
}];
var searchButton = document.getElementById("searchButton")
var tmdbApiKey = "0d6d6b4bebecbfdfd42593dcd6f307e6"
var watchmodeApiKey = "Pmd5eUDJou34DMGyeaDChDeFLhOJHRxVt1MfzboM"

//function to find all data for both APIs
// function searchAPI() {
//     var tmdbUrl = "https://api.themoviedb.org/3/movie/343611?api_key=0d6d6b4bebecbfdfd42593dcd6f307e6"
//     fetch(tmdbUrl, {
//         method: 'GET',
//         header: { 'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwZDZkNmI0YmViZWNiZmRmZDQyNTkzZGNkNmYzMDdlNiIsInN1YiI6IjY0NmMxZmVkMmJjZjY3MDBlM2JjMWE2NiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.bEtgFi5IKAEdaFJ8zNyOegQkkKebjAHKwb61zNPj5_I', 'accept': 'application/json' }
//     }).then(function (response) {
//         console.log(response);
//         return response.json();
//     }).then(function (data) {
//         console.log("tmdbapi:", data)
//         var tmdbApiId = data.imdb_id;

// searchAPI();

function displayResults(data) {

    //variables from index sheet - where data is gonna display
    var movieNameEl = document.querySelector('#movieName');
    var posterEl = document.querySelector('#poster-image');
    var whereToWatchEl = document.querySelector('#whereToWatch');
    var dateEl = document.querySelector('#release-date');
    //updating index with data from watchmode api
    movieNameEl.textContent = data.title;

    dateEl.textContent = data.release_date;
    posterEl.src = data.poster;

    for (i = 0; i < data.sources.length; i++) {
        var format = data.sources[i].format;
        if (format === "HD") {
            console.log(data.sources[i].name);
            var stream = document.createElement("a");
            stream.innerHTML = `<a href="${data.sources[i].web_url}">${data.sources[i].name}</a>`
            whereToWatchEl.append(stream);

        }
    }

    console.log('title', movieNameEl);
    console.log('poster', posterEl);
    console.log('where to watch', whereToWatchEl);
    console.log('date', dateEl);
};


function displayResults(data) {

    function userMovieChoice(movie) {
        console.log("movie: ", movie);
        var movieEntered = document.getElementById("movieInput").value;
        searchAPI(movieEntered);
    };




    var movieSearched = document.getElementById("movieInput").value;

    //search button event listener and function - DONE

    function searchBtn(event) {
        event.preventDefault();
        var movieSearched = document.getElementById("movieInput").value;
        if (!movieSearched) {
            console.error("You need a search input value!");
            return;
        }
        displayResults(searchAPI());
        //userMovieChoice(movieSearched);
    };
    searchButton.addEventListener("click", searchBtn);



    // function searchBtn(event) {
    //     event.preventDefault();

    //event listener and search button function - DONE
    function searchBtn(event) {
        event.preventDefault();

        var movieSearched = document.getElementById("movieInput").value;

        if (!movieSearched) {
            console.error('You need a search input value!');
            return;
        }
        userMovieChoice(movieSearched);
    };
    searchButton.addEventListener("click", searchBtn);


}
