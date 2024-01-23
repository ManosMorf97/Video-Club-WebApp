let spanners=document.getElementsByTagName("span");

/*
<div class="external-div">
                <h1>Batman Begins</h1>
                <h2>2005</h2>
                <img src="img1.jpg" alt="none" width="200" height="200" />
                <br>
                <div class="bottom">
                    <a href="" id="more" >more..</a>
                </div>
                <br>
            </div>
            <div class="external-div">
                <h1>Batman Begins</h1>
                <h2>2005</h2>
                <img src="img1.jpg" alt="none" width="200" height="200" />
                <br>
                <h3>Movie</h3>
                <h3>tt0372784</h3>
                <button class="buttonS">LIKE</button>
                <div class="bottom">
                    <a href="" >less</a>
                </div>
                <br>
            </div>




*/

function changeindexedcolor(i){
    return function changecontentcolor(e){
        console.log("WWWWWWWWWWW")
        spanners[i].classList.add("hoveredspan");
    }
    
}
for(let i=0; i<spanners.length; i++){
    spanners[i].addEventListener("mouseover",changeindexedcolor(i));
}

function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}


async function getMovies(url){
    const response=await fetch(url)
    return response.json()

}

async function getMoviesJson(url){
    const response_json=await getMovies(url)
    return response_json.Search
}

document.getElementById("inputSearch").addEventListener("keyup",async function (e){
    let search_value=document.getElementById("inputSearch").value
    let url="http://www.omdbapi.com/?apikey=1c07e2b7&&s="+search_value
    let data=await getMoviesJson(url)
    console.log(data)
})
