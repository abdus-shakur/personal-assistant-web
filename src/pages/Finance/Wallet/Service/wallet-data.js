import * as UrlConstants from "../../../Utils/Data/UrlConstants";
import GetAxios from "../../../Utils/Service/axios-default";

export function getWalletCatergoryList(){
    return GetAxios().get(UrlConstants.WALLET_CATEGORY_LIST);
}

export function getWalletTransactionTypes(){
    return GetAxios().get(UrlConstants.WALLET_TRANSACTION_TYPES);
}

export function getWalletPaymentTypes(){
    return GetAxios().get(UrlConstants.WALLET_PAYMENT_TYPES);
}

export function fetchWalletDetails(){
    return GetAxios().get(UrlConstants.WALLET_DETAILS);
}

export function createRecord(record){
    return GetAxios().post(UrlConstants.WALLET_RECORD,record);
}

export function fetchRecordList(record){
    return GetAxios().get(UrlConstants.WALLET_RECORD_LIST);
}