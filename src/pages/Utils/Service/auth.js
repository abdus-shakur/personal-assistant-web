import GetAxios from "./axios-default";
import * as URLS from "../Data/UrlConstants";
import * as Constants from "../Data/Constants";
import axios from "axios";
import GetTasks from "../../Task/Service/GetData";



export function logoutUser() {
    let logoutSuccess = true;
    return new Promise((resolve, reject) => {
        try {
            if (logoutSuccess) {
                resolve();
            } else {
                reject('Failed');
            }
        } catch (err) {
            reject('Failed');
        }
    });
}

export async function isAuthenticated(){
    return await GetAxios().get(URLS.VERIFY_AUTH_DATA_MANAGER).then(()=>true).catch(()=>false);
}

export function loginDataManagerService(username,password){
  
    GetAxios().get(URLS.VERIFY_AUTH_DATA_MANAGER,{
        headers:{
            Authorization: Constants.BASIC+btoa(username+":"+password)
        }
    }).then((response)=>{
        if(response.status==200){
            localStorage.setItem(Constants.USERNAME,username);
            localStorage.setItem(Constants.PASSWORD,password);
            window.location.href=URLS.APP_LANDING_PAGE;
        }else{
            console.log("Login Failed");
        }
    });
}