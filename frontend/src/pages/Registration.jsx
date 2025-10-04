import { useState } from "react";
import api from "../lib/axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import "../../styles.css";

const Registration = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Handle input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await api.post("/users/register", formData);

      if (res.status === 201 || res.status === 200) {
        toast.success("Registration successful!");
        setFormData({ username: "", password: "" });
        navigate("/login");
      } else {
        toast.error(res.data?.message || "Something went wrong.");
      }
    } catch (error) {
      console.error("Registration error:", error);
      toast.error(error.response?.data?.message || "Failed to register user.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-container">
      <div className="register-card">
        <h2 className="register-title">Create an Account 🌱</h2>
        <p className="register-subtitle">
          Join and start asking questions today!
        </p>

        <form onSubmit={handleSubmit} className="register-form">
          {/* Username Field */}
          <div className="form-group">
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>

          {/* Password Field */}
          <div className="form-group">
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          {/* Submit Button */}
          <button type="submit" className="register-btn" disabled={loading}>
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        {/* Footer */}
        <div className="register-footer">
          <p>
            Already have an account?{" "}
            <span onClick={() => navigate("/login")}>Click here to login</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Registration;
