import axios from 'axios';
import * as ENV from '../../../config/env';
import * as Constants from '../Data/Constants'

const default_url = ENV.DATA_MANAGER_SERVICE_URL;

function getAuthorizationHeader() {
    let username = localStorage.getItem(Constants.USERNAME);
    let password = localStorage.getItem(Constants.PASSWORD);
    if (null !== username && null !== password) {
        return {
            Authorization: Constants.BASIC + btoa(username + ":" + password)
        }
    } else {
        return {};
    }
}

export default function GetAxios() {
    let axiosObj = axios.create({
        baseURL: default_url,
        headers: getAuthorizationHeader()
    });
    return axiosObj;
}