import * as process from "process";

export const appConfig = {
    apiBaseUrl: () => {
        if (process != undefined && process.env !== undefined) return process?.env?.API_BASE_URL as string
        else return 'http://localhost:3000'
    },
};
