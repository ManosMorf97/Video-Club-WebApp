function activate_loader(){
    document.getElementsByClassName("lds-ring")[0].style.display="inline-block";
    let body=document.getElementsByTagName("body")[0].style;
    body.opacity="0.3";
    body["pointer-events"]="none";
}

function afterwards(response){
    document.getElementsByClassName("lds-ring")[0].style.display="none";
    let body=document.getElementsByTagName("body")[0].style;
    body.opacity="1";
    body["pointer-events"]="auto";
    if (response!=null)
        return response.ok
}

export default{activate_loader,afterwards}