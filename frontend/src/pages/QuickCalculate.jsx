import { useEffect, useState } from "react";
import clock from "../assets/icons/clock.png";
import Footer from "../components/Footer";
import NavBar from "../components/NavBar";
import Number from "../components/quickQuiz/Number";
import ShowingResult from "../components/quickQuiz/ShowingResult";
import { useStoreClickedNum } from "../context/quickCalculate/StoreClickedNum";

const operators = ["+", "-", "*"];

const QuickCalculate = () => {
  const { quickNum, setQuickNum } = useStoreClickedNum();
  const [timeCount, setTimeCount] = useState(60);
  const [scoreBoard, setScoreBoard] = useState({
    totalAttempt: 0,
    wrongAnswer: 0,
    correctAnswer: 0,
  });

  const [num1, setNum1] = useState(0);
  const [num2, setNum2] = useState(0);
  const [operator, setOperator] = useState("+");
  const [isRunning, setIsRunning] = useState(false);
  const [timerId, setTimerId] = useState(null);

  useEffect(() => {
    document.title = "Quick Calculate";
  }, []);

  const generateNewQuestion = () => {
    setNum1(Math.floor(Math.random() * 9) + 1);
    setNum2(Math.floor(Math.random() * 9) + 1);
    setOperator(operators[Math.floor(Math.random() * operators.length)]);
  };

  const calculateAnswer = () => {
    switch (operator) {
      case "+":
        return num1 + num2;
      case "-":
        return Math.abs(num1 - num2);
      case "*":
        return num1 * num2;
      default:
        return 0;
    }
  };

  const startCountDown = () => {
    if (isRunning) return;
    generateNewQuestion();
    setIsRunning(true);
    setTimeCount(60);

    const interval = setInterval(() => {
      setTimeCount((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setIsRunning(false);
          setTimeCount(60);
          setQuickNum(0);
          setScoreBoard({ totalAttempt: 0, wrongAnswer: 0, correctAnswer: 0 });
          setNum1(0);
          setNum2(0);
          setOperator("+");
          alert(
            `Time's up! Your total correct answers: ${scoreBoard.correctAnswer}`
          );
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    setTimerId(interval);
  };

  const endCountDown = () => {
    if (timerId) clearInterval(timerId);
    setIsRunning(false);
    setTimeCount(60);
    setQuickNum(0);
    setScoreBoard({ totalAttempt: 0, wrongAnswer: 0, correctAnswer: 0 });
    setNum1(0);
    setNum2(0);
    setOperator("+");
    alert("Quiz ended!");
    document.title = "Quick Calculate";
  };

  const handleSubmit = () => {
    if (!isRunning) return;

    const correctAnswer = calculateAnswer();
    const newAttempt = scoreBoard.totalAttempt + 1;

    if (quickNum === correctAnswer) {
      setScoreBoard((prev) => ({
        ...prev,
        totalAttempt: newAttempt,
        correctAnswer: prev.correctAnswer + 1,
      }));
    } else {
      setScoreBoard((prev) => ({
        ...prev,
        totalAttempt: newAttempt,
        wrongAnswer: prev.wrongAnswer + 1,
      }));
    }

    setQuickNum(0);
    generateNewQuestion();
  };

  const handleClear = () => {
    setQuickNum(0);
  };

  return (
    <div className="h-full w-full flex flex-col">
      <NavBar pageName="quickCalculatePage" />
      <div className="pb-10 flex flex-grow gap-10 items-center justify-center">
        <div className="h-[480px] w-[750px] p-3 border border-[#088395] rounded-2xl">
          <div className="h-[10%] w-full flex">
            <div className="h-10 w-10">
              <img src={clock} alt="clock" />
            </div>
            <div className="ml-2 text-5xl text-[#088395] baloo-bhai">
              00:{timeCount.toString().padStart(2, "0")}
            </div>
          </div>

          <div className="h-[30%] w-full bg-slate-200 rounded-t-2xl center baloo-bhai text-2xl md:text-6xl">
            <div className="h-full w-full center">
              <div>
                {num1} {operator} {num2} =
              </div>
              <div className="h-[85px] w-[136px] ml-3 bg-white border border-[#088395] center rounded-lg overflow-hidden">
                {quickNum}
              </div>
            </div>
          </div>

          <div className="h-[60%] w-full">
            <div className="h-1/3 flex justify-between">
              {[1, 2, 3, 4, 5].map((n) => (
                <Number key={n} number={n} />
              ))}
            </div>
            <div className="h-1/3 my-1 flex justify-between">
              {[6, 7, 8, 9, 0].map((n) => (
                <Number key={n} number={n} />
              ))}
            </div>
            <div className="h-1/3 flex">
              <div
                className="h-full w-1/2 mr-2 bg-[#088395] hover:bg-[#066574] hover:cursor-pointer text-[#071952] rounded-lg center text-2xl md:text-6xl baloo-bhai"
                onClick={handleClear}
              >
                Clear
              </div>
              <div
                className="h-full w-1/2 ml-2 bg-[#088395] hover:bg-[#066574] hover:cursor-pointer text-white rounded-lg center text-2xl md:text-6xl baloo-bhai"
                onClick={handleSubmit}
              >
                Submit
              </div>
            </div>
          </div>
        </div>

        <div className="h-[480px] w-[350px] flex flex-col justify-between items-center">
          <div className="text-2xl md:text-4xl baloo-bhai">Quick Calculate</div>
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

          {!isRunning ? (
            <div
              className="h-10 w-40 bg-[#088395] hover:bg-[#066574] hover:cursor-pointer text-white rounded-lg center text-2xl md:text-3xl baloo-bhai"
              onClick={startCountDown}
            >
              Start
            </div>
          ) : (
            <div
              className="h-10 w-40 bg-[#FF0000] hover:bg-[#b30000] hover:cursor-pointer text-white rounded-lg center text-2xl md:text-3xl baloo-bhai"
              onClick={endCountDown}
            >
              End
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default QuickCalculate;
