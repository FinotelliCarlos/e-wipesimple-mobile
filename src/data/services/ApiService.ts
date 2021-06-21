import axios from "axios";
import config from "../../../config.local";

const url = `http://${config.MEUIP}:8000/`;

export const ApiService = axios.create({
  baseURL: url,
  headers: {
    "Content-Type": "application/json",
  },
});
