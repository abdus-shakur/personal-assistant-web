import axios from 'axios';
import * as ENV from '../../../config/env';
import * as Constants from '../Data/Constants'

const default_url = ENV.DATA_MANAGER_SERVICE_URL;

const axiosObject = axios.create({ baseURL: default_url })

export default function GetAxios() {
    let username = localStorage.getItem(Constants.USERNAME);
    let password = localStorage.getItem(Constants.PASSWORD);

    let axiosObj = axios.create({
        baseURL: default_url,
        headers: {
            Authorization: Constants.BASIC + btoa(username + ":" + password)
        }
    });

    return axiosObj;
}

// export function GetAxios(url){
//     return axios.create({baseURL:url});
// }