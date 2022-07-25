/* eslint-disable no-unused-vars */
import React, { useRef } from "react";
import "./login.css";
import { loginCall } from "../../apiCalls";
import { useContext } from "react";
import { AuthContext } from "../../components/context/AuthContext";
import CircularProgress from "@mui/material/CircularProgress";
import { Link } from "react-router-dom";

export default function Login() {
  const email = useRef();
  const password = useRef();
  const { user, isFetching, dispatch } = useContext(AuthContext);

  const handleClick = (e) => {
    e.preventDefault();
    loginCall(
      { email: email.current.value, password: password.current.value },
      dispatch
    );
    console.log("login", user);
  };
  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
        </div>
        <div className="loginRight">
          <form className="loginBox" onSubmit={handleClick}>
            <input
              placeholder="Email"
              type="email"
              className="loginInput"
              required
              ref={email}
            />
            <input
              placeholder="Password"
              type="password"
              className="loginInput"
              minLength="6"
              required
              ref={password}
            />
            <button className="loginButton" disabled={isFetching}>
              {isFetching ? (
                <CircularProgress color="inherit" size="20px" />
              ) : (
                "Log In"
              )}
            </button>
            <span className="loginforgot">Forgot password ?</span>
            <Link to="/register">

              <button className="loginregisterButton">
                {isFetching ? (
                  <CircularProgress color="inherit" size="20px" />
                ) : (
                  "Create New Account"
                )}
              </button>
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}
