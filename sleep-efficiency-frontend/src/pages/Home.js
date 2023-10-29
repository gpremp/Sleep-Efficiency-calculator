import React, { useState } from "react";
import Navbar from "../components/navbar/navbar";
import Login from "../components/login/login.component";
import Signup from "../components/signup/signup.component";
export default function Home() {
    // let bool1 = true
    let [showLogin,setLogin] = useState(true);
    function handleShowLogin(){
      setLogin(!showLogin);
    }
    return (
      <div>
        <Navbar/>
        {showLogin?<Login toggleLogin = {handleShowLogin}/> : <Signup toggleLogin = {handleShowLogin}/>}
      </div>
    )
  }