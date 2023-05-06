import axios from "axios";
import { BASE_URL } from "../constant/baseURL";

export const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
});
