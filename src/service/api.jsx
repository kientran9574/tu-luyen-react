import axios from "../utils/axios-customize";
export const postRegister = (fullName, email, password, phone) => {
  return axios.post("api/v1/user/register", {
    fullName,
    email,
    password,
    phone,
  });
};
export const postLogin = (username, password) => {
  return axios.post("api/v1/auth/login", { username, password });
};
export const fetchAccountToken = () => {
  return axios.get("api/v1/auth/account");
};
export const postLogout = () => {
  return axios.post("api/v1/auth/logout");
};
export const fetchListUser = (query) => {
  return axios.get(`api/v1/user?${query}`);
};
export const postCreateUser = (fullName, email, phone, password) => {
  return axios.post(`api/v1/user`, { fullName, email, phone, password });
};
export const fetchDataExcel = (data) => {
  return axios.post("api/v1/user/bulk-create", data);
};
export const putUpdateUser = (_id, fullName, phone) => {
  return axios.put("api/v1/user", { _id, fullName, phone });
};
export const deleteUser = (userId) => {
  return axios.delete(`api/v1/user/${userId}`);
};
