import GetAxios from "../../../Utils/Service/axios-default";

export function GetBasicVcards(){
    return GetAxios().get("/vcard/basic-response");
}
export function GetVcardById(id){
    return GetAxios().get("/vcard/basic-response/"+id);
}