// src/components/Login.js
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Login.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault(); // stop page reload

    if (!email || !password) {
      alert("Please enter email and password");
      return;
    }

    try {
      const res = await fetch("http://localhost:8080/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (res.ok) {
        const token = await res.text(); // backend returns JWT token as plain text
        localStorage.setItem("token", token);
        navigate("/dashboard"); // go to protected dashboard
      } else {
        alert("Invalid email or password");
      }
    } catch (err) {
      console.error("Login error:", err);
      alert("Server error, please try again later");
    }
  };

  return (
    <div className="login-box">
      <h2>Doctor Login</h2> 
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}
// login email:doctor@gmail.com password:doctor1234