import { useEffect } from "react";
import clock from "../assets/icons/clock.png";
import Footer from "../components/Footer";
import NavBar from "../components/NavBar";
import Number from "../components/quickQuiz/Number";

import { useStoreClickedNum } from "../context/quickCalculate/StoreClickedNum";

const QuickCalculate = () => {
  // this will store the clicked number in the quickNum state and set it to the store
  const { quickNum, setQuickNum } = useStoreClickedNum();

  //setting page title
  useEffect(() => {
    document.title = "Quick Calculate";
  }, []);

  // this will clear the quickNum state when the clear button is clicked
  const handleClear = () => {
    setQuickNum(0);
  }

  return (
    <div className="h-full w-full flex flex-col">
      <NavBar pageName="quickCalculatePage" />
      <div className="pb-10 flex flex-grow gap-10 items-center justify-center">
        {/* quiz action - right side part */}
        <div className="h-[480px] w-[750px] p-3 border border-[#088395] rounded-2xl">
          {/* displaying clock  */}
          <div className="h-[10%] w-full flex">
            <div className="h-10 w-10">
              <img src={clock} alt="" />
            </div>
            <div className="ml-2 text-5xl text-[#088395] baloo-bhai">00:59</div>
          </div>
          {/* displaying quiz question */}
          <div className="h-[30%] w-full bg-slate-200 rounded-t-2xl cernter baloo-bhai text-2xl md:text-6xl ">
            <div className="h-full w-full center ">
              <div>5 + 3 =</div>
              <div className="h-[85px] w-[136px] ml-3 bg-white border border-[#088395] center rounded-lg overflow-hidden">
                {quickNum}
              </div>
            </div>
          </div>
          {/* displaying quiz buttons */}
          <div className="h-[60%] w-full">
            <div className="h-1/3  flex justify-between ">
              <Number number={1} />
              <Number number={2} />
              <Number number={3} />
              <Number number={4} />
              <Number number={5} />
            </div>
            <div className="h-1/3 my-1 flex justify-between ">
              <Number number={6} />
              <Number number={7} />
              <Number number={8} />
              <Number number={9} />
              <Number number={0} />
            </div>

            <div className="h-1/3  flex">
              <div className="h-full w-1/2 mr-2 bg-[#088395] hover:bg-[#066574] hover:cursor-pointer text-[#071952] rounded-lg center text-2xl md:text-6xl baloo-bhai" onClick={handleClear}>
                Clear
              </div>
              <div className="h-full w-1/2 ml-2 bg-[#088395] hover:bg-[#066574] hover:cursor-pointer text-white rounded-lg center text-2xl md:text-6xl baloo-bhai">
                Submit
              </div>
            </div>
          </div>
        </div>
        {/* score board part */}
        <div className="h-[480px] w-[350px] flex flex-col justify-between items-center">
          <div className="text-2xl md:text-4xl  baloo-bhai">
            Quick Calculate
          </div>
          <div className="flex flex-col gap-5">
            <div className="center flex-col ">
              <div className=" baloo-bhai2 text-2xl">Total Attempt</div>
              <div className=" baloo-bhai text-5xl">2</div>
            </div>
            <div className="center flex-col ">
              <div className=" baloo-bhai2 text-2xl">Wrong Answer</div>
              <div className=" baloo-bhai text-5xl">2</div>
            </div>
            <div className="center flex-col ">
              <div className=" baloo-bhai2 text-2xl">Correct Answer</div>
              <div className=" baloo-bhai text-5xl">2</div>
            </div>
          </div>
          <button className="h-9 md:h-12 w-[160px] text-white bg-[#37B7C3] rounded-md center text-2xl md:text-3xl hover:bg-[#35aab4]">
            Start
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default QuickCalculate;
