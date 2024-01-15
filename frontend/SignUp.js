import { post_data} from "./authentication.js";
import md5 from "./md5.js"

document.getElementById("SignUp").addEventListener("submit",(e)=>{
    e.preventDefault();
    
    
    
    let error;
    if(document.getElementById("password").value!=document.getElementById("repeated_password").value)
        error="Passwords do not match";
    else{
        post_data("http://localhost:8080/SignUp",md5,false);
    }
});
