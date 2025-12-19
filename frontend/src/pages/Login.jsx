import { useState } from "react";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submit = (e) => {
    e.preventDefault();
    login(email, password);
  };

  return (
    <div className="h-screen flex justify-center items-center bg-gray-100">
      <form className="bg-white p-6 shadow rounded w-96" onSubmit={submit}>
        <h2 className="text-xl font-bold mb-4">Login</h2>

        <input
          className="w-full p-2 border mb-3"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          className="w-full p-2 border mb-3"
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="bg-blue-600 text-white px-4 py-2 w-full rounded">
          Login
        </button>
      </form>
    </div>
  );
}
