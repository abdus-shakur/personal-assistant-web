import GetAxios from "../../Utils/Service/axios-default";

export function getBirthdayList(){
    return GetAxios().get('/birthdays/list');
}