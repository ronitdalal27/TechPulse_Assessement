import { useState } from "react";
import { registerUser } from "../services/AuthApi";
import { useNavigate } from "react-router-dom";

function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "", role: "" });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await registerUser(form);
      setMessage(res.data);
      setTimeout(() => navigate("/login"), 1500);
    } catch (err) {
      setMessage(err.response?.data || "Registration failed");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white p-6 rounded-2xl shadow">
      <h2 className="text-2xl font-bold mb-4 text-center">Register</h2>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input type="text" name="name" placeholder="Name" className="border p-2 w-full rounded" onChange={handleChange} />
        <input type="email" name="email" placeholder="Email" className="border p-2 w-full rounded" onChange={handleChange} />
        <input type="password" name="password" placeholder="Password" className="border p-2 w-full rounded" onChange={handleChange} />
        <select name="role" onChange={handleChange} className="border p-2 w-full rounded">
          <option value="">Select Role (default USER)</option>
          <option value="ROLE_USER">USER</option>
          <option value="ROLE_ADMIN">ADMIN</option>
        </select>
        <button type="submit" className="bg-blue-600 text-white w-full py-2 rounded hover:bg-blue-700">Register</button>
      </form>
      {message && <p className="mt-3 text-center text-sm text-gray-700">{message}</p>}
    </div>
  );
}

export default Register;
