import { useState } from "react";
import { loginUser } from "../services/AuthApi";
import { useNavigate } from "react-router-dom";

function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await loginUser(form);
      const token = res.data.token;

      // Store token
      localStorage.setItem("token", token);

      // Decode JWT to get user info
      const payload = JSON.parse(atob(token.split(".")[1]));
      const roles = payload.roles || [];

      // Store full user info for normal users
      const userInfo = {
        id: payload.sub || payload.id || payload.email, // fallback if id missing
        name: payload.name || payload.sub || payload.email, // fallback to email
        email: payload.email || payload.sub,
        roles: roles,
      };
      localStorage.setItem("userInfo", JSON.stringify(userInfo));

      setMessage("Login successful!");

      if (roles.includes("ROLE_ADMIN")) navigate("/users");
      else navigate("/profile");
    } catch (err) {
      console.error(err);
      setMessage("Login failed. Check credentials.");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white p-6 rounded-2xl shadow">
      <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="email"
          name="email"
          placeholder="Email"
          className="border p-2 w-full rounded"
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          className="border p-2 w-full rounded"
          onChange={handleChange}
        />
        <button
          type="submit"
          className="bg-green-600 text-white w-full py-2 rounded hover:bg-green-700"
        >
          Login
        </button>
      </form>
      {message && <p className="mt-3 text-center text-sm text-gray-700">{message}</p>}
    </div>
  );
}

export default Login;
