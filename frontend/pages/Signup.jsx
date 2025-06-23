import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import "../src/App.css";
const Signup = () => {
  useEffect(() => {
    document.title = "Sign Up - 1MinuteQuiz";
  }, []);

  const [user, setUser] = useState({ userName: "", email: "", password: "" });
  let keyName, value;
  const handleInput = (e) => {
    keyName = e.target.name;
    value = e.target.value;
    setUser({ ...user, [keyName]: value });
    console.log(user.userName);
  };
  return (
    <div className="h-full w-full flex justify-center items-center center">
      <div className="h-[400px] md:h-[500px] w-[350px] md:w-[400px] p-4 bg-white border rounded-lg shadow-lg flex flex-col items-center justify-evenly">
        <h1 className="text-center text-2xl font-bold mb-4">Sign Up</h1>
        <form method="POST" className="w-full flex flex-col items-center">
          <input
            type="text"
            placeholder="Username"
            className="w-full p-2 mb-4 border rounded-md focus:outline-none focus:border-blue-500"
            required
            name="userName"
            onChange={handleInput}
          />
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
            className="w-full p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-200"
          >
            Sign Up
          </button>
        </form>
        <p className="mt-4 text-sm text-gray-600">
          Already have an account?{" "}
          <NavLink to="/login" className="text-blue-500 hover:underline">
            Log in
          </NavLink>
        </p>
      </div>
    </div>
  );
};

export default Signup;
