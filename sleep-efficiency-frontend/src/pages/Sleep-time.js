import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { isUserLogin } from "../auth/loginAuth";
import Navbar from "../components/navbar/navbar";

const SleepQues = [
  {
    question: "What time do you go to bed for sleep?",
  },
  {
    question: "What time do you get out of bed to start your day?",
  },
];
function SleepTime() {
  const location = useLocation();
  const prevSleppData = location.state?.sleepdata || null;
  const navigate = useNavigate();

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [sleepData, setSleepData] = useState(prevSleppData);
  const [selectedTime, setSelectedTime] = useState("");
  const [error, setError] = useState(false);

  const changeQuestion = () => {
    if (sleepData.bedTime === "") {
      setError(true);
    } else if (currentQuestion < SleepQues.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedTime("");
    } else {
      if (sleepData.wakeTime === "") {
        setError(true);
      } else {
        navigate("/sleep/duration", { state: { sleepdata: sleepData } });
      }
    }
  };
  function onTimeChange(e) {
    setError(false);
    setSelectedTime(e.target.value);
    if (currentQuestion === 0) {
      setSleepData((prevData) => ({ ...prevData, bedTime: e.target.value }));
    } else if (currentQuestion === 1) {
      setSleepData((prevData) => ({ ...prevData, wakeTime: e.target.value }));
    }
  }
  useEffect(() => {
    let isLogin = isUserLogin();
    if (!isLogin) {
      navigate("/");
    } else {
      if (prevSleppData == null) {
        navigate("/sleep/questions");
      }
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
                  <input
                    type="time"
                    id="timeInput"
                    name="timeInput"
                    value={selectedTime}
                    onChange={onTimeChange}
                    required
                  />
                </div>
                {error ? (
                  <h6 style={{ color: "red" }}>Please select time</h6>
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

export default SleepTime;
