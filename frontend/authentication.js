import md5 from "./md5.js";
console.log(md5);
document.getElementById("SignUp").addEventListener("submit",(e)=>{
    e.preventDefault();
    
    function afterwards(){
        document.getElementsByClassName("lds-ring")[0].style.display="none";
        external_div=document.getElementsByClassName("external-div")[0].style;
        external_div.opacity="1";
        external_div["pointer-events"]="none";
            
    }

    let post_data=function(email,hashed_password){
        let data={}
        data["email"]=email;
        data["password"]=hashed_password;
        console.log(JSON.stringify({email:email,password:hashed_password}));
        let url="http://localhost:8080/SignUp";
        const xhr=new XMLHttpRequest();
        xhr.open("post",url,true);
        xhr.setRequestHeader('Content-Type','application/json');
        xhr.onload=function(){
            afterwards();
            console.log(xhr.response)
        };
        xhr.onerror=function(){
            afterwards();
            console.log(xhr.response)
        };
        xhr.send(JSON.stringify({email:email,password:hashed_password}));
        /*fetch(url,{
            method: 'post',
            mode: "cors",
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            body:JSON.stringify(data)
        })
        .then( (response)=>{ afterwards(response);})
        .catch((error)=>{ afterwards(error);})*/
    }

    
    let error;
    let hashed_password;
    let email;
    let external_div;
    if(document.getElementById("password").value!=document.getElementById("repeated_password").value)
        error="Passwords do not match";
    else{
        hashed_password=md5.MD5(document.getElementById("password").value);
        email=document.getElementById("email").value;
        console.log(email);
        document.getElementsByClassName("lds-ring")[0].style.display="inline-block";
        external_div=document.getElementsByClassName("external-div")[0].style;
        external_div.opacity="0.3";
        external_div["pointer-events"]="none";
        post_data(email,hashed_password);
    }
})