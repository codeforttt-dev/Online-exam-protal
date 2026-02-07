import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  nextQuestion,
  prevQuestion,
  setQuestion,
  selectAnswer,
  toggleFlag,
  decreaseTimer
} from "../redux/slices/questionSlice";

import { FaArrowLeft, FaArrowRight, FaFlag, FaPaperPlane, FaClock } from "react-icons/fa";

const questionsData = [
  "What is the capital of France?",
  "Which planet is known as the Red Planet?",
  "What is the chemical symbol for water?",
  "Who developed the theory of relativity?",
  "What is the largest ocean on Earth?"
];

function Question() {
  const dispatch = useDispatch();
  const { currentQuestion, answers, flaggedQuestions, timeRemaining } =
    useSelector((state) => state.question);

  useEffect(() => {
    const timer = setInterval(() => {
      dispatch(decreaseTimer());
    }, 1000);

    return () => clearInterval(timer);
  }, [dispatch]);

  const hours = Math.floor(timeRemaining / 3600);
  const minutes = Math.floor((timeRemaining % 3600) / 60);
  const seconds = timeRemaining % 60;

  const progress = (currentQuestion / questionsData.length) * 100;

  return (
    <div className="min-h-screen bg-yellow-200 flex justify-center items-center p-6">
      <div className="w-full max-w-6xl bg-white rounded-xl shadow-xl overflow-hidden">

        {/* Header */}
        <div className="bg-yellow-400 p-6 flex justify-between items-center">
          <h1 className="text-2xl font-bold">
            National Science Olympiad 2026
          </h1>
          <div className="bg-white px-4 py-2 rounded-full font-bold">
            Test in Progress
          </div>
        </div>

        <div className="flex">

          {/* Left Panel */}
          <div className="w-1/3 p-6 border-r">

            <div className="mb-4">
              <span>{Math.round(progress)}%</span>
              <div className="w-full bg-yellow-200 h-2 rounded mt-1">
                <div
                  className="bg-yellow-500 h-2 rounded"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>

            <div className="grid grid-cols-5 gap-2">
              {questionsData.map((_, index) => (
                <div
                  key={index}
                  onClick={() => dispatch(setQuestion(index + 1))}
                  className={`p-2 text-center rounded cursor-pointer font-bold 
                  ${currentQuestion === index + 1 ? "bg-yellow-500 text-white" : "bg-yellow-200"}
                  ${flaggedQuestions.includes(index + 1) ? "border-2 border-red-500" : ""}`}
                >
                  {index + 1}
                </div>
              ))}
            </div>

          </div>

          {/* Right Panel */}
          <div className="w-2/3 p-6">

            <h2 className="text-xl font-bold mb-4">
              Question {currentQuestion}
            </h2>

            <p className="mb-4">
              {questionsData[currentQuestion - 1]}
            </p>

            <div className="space-y-3">
              {["Option A", "Option B", "Option C", "Option D"].map((opt, i) => (
                <div
                  key={i}
                  onClick={() =>
                    dispatch(
                      selectAnswer({
                        questionNumber: currentQuestion,
                        optionIndex: i
                      })
                    )
                  }
                  className={`p-3 border rounded cursor-pointer 
                  ${answers[currentQuestion] === i ? "bg-yellow-300" : "bg-yellow-100"}`}
                >
                  {opt}
                </div>
              ))}
            </div>

            <div className="flex justify-between mt-6 flex-wrap gap-3">
              <button onClick={() => dispatch(prevQuestion())}
                className="bg-yellow-400 px-4 py-2 rounded">
                <FaArrowLeft className="inline mr-2" /> Previous
              </button>

              <button
                onClick={() => dispatch(toggleFlag(currentQuestion))}
                className={`px-4 py-2 rounded 
                ${flaggedQuestions.includes(currentQuestion)
                    ? "bg-orange-500 text-white"
                    : "bg-yellow-300"}`}
              >
                <FaFlag className="inline mr-2" />
                {flaggedQuestions.includes(currentQuestion)
                  ? "Remove Flag"
                  : "Flag"}
              </button>

              <button className="bg-green-500 text-white px-4 py-2 rounded">
                <FaPaperPlane className="inline mr-2" /> Submit
              </button>

              <button onClick={() => dispatch(nextQuestion())}
                className="bg-yellow-500 text-white px-4 py-2 rounded">
                Next <FaArrowRight className="inline ml-2" />
              </button>
            </div>

            <div className="mt-6 bg-black text-white p-3 flex justify-between items-center">
              <div className="bg-orange-500 px-4 py-2 rounded-full font-bold">
                <FaClock className="inline mr-2" />
                {String(hours).padStart(2, "0")}:
                {String(minutes).padStart(2, "0")}:
                {String(seconds).padStart(2, "0")}
              </div>
              <button className="bg-green-600 px-4 py-2 rounded">
                Submit Test
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

export default Question;
