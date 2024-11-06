export const appConfig = {
    apiBaseUrl: window.location.hostname.match(/localhost|192.*|127.*|0.*/) ? 'http://localhost:3000': '',
};
