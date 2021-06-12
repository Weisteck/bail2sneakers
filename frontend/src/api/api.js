import axios from "axios";

export const api = axios.create({ baseURL: `https://bail2sneakers.herokuapp.com:${process.env.PORT}/api` })
