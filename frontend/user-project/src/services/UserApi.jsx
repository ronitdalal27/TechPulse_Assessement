import axios from "axios";

const UserAPI = axios.create({
  baseURL: "http://localhost:8080/api/users",
});

// Attach JWT token to every request
UserAPI.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Admin only: fetch all users
export const getAllUsers = async () => UserAPI.get("");

// Fetch user by ID or email
export const getUserById = async (identifier) => UserAPI.get(`/${identifier}`);

// Admin only: delete user by ID
export const deleteUser = async (id) => UserAPI.delete(`/${id}`);

export default UserAPI;
