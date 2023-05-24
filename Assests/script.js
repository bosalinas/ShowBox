function fetchMovieInfo1() {
    var wathcmodeApiUrl = `https://api.watchmode.com/v1/title/${tmdbApiId}/details/?apiKey=hr9u8TGmWHKemrBe5k1uVAYuLpindRYF8el3C1jp&append_to_response=sources`
    var tmdbApiId = "343611"

    fetch(wathcmodeApiUrl)
        .then((response) => response.json())
        .then((data) => console.log(data));

};

fetchMovieInfo1();


function fetchMovieInfo2() {
    var tmdbApiUrl = `https://api.themoviedb.org/3/movie/${movieID}?api_key=0d6d6b4bebecbfdfd42593dcd6f307e6`
    var movieID = "343611"

    fetch(tmdbApiUrl)
        .then((response) => response.json())
        .then((data) => console.log(data));

};

fetchMovieInfo2();

//rough draft from Brenda
// function searchAPI() {

//     var tmdbUrl = ``
//     fetch(tmdburl).then(function (response) {
//         return response.json();
//     }).then(function (data) {
//         console.log("tmdbapi:",data)
//         var tmdbid = data[0].tmdb_id;
//         // ^^ getting tmdb_id needs work.
//         var watchmodeUrl = ``;
//         //use var tmdbid inside watchmodeurl
//         fetch(watchmodeUrl).then(function (response) {
//             return response.json();
//         }).then(function (data) {
//             console.log("watchmodeapi:",data);
//         })
//     })
    
// }
// searchApi();