import React, { useState, useEffect } from "react";
import SleepData from "../models/sleep.model";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/navbar/navbar";
import { isUserLogin, currentUserDetail } from "../auth/loginAuth";

const SleepQues = [
  {
    question:
      "Lets say in a few weeks, you're sleeping well. what would change?",
    options: [
      "I would go to sleep easily",
      "I would sleep through the night",
      "I'd wake up on time, refreshed",
    ],
  },
  {
    question:
      "That's a great goal. How long have you been struggling with your sleep?",
    options: ["Less than 2 weeks", "2 to 8 weeks", "More than 8 weeks"],
  },
];

function SleepQuestions() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [clickedOption, setClickedOption] = useState(10);
  const [sleepData, setSleepData] = useState(new SleepData());
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const changeQuestion = () => {
    if (sleepData.sleepGoal === "") {
      setError(true);
    } else if (currentQuestion < SleepQues.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setClickedOption(10);
    } else {
      if (sleepData.SleepStruggleDuration === "") {
        setError(true);
      } else {
        navigate("/sleep/time", { state: { sleepdata: sleepData } });
      }
    }
  };
  const handleChange = (e) => {
    setError(false);
    if (currentQuestion === 0) {
      setSleepData((prevData) => ({ ...prevData, sleepGoal: e.target.value }));
    } else if (currentQuestion === 1) {
      setSleepData((prevData) => ({
        ...prevData,
        SleepStruggleDuration: e.target.value,
      }));
    }
  };
  useEffect(() => {
    let isLogin = isUserLogin();
    if (!isLogin) {
      navigate("/");
    } else {
      let user = currentUserDetail();
      setSleepData((prevData) => ({ ...prevData, userId: user._id }));
    }
  }, []);
  return (
    <>
      <Navbar />
      <div className="container">
        <p className="heading-txt">Some Questions related to your Sleep</p>
        <div className="row justify-content-center">
          <div className="col d-flex justify-content-center">
            <div className="card">
              <div className="card-body">
                <div className="card">
                  <span id="question-txt">
                    {SleepQues[currentQuestion].question}
                  </span>
                </div>
                <div className="option-container">
                  {SleepQues[currentQuestion].options.map((option, i) => {
                    return (
                      <button
                        value={option}
                        className={`option-btn ${
                          clickedOption === i ? "checked" : null
                        }`}
                        key={i}
                        onClick={(e) => {
                          handleChange(e);
                          setClickedOption(i);
                        }}
                      >
                        {option}
                      </button>
                    );
                  })}
                </div>
                {error ? (
                  <h6 style={{ color: "red" }}>Please select any option</h6>
                ) : (
                  <></>
                )}
                <input
                  type="button"
                  value="Next"
                  className="btn btn-info"
                  onClick={changeQuestion}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SleepQuestions;
