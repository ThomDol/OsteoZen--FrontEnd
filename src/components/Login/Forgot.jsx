import React from "react";
import { useState } from "react";
import "../../style/Login.css";
import logoMassage from "../../assets/logoMassage.png";
import userregular24 from "../../assets/userregular24.png";
import user24 from "../../assets/user24.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

const Forgot = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  
  
  const sendCode = async()=> {
    try {
      const response = await axios.post("http://localhost:5000/api/password/forgot", new URLSearchParams({
        email: email
      }), {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });
      if (response.status === 200) {
        Swal.fire("Un email vous a été envoyé");
        navigate("/login");
      }
    } catch (error) {
      Swal.fire("email invalide")
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
              <h5 className="mt-3 text-secondary">Mot de passe oublié</h5>
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
              <div>
                <button
                  type="button"
                  className="btn btn-info btn-lg text-white w-100"
                  onClick={sendCode}
                >
                  Recevoir un code
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Forgot;
