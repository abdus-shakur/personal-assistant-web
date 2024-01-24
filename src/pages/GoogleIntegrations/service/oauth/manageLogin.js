import * as ENV from "../../../../config/env";

export const GOOGLE_QUERY_PARAM_TOKEN_NAME = "access_token";
export const GOOGLE_QUERY_PARAM_EXPIRES_IN = "expires_in";

export const TOKEN_NAME = "google_oauth_bearer";
export const EXPIRY_TIME = "expiry_time";
export const AUTH_TOKEN_LAST_ACCESSED = "auth_token_last_accessed";


export default function oauthSignIn() {
  // Google's OAuth 2.0 endpoint for requesting an access token
  var oauth2Endpoint = 'https://accounts.google.com/o/oauth2/v2/auth';

  // Create <form> element to submit parameters to OAuth 2.0 endpoint.
  var form = document.createElement('form');
  form.setAttribute('method', 'GET'); // Send as a GET request.
  form.setAttribute('action', oauth2Endpoint);

  // Parameters to pass to OAuth 2.0 endpoint.
  var params = {
    'client_id': '1050380400347-4r0o3di26lg4tr1073itvj1t5s6kfcbi.apps.googleusercontent.com',
    'redirect_uri': ENV.GOOGLE_OAUTH_REDIRECT_URL,
    'response_type': 'token',
    'scope': 'https://mail.google.com/',
    'include_granted_scopes': 'true',
    'state': 'pass-through value'
  };

  // Add form parameters as hidden input values.
  for (var p in params) {
    var input = document.createElement('input');
    input.setAttribute('type', 'hidden');
    input.setAttribute('name', p);
    input.setAttribute('value', params[p]);
    form.appendChild(input);
  }

  // Add form to page and submit it to open the OAuth 2.0 endpoint.
  document.body.appendChild(form);
  form.submit();
}

export function retrieveOAuthBearerToken() {
  const queryParameters = new URLSearchParams(window.location.hash.replace(/^#/g, "?"))
  console.log(queryParameters.toString());
  const type = queryParameters.get(GOOGLE_QUERY_PARAM_TOKEN_NAME);
  localStorage.setItem(TOKEN_NAME, type);
  window.location.hash = '';
  localStorage.setItem(EXPIRY_TIME,+new Date()+(+(queryParameters.get(GOOGLE_QUERY_PARAM_EXPIRES_IN))*1000));
  document.cookie = "JSESSIONID=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  return type;
}

export function getAuthTimeRemaining(){
  return (localStorage.getItem(EXPIRY_TIME)-(+new Date()))/1000;
}

export function getAuthToken(){
  if(null!==localStorage.getItem(TOKEN_NAME)&&+new Date()>new Number(localStorage.getItem(EXPIRY_TIME))){
    logoutGoogle();
    return null;
  }
  localStorage.setItem(AUTH_TOKEN_LAST_ACCESSED,+(new Date()));
  return  localStorage.getItem(TOKEN_NAME);
}

export function oauthSignInHandled() {
  return new Promise((resolve, reject) => {
    try {
      let signedIn = getAuthToken();
      console.log("Auth Token From Local Storages : " + signedIn);
      if (null==signedIn) {
        let tokenFromUrl = retrieveOAuthBearerToken();
        console.log("Auth Token From URL / Local Storage " + tokenFromUrl);
        console.log("OAUTH SIgn in handle : Before resolved ");
        if(tokenFromUrl==null){
          oauthSignIn();
        }
      }
      console.log("OAUTH SIgn in handle : resolved");
      resolve();
    } catch (err) {
      console.log("OAUTH SIgn in handle : rejected");
      alert("Error in oauthSignInHandled : "+err)
      reject();
      
    }

  })
}

export function logoutGoogle(){
  localStorage.removeItem(TOKEN_NAME);
  localStorage.removeItem(EXPIRY_TIME);
  localStorage.removeItem(AUTH_TOKEN_LAST_ACCESSED);
}

export function isUserOAuthAuthenticated(){
  let loggedIn = false;
  return new Promise((resolve,reject)=>{
    if(loggedIn){
      resolve();
    }else{
      reject();
    }
  });
}

export function getCodeToken(){
    // Google's OAuth 2.0 endpoint for requesting an access token
    var oauth2Endpoint = 'https://accounts.google.com/o/oauth2/v2/auth';

    // Create <form> element to submit parameters to OAuth 2.0 endpoint.
    var form = document.createElement('form');
    form.setAttribute('method', 'GET'); // Send as a GET request.
    form.setAttribute('action', oauth2Endpoint);

    // Parameters to pass to OAuth 2.0 endpoint.
    var params = {
      'client_id': '1050380400347-4r0o3di26lg4tr1073itvj1t5s6kfcbi.apps.googleusercontent.com',
      'redirect_uri': ENV.GOOGLE_OAUTH_REDIRECT_URL,
      'response_type': 'code',
      'scope': 'https://mail.google.com/',
      'include_granted_scopes': 'true',
      'state': 'pass-through value',
      'access_type':'offline'
    };

    // Add form parameters as hidden input values.
    for (var p in params) {
      var input = document.createElement('input');
      input.setAttribute('type', 'hidden');
      input.setAttribute('name', p);
      input.setAttribute('value', params[p]);
      form.appendChild(input);
    }

    // Add form to page and submit it to open the OAuth 2.0 endpoint.
    document.body.appendChild(form);
    form.submit();
}