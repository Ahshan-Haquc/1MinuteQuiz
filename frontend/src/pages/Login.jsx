import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuthUser } from "../context/AuthContext";
const Login = () => {
  // State to hold user input
  const [formUser, setFormUser] = useState({ email: "", password: "" });
  let keyName, value;
  const navigate = useNavigate();
  const { user, setUser } = useAuthUser();

  useEffect(() => {
    document.title = "Login - 1MinuteQuiz";
    console.log(user);
  }, []);

  // Handle input changes
  const handleInput = (e) => {
    keyName = e.target.name;
    value = e.target.value;
    setFormUser({ ...formUser, [keyName]: value });
  };

  // Handle login form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          email: formUser.email,
          password: formUser.password,
        }),
      });
      const data = await response.json();
      console.log("user", data.user);
      if (response.ok) {
        alert("Login succesfull.");
        setUser(data.user); // Set user in context
        if (data.user.role === "user") {
          // Redirect to user home page
          navigate("/");
        } else {
          // Rediect admin page
          navigate("/adminDashboard");
        }
      } else {
        alert("Login unsuccesful. Please try later!");
      }
    } catch (err) {
      console.error("Login error:", err);
      alert("Login catch error.");
    }
  };
  return (
    <div className="h-full w-full center">
      <div className="h-[300px] md:h-[400px] w-[350px] md:w-[400px] p-4 bg-white border rounded-lg shadow-lg flex flex-col items-center justify-evenly">
        <h1 className="text-center text-2xl font-bold mb-4">Login</h1>
        <form
          method="post"
          onSubmit={handleSubmit}
          className="w-full flex flex-col items-center"
        >
          <input
            type="email"
            placeholder="Email"
            className="w-full p-2 mb-4 border rounded-md focus:outline-none focus:border-blue-500"
            required
            name="email"
            onChange={handleInput}
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full p-2 mb-4 border rounded-md focus:outline-none focus:border-blue-500"
            required
            name="password"
            onChange={handleInput}
          />
          <button
            type="submit"
            className="w-full p-2 bg-[#37B7C3] text-white rounded-md hover:bg-blue-600 transition duration-200"
          >
            Login
          </button>
        </form>
        <p className="mt-4 text-sm text-gray-600">
          Don't have an account?{" "}
          <NavLink to="/signup" className="text-blue-500 hover:underline">
            Sign Up
          </NavLink>
        </p>
      </div>
    </div>
  );
};

export default Login;
