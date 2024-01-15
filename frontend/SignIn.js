import { post_data} from "./authentication.js";
import md5 from "./md5.js"

document.getElementById("SignIn").addEventListener("submit",(e)=>{
    e.preventDefault();
        if(post_data("http://localhost:8080/SignIn",md5,true)){
        }
});
