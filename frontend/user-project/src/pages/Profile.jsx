import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Profile() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("userInfo");
    if (!storedUser) {
      navigate("/login"); // redirect if no user info
      return;
    }

    try {
      setUser(JSON.parse(storedUser));
    } catch (err) {
      console.error("Failed to parse userInfo from localStorage", err);
      navigate("/login");
    }
  }, [navigate]);

  if (!user) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="max-w-md mx-auto mt-10 bg-white p-6 rounded-2xl shadow">
      <h2 className="text-2xl font-bold mb-4">Profile</h2>
      <p><strong>Email:</strong> {user.id}</p>
      <p><strong>Roles:</strong> {Array.isArray(user.roles) ? user.roles.join(", ") : "N/A"}</p>
    </div>
  );
}

export default Profile;
