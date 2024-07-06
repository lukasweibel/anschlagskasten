import { writable } from 'svelte/store';

const ACCESS_TOKEN_KEY = 'access_token';
const EXPIRATION_KEY = 'access_token_expiration';

function setAccessToken(token, expiresIn) {
    const expirationTime = new Date().getTime() + expiresIn * 1000;
    localStorage.setItem(ACCESS_TOKEN_KEY, token);
    localStorage.setItem(EXPIRATION_KEY, expirationTime.toString());
}


function isTokenExpired() {
    const expirationTime = parseInt(localStorage.getItem(EXPIRATION_KEY), 10);
    return new Date().getTime() > expirationTime;
}

const storedAccessToken = localStorage.getItem(ACCESS_TOKEN_KEY);

if (storedAccessToken && isTokenExpired()) {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    localStorage.removeItem(EXPIRATION_KEY);
}

export const accessToken = writable(storedAccessToken);

accessToken.subscribe(($accessToken) => {
    if ($accessToken) {
        setAccessToken($accessToken, 3600);
    } else {
        localStorage.removeItem(ACCESS_TOKEN_KEY);
        localStorage.removeItem(EXPIRATION_KEY);
    }
});
