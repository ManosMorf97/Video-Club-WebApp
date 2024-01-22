let spanners=document.getElementsByTagName("span");

function changeindexedcolor(i){
    return function changecontentcolor(e){
        console.log("WWWWWWWWWWW")
        spanners[i].classList.add("hoveredspan");
    }
    
}
for(let i=0; i<spanners.length; i++){
    spanners[i].addEventListener("mouseover",changeindexedcolor(i));
}
