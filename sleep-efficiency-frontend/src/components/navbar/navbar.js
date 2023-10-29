
import { deleteCookie,getCookie } from "cookies-next";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { LogOut } from "../../auth/loginAuth";

export default function Navbar() {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(false);
  useEffect(() => {
    let user = getCookie("user-sleep");
    if (user == null || user === "" || user === undefined || window.location.pathname ==='/') {
      setIsLogin(false);
    } else {
      setIsLogin(true);
    }
  }, [isLogin]);
  const logout = () => {
    LogOut();
    navigate("/");
  };
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <p className="navbar-brand">Sleep Efficiency Calculator</p>
          <div className="d-flex">
            {isLogin ? (
              <button
                onClick={() => logout()}
                className="btn btn-outline-success"
                type="button"
              >
                Logout
              </button>
            ) : (
              <p></p>
            )}
          </div>
        </div>
      </nav>
    </>
  );
}
