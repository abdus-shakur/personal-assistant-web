import * as ENV from "../../../config/env";
export const TOKEN_NAME = "google_oauth_bearer";


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
  console.log(+1);
  const type = queryParameters.get("access_token");
  localStorage.setItem(TOKEN_NAME, type);
  window.location.hash = '';
  localStorage.setItem("expiry_time",+new Date()+(new Number(queryParameters.get("expires_in"))*1000));
  return type;
}

export function getAuthToken(){
  if(new Number(localStorage.getItem("expiry_time"))<new Date().now){
    localStorage.setItem(TOKEN_NAME,null);
    return null;
  }
  console.log('Time Remaining : '+(localStorage.getItem("expiry_time")-(+new Date()))/1000);
  return  localStorage.getItem(TOKEN_NAME);
}

export function oauthSignInHandled() {
  return new Promise((resolve, reject) => {
    try {
      let signedIn = getAuthToken();
      console.log("Auth Token From Local Storages : " + signedIn);
      if ('null'===signedIn) {
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
  localStorage.setItem(TOKEN_NAME,null);
}