import React, { useEffect } from "react";
import { useState } from "react";
import "../../style/Login.css";
import logoMassage from "../../assets/logoMassage.png";
import userregular24 from "../../assets/userregular24.png";
import user24 from "../../assets/user24.png";
import lock from "../../assets/lock.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.clear();
  }, []);

  const connect = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/login",
        {
          email: email,
          password: password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
         
        }
      );
      const data = response.data;
      console.log(data);
      localStorage.setItem("token", data.accessToken);
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="row vh-100 g-0">
      <div className="col-lg-6 position-relative d-none d-lg-block">
        <div className="bg-holder"></div>
      </div>
      <div className="col-lg-6">
        <div className="row align-items-center justify-content-center h-100 g-0 px-4 px-sm-0">
          <div className="col col-sm-6 col-lg-7 col-xl-6">
            <a href="#" className="d-flex justify-content-center">
              <img src={logoMassage} alt="Logo" style={{ width: "150px" }} />
            </a>

            <div className="text-center mt-5 mb-4">
              <img src={user24} alt="user" />
              <h5 className="mt-3 text-secondary">Acceder à votre compte</h5>
            </div>
            <form action="#">
              <div className="input-group mt-4 mb-3">
                <span className="input-group-text">
                  <img src={userregular24} alt="user" />
                </span>
                <input
                  type="text"
                  className="form-control form-control-lg fs-6"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text">
                  <img src={lock} alt="lock" />
                </span>
                <input
                  type="password"
                  className="form-control form-control-lg fs-6"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
              </div>
              <div className="input-group mb-3 d-flex justify-content-between">
                <div>
                  <small>
                    <a href="#">Forgot Password?</a>
                  </small>
                </div>
              </div>
              <div>
                <button
                  type="button"
                  className="btn btn-info btn-lg text-white w-100"
                  onClick={connect}
                >
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
