import * as Constants from "../Data/Constants";
import * as URLS from "../Data/UrlConstants";
import GetAxios from "./axios-default";

export function registerUser(){
    
}

export function logoutUser() {
    
    return new Promise((resolve, reject) => {
        try {
            
            GetAxios().post(URLS.DATA_MANAGER_AUTH_LOGOUT).then(()=>{
                localStorage.removeItem(Constants.USERNAME);
                localStorage.removeItem(Constants.PASSWORD);
                resolve();
            }).catch((err)=>{
                console.log("Error During Logout ! : "+err);
                localStorage.removeItem(Constants.USERNAME);
                localStorage.removeItem(Constants.PASSWORD);
                resolve();
            });
            
        } catch (err) {
            reject('Failed');
        }
    });
}

export async function isAuthenticated(){
    return await GetAxios().get(URLS.DATA_MANAGER_AUTH_VERIFY).then(()=>true).catch(()=>false);
}

export function loginDataManagerService(username,password){
  
    GetAxios().get(URLS.DATA_MANAGER_AUTH_VERIFY,{
        headers:{
            Authorization: Constants.BASIC+btoa(username+":"+password)
        }
    }).then((response)=>{
        if(response.status===200){
            localStorage.setItem(Constants.USERNAME,username);
            localStorage.setItem(Constants.PASSWORD,password);
            window.location.href=URLS.APP_LANDING_PAGE;
        }else{
            console.log("Login Failed");
        }
    });
}