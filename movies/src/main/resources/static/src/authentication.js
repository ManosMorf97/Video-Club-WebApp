function afterwards(response){
    document.getElementsByClassName("lds-ring")[0].style.display="none";
    let external_div=document.getElementsByClassName("external-div")[0].style;
    external_div.opacity="1";
    external_div["pointer-events"]="auto";
    console.log(response.text())
        
}

let post_data=function(url,md5,connection_attempt){
    let successfull=false;
    let hashed_password=md5.MD5(document.getElementById("password").value);
    let email=document.getElementById("email").value;
    console.log(email);
    document.getElementsByClassName("lds-ring")[0].style.display="inline-block";
    let external_div=document.getElementsByClassName("external-div")[0].style;
    external_div.opacity="0.3";
    external_div["pointer-events"]="none";
    let data={}
    data["email"]=email;
    data["password"]=hashed_password;
    console.log(JSON.stringify({'email':email,'password':hashed_password}));
    fetch(url,{
        method: 'post',
        mode: 'cors',
        headers: {
            "Content-Type": "application/json",
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body:JSON.stringify(data)
    })
    .then( (response)=>{ 
        afterwards(response);
        if(connection_attempt){
            localStorage.setItem("LoggedIn",document.getElementById("email").value);
        }
        successfull=true;})
    .catch((error)=>{ afterwards(error);
        successfull=false;})
}

export {post_data,afterwards}



