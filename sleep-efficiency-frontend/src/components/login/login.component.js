import { useState } from "react";
import axios from "axios";
import { doLogin } from "../../auth/loginAuth";
import baseUrl from "../../baseUrl/baseUrl";
import { useNavigate } from "react-router-dom";

export default function Login({ toggleLogin }) {
  const navigate = useNavigate();
  const [user, setUser] = useState({});
  const [isLoging, setIsLoging] = useState(false);

  const [formErrors, setFormErrors] = useState("");
  function handleChange() {
    toggleLogin();
  }
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUser((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setFormErrors("");
    setIsLoging(true);
    await axios
      .post(`${baseUrl}/api/users/auth`, user)
      .then((response) => {
        if (response.data.message === "Invalid User Name or Password") {
          setFormErrors("invalid email and password");
        } else if (response.data.message === "logged in successfully") {
          doLogin(response.data.user);
          navigate("/sleep/questions");
        }
        setIsLoging(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const buttonStyle = {
    cursor: "pointer",
    textDecoration: "underline",
    color: "blue",
  };
  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title text-center">Login</h5>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  User Name
                  <input
                    type="text"
                    className="form-control"
                    name="userName"
                    placeholder="Enter your user name"
                    onChange={handleInputChange}
                    required
                  />
                  <h6 style={{ color: "red" }}>{formErrors}</h6>
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                    Password
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    name="password"
                    placeholder="Enter your password"
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <button type="submit" className="btn btn-primary">
                  Login
                </button>
              </form>
              {isLoging ? (
                <h4 style={{ color: "red" }}>Please wait...</h4>
              ) : (
                <p></p>
              )}
              <p className="text-center">
                Don't have an account{" "}
                <span style={buttonStyle} onClick={handleChange}>
                  Sign Up
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
