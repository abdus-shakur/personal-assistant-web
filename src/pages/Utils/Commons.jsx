export function callPhoneNumber(number){
    window.location.href = `tel:${number}`
}

export function openWhatsappChat(number,message){
    let url = 'https://wa.me/';
    if(null!==message){
        url = url +`${number.replace('+','').replace(' ','')}?text=${urlEncodeText(message)}`;
    }else{
        url = url +`${number.replace('+','').replace(' ','')}`;
    }
    console.log('Launch URL : '+url);
    window.location.href = url;
}

function urlEncodeText(text){
    return encodeURIComponent(text);
}