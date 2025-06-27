import NavBar from "../components/NavBar";
import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
const AdminDashboard = () => {
  const [dashboardValues, setDashboardValues] = useState({
    totalUserCount: 0,
    totalFeedbackCount: 0,
  });
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await fetch(
          "http://localhost:3000/loadAdminDashboardValues",
          {
            method: "GET",
            headers: { "Content-Type": "application/json" },
          }
        );
        const data = await response.json();
        if (response.ok) {
          setDashboardValues({
            totalUserCount: data.userCount,
            totalFeedbackCount: data.feedbackCount,
          });
        } else {
          alert("Response not come.");
        }
      } catch (error) {
        console.log("Error is fetching this page data : ", error);
        alert("Error catched.");
      }
    };

    fetchDashboardData();
  }, []);
  return (
    <div className="h-full w-full flex flex-col">
      <NavBar pageName="showHomePage" />
      <div className="pb-10 flex flex-col md:flex-row flex-grow gap-10 items-center justify-center">
        {/* box  */}
        <div className="h-[250px] w-[300px] md:w-[600px] bg-[#088395] text-[#EBF4F6] rounded-md center flex-col gap-4 baloo-bhai">
          <div className="text-3xl md:text-4xl">Total Users</div>
          <div className="text-3xl md:text-7xl">
            {dashboardValues.totalUserCount}
          </div>
          <NavLink
            to="/adminManageUsers"
            className="h-9 md:h-12 w-[160px] bg-[#37B7C3] rounded-md center text-2xl md:text-4xl hover:bg-[#35aab4]"
          >
            Manage
          </NavLink>
        </div>
        {/* box  */}
        <div className="h-[250px] w-[300px] md:w-[600px] bg-[#088395] text-[#EBF4F6] rounded-md center flex-col gap-4 baloo-bhai">
          <div className="text-3xl md:text-4xl">Total Feedbacks</div>
          <div className="text-3xl md:text-7xl">
            {dashboardValues.totalFeedbackCount}
          </div>
          <NavLink
            to="/adminManageFeedback"
            className="h-9 md:h-12 w-[160px] bg-[#37B7C3] rounded-md center text-2xl md:text-4xl hover:bg-[#35aab4]"
          >
            Manage
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
