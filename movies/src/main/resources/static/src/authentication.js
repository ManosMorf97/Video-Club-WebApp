import root_module from "./root_module.js";

let post_data=function(url,md5,connection_attempt,message){
    let successfull=false;
    let hashed_password=md5.MD5(document.getElementById("password").value);
    let email=document.getElementById("email").value;
    console.log(email);
    root_module.activate_loader()
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
        let attempted=root_module.afterwards(response);
        if(connection_attempt&&attempted){
            localStorage.setItem("LoggedIn",document.getElementById("email").value);
        }
        if(attempted){
            console.log(message["success"])
        }
        else{
            console.log(message["error"]);
        }
        successfull=true;})
    .catch((error)=>{ root_module.afterwards(error);
        successfull=false;})
}

export {post_data}
