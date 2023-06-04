//variables
var searchButton = document.querySelector("#searchButton")

var searchButton = document.getElementById("searchButton")
var tmdbApiKey = "0d6d6b4bebecbfdfd42593dcd6f307e6"
var watchmodeApiKey = "5kNbtVxHxdzY19ouextUcwjhwHMvvwUt5XBqrshu"
let savedItem = document.querySelectorAll(".thumbnail");

//emily
var searchHistory = [];

// TOGGLE SWITCH 
let toggleSwitch = document.querySelector("input");

toggleSwitch.addEventListener("change", (e) => {
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
    // console.log("move string: ", movie)
    //tmdb api call below  provides ID for watchmodeapi 
    var tmdbUrl = `https://api.themoviedb.org/3/search/movie?api_key=${tmdbApiKey}&query=${movie}`
    fetch(tmdbUrl).then(function (response) {
        // console.log(response);
        return response.json();
    }).then(function (data) {
        // console.log("tmdbapi:", data)
        var tmdbApiId = data.results[0].id;
        var tmdbTitle = data.results[0].title;
        var tmdbMovieId = "movie-" + tmdbApiId;
        // console.log(tmdbMovieId)
        //using id from tmdbapi , we're calling the watchmode api below to provide display data
        var watchmodeApiUrl = `https://api.watchmode.com/v1/title/${tmdbMovieId}/details/?apiKey=${watchmodeApiKey}&append_to_response=sources`
        console.log(watchmodeApiUrl);
        fetch(watchmodeApiUrl).then(function (response) {
            return response.json();
        }).then(function (data) {
            console.log("watchmodeapi:", data);
            const formattedPayload = {
                movieTitle: data.title,
                movieImg: data.poster
            }
            searchHistory.push(formattedPayload);
            localStorage.setItem("movieHistory", JSON.stringify(searchHistory))
            displayResults(data);
        })
    });
};



//add array to add to local storage
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

    whereToWatchEl.innerHTML = "";
    for (i = 0; i < data.sources.length; i++) {
        var format = data.sources[i].format;
        if (format === "HD") {

            console.log(data.sources[i].name);
            var stream = document.createElement("li");
            stream.innerHTML = `<a href="${data.sources[i].web_url}">${data.sources[i].name}</a>`
            whereToWatchEl.append(stream);
        
        if (i === 2) {break};

        }
    }

    // console.log('title', movieNameEl);
    // console.log('poster', posterEl);
    // console.log('where to watch', whereToWatchEl);
    // console.log('date', dateEl);
};


//grab value/movie entered by user - DONE

function userMovieChoice(movie) {
    // console.log("movie: ", movie);

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
searchButton.addEventListener("click", searchBtn);

//button event listener for saved searches
document.getElementById("buttonS").addEventListener("click", displaysavedata);
var savedSearches = document.getElementById("savedSearches");

function displaysavedata() {
    var historyList = document.querySelector("#movieContainer");
    historyList.innerHTML = "";
    searchHistory.forEach(function (movieSearched) {
        var img = document.createElement("img");
        img.setAttribute("name", movieSearched.movieTitle);
        img.setAttribute("src", movieSearched.movieImg);
        // img.setAttribute("class",)
        img.addEventListener("click", function (e) {
            var movieToSearch = e.target.name
            searchAPI(movieToSearch);
        });
        historyList.appendChild(img);
    });
}

// Load search history from local storage
function loadSearchHistory() {
    var history = localStorage.getItem("movieHistory");
    if (history) {
        searchHistory = JSON.parse(history);
        displaysavedata();
    }
}

loadSearchHistory()