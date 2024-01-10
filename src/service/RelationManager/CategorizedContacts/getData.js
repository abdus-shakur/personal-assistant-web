import GetAxios from "../../axios-default";

export function GetBasicVcards(){
    return GetAxios().get("/vcard/basic-response");
}