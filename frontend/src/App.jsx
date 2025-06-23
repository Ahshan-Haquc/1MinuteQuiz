import AdminDashboard from "../pages/AdminDashboard";
import AdminManageFeedback from "../pages/AdminManageFeedback";
import AdminManageUsers from "../pages/AdminManageUsers";
import Feedback from "../pages/Feedback";
import GuessTheWord from "../pages/GuessTheWord";
import Home from "../pages/Home";
import Login from "../pages/Login";
import ManageGuessTheWord from "../pages/ManageGuessTheWord";
import ManageQuickCalculate from "../pages/ManageQuickCalculate";
import QuickCalculate from "../pages/QuickCalculate";
import QuizInfo from "../pages/QuizInfo";
import Signup from "../pages/Signup";

import { BrowserRouter, Route, Routes } from "react-router-dom";

import "./App.css";

function App() {
  return (
    <>
      <div className="h-screen w-screen bg-[#EBF4F6]">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/guessTheWord" element={<GuessTheWord />} />
            <Route path="/quickCalculate" element={<QuickCalculate />} />
            <Route path="/feedback" element={<Feedback />} />
            <Route path="/quizInfo" element={<QuizInfo />} />
            <Route path="/adminDashboard" element={<AdminDashboard />} />
            <Route path="/adminManageUsers" element={<AdminManageUsers />} />
            <Route
              path="/adminManageFeedback"
              element={<AdminManageFeedback />}
            />
            <Route
              path="/manageGuessTheWord"
              element={<ManageGuessTheWord />}
            />
            <Route
              path="/manageQuickCalculate"
              element={<ManageQuickCalculate />}
            />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
