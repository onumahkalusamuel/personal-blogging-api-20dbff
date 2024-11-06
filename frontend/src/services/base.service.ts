import axios from "axios";
import {appConfig} from "../configs/app.config.ts";

const BaseService = axios.create({
    baseURL: appConfig.apiBaseUrl,
    timeout: 50000,
    proxy: false,
    headers: {'Content-Type': 'application/json'},
})

export default BaseService
