import axios from 'axios';
import * as ENV from '../config/env';

const default_url = ENV.DATA_MANAGER_SERVICE_URL;

export default function GetAxios(){
    return axios.create({baseURL:default_url});
}

// export function GetAxios(url){
//     return axios.create({baseURL:url});
// }