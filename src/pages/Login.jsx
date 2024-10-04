import React, { useState } from "react";

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your authentication logic here
    if (username === "" && password === "") {
      onLogin(); // Simulate successful login
    } else {
      // alert("Invalid credentials");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form
        className="bg-white p-8 rounded-lg shadow-md w-96"
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl font-semibold mb-6">Login</h2>
        <div className="mb-4">
          <label className="block text-gray-700">Username</label>
          <input
            type="text"
            // value={username}
            // onChange={(e) => setUsername(e.target.value)}
            className="w-full px-4 py-2 border rounded"
            // required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Password</label>
          <input
            type="password"
            // value={password}
            // onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border rounded"
            // required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
