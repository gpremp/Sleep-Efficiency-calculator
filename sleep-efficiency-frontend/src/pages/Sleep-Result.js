import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { isUserLogin, currentUserDetail } from "../auth/loginAuth";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import baseUrl from "../baseUrl/baseUrl";
import Swal from "sweetalert2";
import Navbar from "../components/navbar/navbar";

let arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
function SleepResult() {
  const navigate = useNavigate();
  const [sleepData, setSleepData] = useState({});

  useEffect(() => {
    let isLogin = isUserLogin();
    if (!isLogin) {
      navigate("/");
    } else {
      let user = currentUserDetail();
      axios
        .get(`${baseUrl}/api/sleep-data/sleep/efficiency/users/${user._id}`, {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        })
        .then((res) => {
          if (res.data.message === "Token is not valid") {
            Swal.fire("Sorry!", "Please Login Again", "error");
            navigate("/");
          }
          else if(res.data.userSleepData==null){
            navigate("/sleep/questions");
          }else{
            Swal.fire("Success!", "Your Sleep Efficiency calculated successfully!", "success");
          }
          setSleepData(res.data.userSleepData);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);

  return (
    <>
      <Navbar />
      <div className="container">
        <p className="heading-txt">Unlock the Power of Efficient Sleep</p>
        <div className="row justify-content-center">
          <div className="col d-flex justify-content-center">
            <div className="card my-2">
              <div className="card-body">
                <div className="card my-3">
                  <span id="question-txt">
                    <h5 className="text-center">
                      You seem to have a sleep efficiency of{" "}
                      {sleepData.sleepEfficiency}%.
                    </h5>
                    {sleepData.sleepEfficiency < 80 ? (
                      <span>We'll get this up to 80%. </span>
                    ) : (
                      <span>That's Great. </span>
                    )}
                    A higher sleep efficiency score means a more refreshing and
                    energizing sleep,
                    <br /> which can help you move into your day with a sense of
                    lightness and ease.
                  </span>
                </div>
                Do you want to start again?
                <br />
                <Link
                  className="btn btn-outline-info btn-sm"
                  to={"/sleep/questions"}
                >
                  Start Again
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SleepResult;
