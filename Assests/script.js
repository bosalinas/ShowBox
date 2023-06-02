//variables
var searchButton = document.querySelector("#searchButton")

var searchButton = document.getElementById("searchButton")
var tmdbApiKey = "0d6d6b4bebecbfdfd42593dcd6f307e6"
var watchmodeApiKey = "Pmd5eUDJou34DMGyeaDChDeFLhOJHRxVt1MfzboM"

//emily
var searchHistory = [];

// TOGGLE SWITCH 
let toggleSwitch = document.querySelector("input");

toggleSwitch.addEventListener("change",(e) => {
    let body = document.querySelector("body");
    let title = document.querySelector("#grid-container");
    let font = document.querySelector("h2");
    let fontTwo = document.querySelector("#release-date");
    let fontThree = document.querySelector("#movieName");
    let fontFour = document.querySelector("#whereWatch");
    let button = document.querySelector("button");
    let buttonS = document.querySelector("#buttonS");
    

    if (e.target.checked) {
        body.style.backgroundColor = "#242124";
        title.style.backgroundColor = "#eb3e3e";
        font.style.color = "#f3e6d8";
        fontTwo.style.color = "#f3e6d8";
        fontThree.style.color = "#f3e6d8";
        fontFour.style.color = "#f3e6d8";
        button.style.color = "#f3e6d8";
        buttonS.style.color = "#f3e6d8";
    } else {
        body.style.backgroundColor = "#f3e6d8";
        title.style.backgroundColor = "#eb3e3e";
        font.style.color = "#000000";
        fontTwo.style.color = "#000000";
        fontThree.style.color = "#000000";
        fontFour.style.color = "#000000";
        button.style.color = "#000000";
        buttonS.style.color = "#000000"
    }
});

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
    var scrollBoxEl = document.querySelector('#scrollBox');

    //updating index with data from watchmode api
    movieNameEl.textContent = data.title;

    dateEl.textContent = data.release_date;
    posterEl.src = data.poster;

    for (i = 0; i < data.sources.length; i++) {
        var format = data.sources[i].format;
        if (format === "HD") {
            console.log(data.sources[i].name);
            var stream = document.createElement("li");
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
function userMovieChoice(movie) {
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

    // emily 5/31
    if (movieSearched) {
        searchHistory.push(movieSearched);
        savedata();
    }
};
searchButton.addEventListener("click", searchBtn);



//function to save movie to local storage- emily 5/31- done
function savedata() {
    localStorage.setItem("movieInput", JSON.stringify(searchHistory));
    console.log();
};
//button event listener for saved searches
document.getElementById("savedButton").addEventListener("click", displaysavedata);
var savedSearches = document.getElementById("savedSearches");
function displaysavedata() {
    var historyList = document.querySelector(".movieInput");
    historyList.innerHTML = "";
    searchHistory.forEach(function (movieSearched) {
        var li = document.createElement("li");
        li.textContent = posterEl;
        li.addEventListener("click", function () {
            cityInput.value = city;
            getCurrentWeather(city);
        });
        historyList.appendChild(li);
    });
}
// Load search history from local storage
function loadSearchHistory() {
    var history = localStorage.getItem("history");
    if (history) {
        searchHistory = JSON.parse(history);
        displaysavedata();
    }
}
