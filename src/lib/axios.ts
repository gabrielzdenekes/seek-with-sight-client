import { appConfig } from "@/config";
import axios from "axios";

export const api = axios.create({
    ...appConfig.api
});

// Instance without interceptors
export const apiPublic = axios.create({
    ...appConfig.api
});
