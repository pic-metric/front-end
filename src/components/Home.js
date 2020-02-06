import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { axiosWithAuth } from "../utils/axiosWithAuth";

const Home = () => {
  const apiUrl = "https://bw-pic-metric.herokuapp.com/api";
  const routerHistory = useHistory();
  const [message, setMessage] = useState("");
  
  const registerUser = () => {
    axios
      .post(apiUrl + "/auth/register", {
        full_name: "Asher Kobin",
        email: "asherkobin@gmail.com",
        password: "asher"
      })
      .then(res => setMessage("registerUser OK"))
      .catch(err => {
        setMessage(err.response.data.error.message);
      })
  };

  const loginUser = () => {
    axios
      .post(apiUrl + "/auth/login", {
        email: "asherkobin@gmail.com",
        password: "asher"
      })
      .then(res => {
        setMessage("loginUser OK")
        localStorage.setItem("USER_TOKEN", res.data.token);
      })
      .catch(err => {
        setMessage(err.response.data.error.message);
       });
  }

  const loginUserBadPwd = () => {
    axios
      .post(apiUrl + "/auth/login", {
        email: "asherkobin@gmail.com",
        password: "wrongPwd"
      })
      .then(res => {
        throw new Error("password was bad!!!")
      })
      .catch(err => { 
        setMessage(err.response.data.error.message);
      });
  }

  const loginUserBadUser = () => {
    axios
      .post(apiUrl + "/auth/login", {
        email: "noOneHere@foo.com",
        password: "wrongPwd"
      })
      .then(res => {
        throw new Error("user was bad!!!")
      })
      .catch(err => { 
        setMessage(err.response.data.error.message);
      });
  }

  const getUsers = () => {
    axiosWithAuth().get("/users").then(res => console.log(res.data));
  }

  const getPic = () => {
    axiosWithAuth().get("/pics/3").then(res => console.log(res.data));
  }

  const deleteToken = () => {
    localStorage.removeItem("USER_TOKEN");
    localStorage.removeItem("USER_ID");
    setMessage("Token Deleted");
  }

  const goToPrivateUrl = () => {
    routerHistory.push("/picmetric");
  }

  const tokenStatus = () => {
    setMessage(localStorage.getItem("USER_TOKEN") || localStorage.getItem("USER_ID") ? "Token Exists" : "No Token");
  }

  return (
    <div>
      <style>
        {
         `button {
            font-size: 30px;
            display: block;
            margin: 5px;
          }`
        }
      </style>
      <button onClick={registerUser}>Test Register User</button>
      <button onClick={loginUser}>Test Login User</button>
      <button onClick={getUsers}>Test Get Users</button>
      <button onClick={getPic}>Test Get Pic</button>
      <button onClick={loginUserBadPwd}>Test Login User - Wrong Password</button>
      <button onClick={loginUserBadUser}>Test Login User - User Doesn't Exist</button>
      <button onClick={tokenStatus}>Token Status</button>
      <button onClick={deleteToken}>Delete Token</button>
      <button onClick={goToPrivateUrl}>Go To Private URL</button>
      <div>{message}</div>
    </div>
  );
}

export default Home;