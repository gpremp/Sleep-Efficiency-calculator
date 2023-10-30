import { useState, useRef } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import baseUrl from "../../baseUrl/baseUrl";

export default function Signup({ toggleLogin }) {
  function handleChange() {
    toggleLogin();
  }
  const formRef = useRef(null);
  const [user, setUser] = useState({});
  const [formErrors, setFormErrors] = useState({});
  const [isSignup, setSignup] = useState(false);
  let isSubmit = true;

  function isSentenceValid(sentence) {
    const words = sentence.split(" ");
    return words.some((word) => /\d/.test(word));
  }

  // Define an event handler for the input change
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUser((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  function handleSubmit(event) {
    event.preventDefault();
    console.log(user);
    isSubmit = true;
    setFormErrors(validate(user));
    if (isSubmit) {
      setSignup(true);
      axios
        .post(`${baseUrl}/api/users`, user)
        .then((res) => {
          setSignup(false);
          if (res.data.message == "User Name Already exits") {
            Swal.fire("Sorry!", res.data.message, "error");
          } else {
            Swal.fire("Success!", "Account created successfully!", "success");
            formRef.current.reset();
            handleChange();
          }
        })
        .catch((err) => {
          setSignup(false);
          console.log(err);
          Swal.fire("Sorry!", "Something Went Worng", "error");
        });
    }
  }

  const validate = (values) => {
    const errors = {};
    if (!values.name) {
      isSubmit = false;
      errors.name = "Name is required!";
    }
    if (isSentenceValid(values.name)) {
      isSubmit = false;
      errors.name = "*Number not allowed";
    }
    return errors;
  };
  const buttonStyle = {
    cursor: "pointer",
    textDecoration: "underline",
    color: "blue",
  };
  return (
    <div>
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title text-center">Sign Up</h5>
                <form ref={formRef} onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="name" className="form-label">
                      Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      name="name"
                      placeholder="Enter your name"
                      onChange={handleInputChange}
                      required
                    />
                    <h6 style={{ color: "red" }}>{formErrors.name}</h6>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">
                      User Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      name="userName"
                      placeholder="Enter your User Name"
                      onChange={handleInputChange}
                      required
                    />
                    <h6 style={{ color: "red" }}>{formErrors.email}</h6>
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
                    <h6 style={{ color: "red" }}>{formErrors.password}</h6>
                  </div>
                  <button type="submit" className="btn btn-primary">
                    Signup
                  </button>
                </form>
                {isSignup ? (
                  <h4 style={{ color: "red" }}>Please wait...</h4>
                ) : (
                  <p></p>
                )}
                <p className="text-center">
                  Already have an Account{" "}
                  <span style={buttonStyle} onClick={handleChange}>
                    Login
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
