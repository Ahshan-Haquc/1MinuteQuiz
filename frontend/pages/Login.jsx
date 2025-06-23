import { useEffect } from "react";
import { NavLink } from "react-router-dom";
const Login = () => {
  useEffect(() => {
    document.title = "Login - 1MinuteQuiz";
  }, []);
  return (
    <div className="h-full w-full center">
      <div className="h-[300px] md:h-[400px] w-[350px] md:w-[400px] p-4 bg-white border rounded-lg shadow-lg flex flex-col items-center justify-evenly">
        <h1 className="text-center text-2xl font-bold mb-4">Login</h1>
        <form className="w-full flex flex-col items-center">
          <input
            type="email"
            placeholder="Email"
            className="w-full p-2 mb-4 border rounded-md focus:outline-none focus:border-blue-500"
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full p-2 mb-4 border rounded-md focus:outline-none focus:border-blue-500"
            required
          />
          <button
            type="submit"
            className="w-full p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-200"
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
