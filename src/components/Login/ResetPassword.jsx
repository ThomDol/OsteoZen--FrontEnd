import React from "react";
import { useState } from "react";
import "../../style/Login.css";
import logoMassage from "../../assets/logoMassage.png";
import user24 from "../../assets/user24.png";
import lock from "../../assets/lock.png";
import { useNavigate,useLocation } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  
  // Extract token from query parameters
  const token = new URLSearchParams(location.search).get('token');


  const validateNewPassword = async () => {
    try {
        const response = await axios.post(
          "http://localhost:5000/api/password/reset",
          new URLSearchParams({
            token: token,
            password: password,
          }),
          {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
          }
        );
        console.log(response.data);
        Swal.fire("Mot de passe réinitialisé")
        navigate("/login");
      } catch (error) {
        Swal.fire("Code incorrect ou expiré")
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
              <h5 className="mt-3 text-secondary">Reinitialiser votre mot de passe</h5>
            </div>
            <form >
              <div className="input-group mb-3">
                <span className="input-group-text">
                  <img src={lock} alt="lock" />
                </span>
                <input
                  type="password"
                  className="form-control form-control-lg fs-6"
                  placeholder="Nouveau mot de passe"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
           
                <button
                  type="button"
                  className="btn btn-info btn-lg text-white w-100"
                  onClick={validateNewPassword}
                >
                  Envoyer
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
