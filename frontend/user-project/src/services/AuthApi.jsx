import axios from "axios";

const AuthAPI = axios.create({
  baseURL: "http://localhost:8080/api/auth",
});

export const registerUser = async (data) => AuthAPI.post("/register", data);
export const loginUser = async (data) => AuthAPI.post("/login", data);

export default AuthAPI;
