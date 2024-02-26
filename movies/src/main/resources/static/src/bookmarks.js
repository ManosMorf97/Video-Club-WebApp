import movie_operations from "./movie_operations.js"
import root_module from "./root_module.js"

movie_operations.begin("Movies you like")

let movies=JSON.parse(localStorage.getItem("MyMovies"))

let BookmarkMovies=[]

let stop=true

BookmarkedSavedMovies(movies)

async function BookmarkedSavedMovies(movies){
    root_module.activate_loader()
    let movie_at=document.getElementsByClassName("movies")[0]
    movie_operations.removeAllChildNodes(movie_at)
    if(movies===null){
        movies=[]
    }
    for(const movie of movies){
        console.log(movie)
        let url="http://www.omdbapi.com/?apikey=1c07e2b7&&i="+movie
        var response=await movie_operations.getMovies(url)
        BookmarkMovies.push(response)
    }
    console.log(BookmarkMovies)
    movie_operations.present_movies(BookmarkMovies,movie_at,false)
    if(response!=undefined)
        root_module.afterwards(response)
    else
        root_module.afterwards()
    }
