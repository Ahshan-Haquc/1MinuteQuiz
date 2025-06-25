import React from "react";
import { NavLink } from "react-router-dom";

const ShowingResult = ({ scoreBoard }) => {
  return (
    <div className="h-full w-full center z-10">
      <div className="h-[300px] w-[500px] bg-black text-white border border-white">
        <div className="h-full w-full center flex-col gap-5">
          <div className="text-2xl md:text-4xl baloo-bhai">
            Quick Calculate Result
          </div>
          <div className="flex flex-col gap-5">
            <div className="center flex-col">
              <div className="baloo-bhai2 text-2xl">Total Attempt</div>
              <div className="baloo-bhai text-5xl">
                {scoreBoard.totalAttempt}
              </div>
            </div>
            <div className="center flex-col">
              <div className="baloo-bhai2 text-2xl">Wrong Answer</div>
              <div className="baloo-bhai text-5xl">
                {scoreBoard.wrongAnswer}
              </div>
            </div>
            <div className="center flex-col">
              <div className="baloo-bhai2 text-2xl">Correct Answer</div>
              <div className="baloo-bhai text-5xl">
                {scoreBoard.correctAnswer}
              </div>
            </div>
          </div>
        </div>
      </div>
      <NavLink to="/quick-calculate">
        <div className="h-10 w-40 bg-[#088395] hover:bg-[#066574] hover:cursor-pointer text-white rounded-lg center text-2xl md:text-3xl baloo-bhai mt-5">
          Go Back
        </div>
      </NavLink>
    </div>
  );
};

export default ShowingResult;
props;
