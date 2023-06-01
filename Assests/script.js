//variables
var searchButton = document.querySelector("#searchButton")

var searchButton = document.getElementById("searchButton")
var tmdbApiKey = "0d6d6b4bebecbfdfd42593dcd6f307e6"
var watchmodeApiKey = "Pmd5eUDJou34DMGyeaDChDeFLhOJHRxVt1MfzboM"

//function to find all data for both APIs
function searchAPI(movie) {
    console.log("move string: ", movie)
    //tmdb api call below  provides ID for watchmodeapi 
    var tmdbUrl = `https://api.themoviedb.org/3/search/movie?api_key=${tmdbApiKey}&query=${movie}`
    fetch(tmdbUrl).then(function (response) {
        console.log(response);
        return response.json();
    }).then(function (data) {
        console.log("tmdbapi:", data)
        var tmdbApiId = data.results[0].id;
        var tmdbTitle = data.results[0].title;
        console.log("tmdbapiId ", tmdbApiId);
        console.log("tmdbTitle: ", tmdbTitle);
        var tmdbMovieId = "movie-" + tmdbApiId;
        console.log(tmdbMovieId)
        //using id from tmdbapi , we're calling the watchmode api below to provide display data
        var watchmodeApiUrl = `https://api.watchmode.com/v1/title/${tmdbMovieId}/details/?apiKey=${watchmodeApiKey}&append_to_response=sources`
        console.log(watchmodeApiUrl);
        fetch(watchmodeApiUrl).then(function (response) {
            return response.json();
        }).then(function (data) {
            console.log("watchmodeapi:", data);
            displayResults(data);
        })
    });
};


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

    for (i = 0; i<data.sources.length; i++ ) {
        var format=data.sources[i].format;
        if (format === "HD") {
            console.log (data.sources[i].name);
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


//grab value/movie entered by user - DONE
function userMovieChoice(movie){
    console.log("movie: ", movie);
    var movieEntered = document.getElementById("movieInput").value;
    searchAPI(movieEntered);
};


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
searchButton.addEventListener("click",searchBtn);



