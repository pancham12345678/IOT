import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { handleLogin } = useAuth();
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    const success = await handleLogin(email, password);
    if (success) {
      navigate("/");
    } else {
      setError("Invalid email or password");
    }
  };

  return (
    <form onSubmit={onSubmit} className="p-6">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-100">Welcome Back</h2>
      {error && <div className="mb-4 text-red-400 text-center">{error}</div>}
      <div className="mb-4">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 border rounded bg-gray-700 text-gray-100 border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none placeholder-gray-400"
          required
        />
      </div>
      <div className="mb-6">
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 border rounded bg-gray-700 text-gray-100 border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none placeholder-gray-400"
          required
        />
      </div>
      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-3 px-4 rounded hover:bg-blue-700 transition-colors font-medium"
      >
        Login
      </button>
    </form>
  );
};

export default LoginForm;
