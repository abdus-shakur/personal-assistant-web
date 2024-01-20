import axios from "axios";
import * as googleLogin from  '../../oauth/manageLogin.js' ;
import * as ENV from "../../../../config/env.js";

const baseURL = ENV.GOOGLE_SERVICE_URL;
// const baseURL = "http://localhost:8080"

function create(){
    axios.defaults.withCredentials = true;
    return axios.create({baseURL:baseURL,
        headers:
            {
                "ngrok-skip-browser-warning": "69420",
              }
            });
}

export function setToken(){
    return create().get("/email/set-token?bearer="+googleLogin.getAuthToken());
}

export function getEmailList(){
    return create().get("/email/list?bearer="+googleLogin.getAuthToken());
}

export function getEmailDetail(id){
    return create().get("/email/detail?bearer="+googleLogin.getAuthToken()+"&id="+id);
}