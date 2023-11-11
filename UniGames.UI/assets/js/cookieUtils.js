// Set a cookie
function setCookie(name, value, days){
    const expires = days ? `expires=${new Date(Date.now() + days * 24 * 60 * 60 * 1000).toUTCString()}` : '';
    document.cookie = `${name}=${value}; ${expires}; path=/`;
}


// Get cookie value
function getCookie(name){
    const cookies = document.cookie.split('; ');
    for (const cookie of cookies){
        const [cookieName, cookieValue] = cookie.split('=');
        if (cookieName === name){
            return cookieValue;
        }
    }
    return '';
}


function deleteCookie(name){
    setCookie(name, '', -1);
}