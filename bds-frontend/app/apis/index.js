import axios from "axios";
import { getFromStorage } from "../utils";

export const instance = axios.create({
    baseURL:"https://sproj-bds.herokuapp.com/api" || "http://192.168.60.238:5000/api",
});

export const instance1 = axios.create({
    baseURL:"https://bds-ngo.herokuapp.com/api",
});
export default instance
