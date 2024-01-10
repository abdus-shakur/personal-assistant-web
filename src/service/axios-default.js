import axios from 'axios';

const default_url = "http://192.168.0.2:8081";

export default function GetAxios(){
    return axios.create({baseURL:default_url});
}

// export function GetAxios(url){
//     return axios.create({baseURL:url});
// }