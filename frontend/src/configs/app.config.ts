export const appConfig = {
    apiBaseUrl: process.env.ENV !== 'PROD' ? 'http://localhost:10000/' : '',
};
