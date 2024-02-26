import root_module from "./root_module.js";

let addmovie
let deletemovie

function bring_my_movies(){
    if(localStorage.getItem("MyMovies")!=null&&localStorage.getItem("MyMovies")!=undefined)
        return localStorage.getItem("MyMovies")
    root_module.activate_loader()
    let data={}
    data["email"]=localStorage.getItem("LoggedIn")
    let url="http://localhost:8080/MyBookmarks"
    fetch(url,{
        method:'post',
        mode:'cors',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify(data)
    }).then((response)=>response.json()).
    then((response)=>{
        localStorage.setItem("MyMovies",JSON.stringify(response.map((res)=>res.movieId)))
        console.log(JSON.parse(localStorage.getItem("MyMovies")))
        root_module.afterwards(response)
    })
}

function begin(message="Welcome "+localStorage.getItem("LoggedIn")){

    let spanners=document.getElementsByTagName("span");
    if(localStorage.getItem("LoggedIn")===null||localStorage.getItem("LoggedIn")===undefined){
        let body=document.getElementsByTagName("body")[0].style;
        body.opacity="0.3";
        body["pointer-events"]="none";
    }else{
        document.getElementById("message_to_user").appendChild(
            document.createTextNode(message))
        bring_my_movies()
    }

    function changeindexedcolor(i){
        return function changecontentcolor(e){
            console.log("WWWWWWWWWWW")
            spanners[i].classList.add("hoveredspan");
        }
        
    }

    for(let i=0; i<spanners.length; i++){
        spanners[i].addEventListener("mouseover",changeindexedcolor(i));
    }
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

async function getBlob(url){
    const response=await fetch(url)
    return response.blob()
}

async function getImageURL(url){
    const blob=await getBlob(url)
    return URL.createObjectURL(blob)
}

function bottomHref(bottom_div,info_message){
    let a_bottom=document.createElement("a")
    a_bottom.setAttribute("href","javascript:void(0);")
    //a_bottom.setAttribute("id","more"+movie.imdbId)
    a_bottom.appendChild(document.createTextNode(info_message))
    bottom_div.appendChild(a_bottom)
    return a_bottom
}


let moreInfo=null
let lessInfo=null
let CreateButton
//https://www.geeksforgeeks.org/binary-search-in-javascript/
function search_my_movies(arr, x, start, end, insert=false) {
    // Base Condition
    if (start > end){
        if(insert){
            insert_localy_movie_if_possible(arr,x,start)
            return start
        }
        return -1;
    } 
 
    let mid = Math.floor((start + end) / 2);

    if(insert){
        insert_localy_movie_if_possible(arr,x,start,end)
    }

    if (arr[mid] === x) return mid;
    
    if (arr[mid] > x)
        return search_my_movies(arr, x, start, mid - 1);
    else
        return search_my_movies(arr, x, mid + 1, end);
}

function insert_localy_movie_if_possible(arr,x,start){
    if(arr[start]<x && x<arr[start+1])
        arr.splice(start+1,0,x)
    else{//for good and bad
        for (let i=0; i<=arr.length-2; i++){
            if(arr[i]<x && x<arr[i+1])
                arr.splice(i+1,0,x)
        }
    }
}


function delete_localy_movie(INDEX,response,div_button_element,movie){
    let arr=JSON.parse(localStorage.getItem("MyMovies"))
    let json_parsed_arr=arr.slice(0,INDEX).concat(arr.slice(INDEX+1))
    localStorage.setItem("MyMovies",JSON.stringify(json_parsed_arr))
    let parameters=["LIKE",addmovie,"buttonS"]
    CreateButton(div_button_element,parameters,movie,INDEX)
    root_module.afterwards(response)
    console.log(localStorage.getItem("MyMovies"))
}

async function movie_add_delete(method_name,ID,semi_path){
    let data={}
    data['movieId']=ID
    data['email']=localStorage.getItem("LoggedIn")
    let url='http://localhost:8080/'+semi_path
    root_module.activate_loader()
    let response= await fetch(url,{
        method:method_name,
        mode:'cors',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify(data)
    })
    return response
}

deletemovie=function(ID,index,div_button_element,movie){
    return async function(e){
        console.log("DELETER")
        let response=await movie_add_delete('delete',ID,"MyBookmarks")
        delete_localy_movie(index,response,div_button_element,movie)

     }
}

addmovie=function(ID,index,div_button_element,movie){
    return async function(e){
        let movie_ids=JSON.parse(localStorage.getItem("MyMovies"))
        let response=await movie_add_delete('post',ID,"Welcome")
        if(ID<movie_ids[0]){
            index=0
            movie_ids.splice(0,0,ID)
        }else if(ID>movie_ids[movie_ids.length-1]){
            index=movie_ids.length-1
            movie_ids.splice(movie_ids.length,0,ID)
        }else
            index=search_my_movies(movie_ids,ID,0,movie_ids.length-1,true)
        let parameters=["DISLIKE",deletemovie,"RedButtonS"]
        localStorage.setItem("MyMovies",JSON.stringify(movie_ids))
        CreateButton(div_button_element,parameters,movie,index)
        root_module.afterwards(response)
    }
}

function LogOut(){
    localStorage.removeItem("LoggedIn")
    localStorage.removeItem("MyMovies")
}

moreInfo=function(external_div,movie,bottom_div,a_bottom,search){
    return function(e){
        console.log(localStorage.getItem("MyMovies"))
        let more_info_div=document.createElement("div")
        bottom_div.removeChild(a_bottom)
        external_div.removeChild(bottom_div)
        let added_attributes=["imdbID","Type"]
        for(let attribute of added_attributes){
            let element=document.createElement("h3")
            element.appendChild(document.createTextNode(movie[attribute]))
            more_info_div.appendChild(element)
        }
        let bookmark_added_attributes=[]
        if(!search)
            bookmark_added_attributes=["Director","Writer","Actors","Plot","Genre","Runtime"]
        for(let attribute of bookmark_added_attributes){
            let element=document.createElement("h3")
            element.appendChild(document.createTextNode(attribute+": "+movie[attribute]))
            more_info_div.appendChild(element)
        }
        let div_button_element=document.createElement("div")
        let parameters=["DISLIKE",deletemovie,"RedButtonS"]
        let movie_ids=JSON.parse(localStorage.getItem("MyMovies"))
        let index=0
        if(search)
            index=search_my_movies(movie_ids,movie.imdbID,0,movie_ids.length-1)
        if(index===-1)
            parameters=["LIKE",addmovie,"buttonS"]
        CreateButton(div_button_element,parameters,movie,index)
        let less_bottom_div=document.createElement("div")
        less_bottom_div.classList.add("bottom")
        less_bottom_div.appendChild(bottomHref(bottom_div,"less.."))
        more_info_div.appendChild(div_button_element)
        more_info_div.appendChild(less_bottom_div)
        external_div.appendChild(more_info_div)
        external_div.appendChild(document.createElement("br"))
        less_bottom_div.addEventListener("click",lessInfo(external_div,more_info_div,movie,search))
    }
}

lessInfo=function(external_div,more_info_div,movie,search){
    return function(e){
        external_div.removeChild(more_info_div)
        let bottom_div=document.createElement("div")
        bottom_div.classList.add("bottom")
        let a_bottom=bottomHref(bottom_div,"more..")
        bottom_div.appendChild(a_bottom)
        external_div.appendChild(bottom_div)
        external_div.appendChild(document.createElement("br"))
        bottom_div.addEventListener("click",moreInfo(external_div,movie,bottom_div,a_bottom,search))
    }
}
document.getElementById("bye").onclick=LogOut

CreateButton=function(div_button_element,parameters,movie,index){
    removeAllChildNodes(div_button_element)
    let button_element=document.createElement("button")
    button_element.appendChild(document.createTextNode(parameters[0]))
    button_element.addEventListener("click",parameters[1](movie.imdbID,index,div_button_element,movie))
    button_element.classList.add(parameters[2])
    div_button_element.appendChild(button_element)
    div_button_element.appendChild(document.createElement("br"))
}

async function present_movies(movies,movie_at,search){
    for(let movie of movies){
        let external_div=document.createElement("div")
        external_div.classList.add("external-div")
        let attributes=["h1","h2"]
        let properties=[movie.Title,movie.Year]
        for(let i=0; i<2; i++){
            let element=document.createElement(attributes[i])
            let text=document.createTextNode(properties[i])
            element.appendChild(text)
            external_div.appendChild(element)
        }
        let imageURL=await getImageURL(movie.Poster)
        let img_el=document.createElement("img")
        img_el.setAttribute("src",imageURL)
        img_el.setAttribute("alt","none") //make it better
        img_el.setAttribute("width","200")
        img_el.setAttribute("height","200")
        external_div.appendChild(img_el)
        external_div.appendChild(document.createElement("br"))
        let bottom_div=document.createElement("div")
        bottom_div.classList.add("bottom")
        let a_bottom=bottomHref(bottom_div,"more..")
        a_bottom.addEventListener("click",moreInfo(external_div,movie,bottom_div,a_bottom,search))
        external_div.appendChild(bottom_div)
        external_div.appendChild(document.createElement("br"))
        movie_at.appendChild(external_div)
    }
}

var BookmarkMovies
export default{removeAllChildNodes,getMoviesJson,present_movies,getMovies,begin}