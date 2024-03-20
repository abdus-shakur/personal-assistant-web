import * as ENV_VAR from "../../../config/env"

export const WILD_CARD_BASE_URL = "/*";
export const PREFIX = ENV_VAR.IS_GITHUB?"#":"/";

// UI End Points
export const APP_RELATIVE_URL = PREFIX+"app/";
export const APP_LANDING_PAGE = PREFIX+"app/task/todo"//./app/google-integrations/auth-management";
export const ERROR_URL = PREFIX+"error";
export const LOGOUT = PREFIX+"logout";
export const WALLET_CATEGORY_LIST = PREFIX+'wallet/category/list';
export const WALLET_TRANSACTION_TYPES =  PREFIX+'wallet/transaction/type';
export const WALLET_PAYMENT_TYPES =  PREFIX+'wallet/payment/type';
export const WALLET_DETAILS =  PREFIX+'wallet/details';
export const WALLET_RECORD =  PREFIX+'wallet/record';
export const WALLET_RECORD_LIST =  PREFIX+'wallet/record/list';
export const WALLET_SUGGESTION =  PREFIX+'wallet/suggestion';

// API End Points
export const DATA_MANAGER_AUTH_VERIFY = '/auth/verify'; 
export const DATA_MANAGER_AUTH_REGISTER = '/auth/register-user'; 
export const DATA_MANAGER_AUTH_LOGOUT = '/auth/logout-user'; 


