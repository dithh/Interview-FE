import axios from "axios";

export const httpClient = axios.create({
    baseURL: "https://data.ssb.no/api/v0/en"
});