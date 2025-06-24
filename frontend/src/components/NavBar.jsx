import { useNavigate } from "react-router-dom";

import darkmode from "../assets/icons/darkmode.png";
import info from "../assets/icons/info.png";
import logout from "../assets/icons/logout.png";
import feedback from "../assets/icons/rate.png";

const NavBar = () => {
  const navigate = useNavigate();

  const performLogout = () => {
    localStorage.removeItem("token");

    try {
      fetch("http://localhost:3000/logout", {
        method: "GET",
        credentials: "include", // it is must for sending cookie
      });

      navigate("/login");
    } catch (error) {
      console.error("Error during logout:", error);
      alert("Error logging out. Please try again.");
    }
  };
  return (
    <div className="h-16 w-full pt-3 px-3 md:pt-6 md:px-6 flex justify-between items-center">
      <div className=" text-3xl md:text-5xl baloo-bhai text-[#088395] px-4 py-1 rounded">
        1MinuteQuiz
      </div>
      <div className="flex gap-2 md:gap-4">
        <div className="group h-9 w-9 md:h-12 md:w-12 p-2 rounded-full bg-[#088395] text-white duration-300 hover:bg-white hover:text-[#088395] flex items-center justify-center">
          <img
            className="h-full w-full object-cover group-hover:invert-0 group-hover:brightness-100 invert brightness-0"
            src={feedback}
            alt=""
          />
        </div>
        <div className="group h-9 w-9 md:h-12 md:w-12 p-2 rounded-full bg-[#088395] duration-300 hover:bg-white flex items-center justify-center">
          <img
            className="h-full w-full object-cover group-hover:invert-0 group-hover:brightness-100 invert brightness-0"
            src={darkmode}
            alt=""
          />
        </div>
        <div className="group h-9 w-9 md:h-12 md:w-12 p-2 rounded-full bg-[#088395] duration-300 hover:bg-white flex items-center justify-center">
          <img
            className="h-full w-full object-cover group-hover:invert-0 group-hover:brightness-100 invert brightness-0"
            src={info}
            alt=""
          />
        </div>
        <div
          className="group h-9 w-9 md:h-12 md:w-12 p-2 md:p-3 rounded-full bg-[#088395] duration-300 hover:bg-white flex items-center justify-center"
          onClick={performLogout}
        >
          <img
            className="h-full w-full object-cover group-hover:invert-0 group-hover:brightness-100 invert brightness-0"
            src={logout}
            alt=""
          />
        </div>
      </div>
    </div>
  );
};

export default NavBar;
