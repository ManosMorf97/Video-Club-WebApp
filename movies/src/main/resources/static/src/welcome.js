import movie_operations from "./movie_operations.js"

movie_operations.begin()

document.getElementById("inputSearch").addEventListener("keyup",async function (e){
    let movie_at=document.getElementsByClassName("movies")[0]
    movie_operations.removeAllChildNodes(movie_at)
    let search_value=document.getElementById("inputSearch").value
    let url="http://www.omdbapi.com/?apikey=1c07e2b7&&s="+search_value
    if(search_value===undefined || search_value==="")
        return -1;
    let movies=await movie_operations.getMoviesJson(url)
    console.log(movies)
    if(movies===undefined)
        return -1;
    movie_operations.present_movies(movies,movie_at,true)
})