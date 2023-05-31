var searchButton = document.querySelector("#searchButton")

var sampleData = [{
        release_date: "2016-10-19",
        title: "Jack Reacher: Never Go Back",
        poster_path: "/cOg3UT2NYWHZxp41vpxAnVCOC4M.jpg",
        sources: {
            web_url: "https://www.amazon.com/gp/video/detail/amzn1.dv.gti.acabc6b0-07af-2d3f-d166-ccd78097dd17?tag="}
}];

//function to find all data for both APIs
function searchAPI() {    
    //  var tmdbUrl = "https://api.themoviedb.org/3/movie/343611?api_key=0d6d6b4bebecbfdfd42593dcd6f307e6"
    //  fetch(tmdbUrl, {
    //      method: 'GET',
    //      header: { 'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwZDZkNmI0YmViZWNiZmRmZDQyNTkzZGNkNmYzMDdlNiIsInN1YiI6IjY0NmMxZmVkMmJjZjY3MDBlM2JjMWE2NiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.bEtgFi5IKAEdaFJ8zNyOegQkkKebjAHKwb61zNPj5_I', 'accept': 'application/json' }
    //  }).then(function (response) {
    //      console.log(response);
    //      return response.json();
    //  }).then(function (data) {
    //      console.log("tmdbapi:", data)
    //      var tmdbApiId = data.imdb_id;
    //      var imageURL = URL.createObjectURL(data);
    //      var watchmodeApiUrl = `https://api.watchmode.com/v1/title/${tmdbApiId}/details/?apiKey=Pmd5eUDJou34DMGyeaDChDeFLhOJHRxVt1MfzboM&append_to_response=sources`

    //      fetch(watchmodeApiUrl).then(function (response) {
    //          return response.json();
    //      }).then(function (data) {
    //          console.log("watchmodeapi:", data);
    //      })
    //  });
     return sampleData;
    
};

//searchAPI();


//function to display search results
function displayResults(data) {
    console.log(data);
    console.log(data.length);
for (var i = 0; i < data.length; i++) {
    var movieNameEl = document.querySelector('#movieName');
    var posterEl = document.querySelector('#poster-image');
    //scr attribute for image
    var whereToWatchEl = document.querySelector('#whereToWatch');
    var dateEl = document.querySelector('#release-date');

console.log(sampleData);

    movieNameEl.textContent = data[i].title;
    posterEl.textContent = data[i].poster_path;
    whereToWatchEl.textContent = data[i].sources.web_url;
    dateEl.textContent = data[i].release_date;

    //posterEl.src = imageURL;

    console.log('title', movieNameEl);
    console.log('poster', posterEl);
    console.log('where to watch', whereToWatchEl);
    console.log('date', dateEl);
}
};


//movie that user chooses 
//function userMovieChoice() {




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
searchButton.addEventListener("click",searchBtn);


