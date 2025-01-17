import { API_URL, appToken } from "../config/index";

import axios from "axios";

export const $api = axios.create({
  baseURL: API_URL,
});

$api.defaults.headers.common["Accept"] = "application/json";
$api.defaults.headers.common["Authorization"] = `Bearer ${appToken}`;

// $api.defaults.headers.common["Content-Type"] =
//   "application/json; charset=utf-8";
// $api.defaults.headers.common["Content-Type"] = "multipart/form-data";

export const initApp = () => {
  const token = localStorage.getItem("accessToken");
  $api.defaults.headers.common.Authorization = `Bearer ${token}`;
};

export const setToken = (token: string) => {
  localStorage.setItem("accessToken", token);
  $api.defaults.headers.common.Authorization = `Bearer ${token}`;
};

export const setExpireIn = (token: string) => {
  localStorage.setItem("kioskExpireIn", token);
};

export const removeToken = () => {
  localStorage.removeItem("accessToken");
  $api.defaults.headers.common.Authorization = ``;
};
