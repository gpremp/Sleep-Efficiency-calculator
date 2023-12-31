import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { isUserLogin, currentUserDetail } from "../auth/loginAuth";
import axios from "axios";
import Swal from "sweetalert2";
import baseUrl from "../baseUrl/baseUrl";
import Navbar from "../components/navbar/navbar";
import { LogOut } from "../auth/loginAuth";

let hourArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
function SleepDuration() {
  const location = useLocation();
  const navigate = useNavigate();
  const prevSleppData = location.state?.sleepdata || null;

  const [sleepData, setSleepData] = useState(prevSleppData);
  const [selectedduration, setSelectedDuration] = useState(hourArray[0]);
  const [isSubmitSleepData, setisSubmitSleepData] = useState(false);
  const [error, setError] = useState(true);

  const submitSleepData = () => {
    if (!error) {
      setisSubmitSleepData(true);
      let user = currentUserDetail();
      axios
        .post(`${baseUrl}/api/sleep-data`, sleepData, {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        })
        .then((res) => {
          setisSubmitSleepData(false);
          if (res.data.message === "Token is not valid") {
            Swal.fire("Sorry!", "Please Login Again", "error");
            LogOut();
            navigate("/");
          }
          navigate("/sleep/result");
        })
        .catch((err) => {
          setisSubmitSleepData(false);
          console.log(err);
          Swal.fire("Sorry!", "Something Went Worng", "error");
        });
    }
  };

  const onSelectTime = (value) => {
    setError(false);
    setSelectedDuration(value);
    setSleepData((prevData) => ({ ...prevData, SleepDuration: value }));
  };
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
                <div className="card my-3">
                  <span id="question-txt">
                    Ok. How many hours sleep do you get in a typical night?
                  </span>
                </div>
                <select
                  className="form-select my-3"
                  onChange={(e) => onSelectTime(e.target.value)}
                  value={selectedduration}
                >
                  {hourArray.map((hour) => (
                    <option key={hour} value={hour}>
                      {hour} hours
                    </option>
                  ))}
                </select>
                {error ? (
                  <h6 style={{ color: "red" }}>Please select sleep duration</h6>
                ) : (
                  <></>
                )}
                <input
                  type="button"
                  value="Next"
                  className="btn btn-info"
                  onClick={submitSleepData}
                />
                {isSubmitSleepData ? (
                  <h4 style={{ color: "red" }}>Please wait...</h4>
                ) : (
                  <p></p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SleepDuration;
