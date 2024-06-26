import React, { useEffect, useState } from "react";
import Header from "../header/Header";
import { jwtDecode } from "jwt-decode";
import CryptoJS from "crypto-js";
import { useStorage } from "../StorageContext";
import { useNavigate } from "react-router-dom";
import AntecedentAccueil from "./sousmodulePatient/Antecedent menu/AntecedentAccueil";
import Accouchement from "./sousmodulePatient/Accouchement/Accouchement";
import Grossesse from "./sousmodulePatient/Grossesse";
import Consultation from "./sousmodulePatient/Consutation";
import "../../style/Patient.css";
import PatientUpdateForm from "./sousmodulePatient/PatientUpdateForm";
import { useParams } from "react-router-dom";
import axios from "axios";

const SECRET_KEY = "q#4puta9!am4$fcl";
const INIT_VECTOR = "1zp6@y#ect4?5krx";

const decryptToken = (encryptedToken) => {
  const key = CryptoJS.enc.Utf8.parse(SECRET_KEY);
  const iv = CryptoJS.enc.Utf8.parse(INIT_VECTOR);

  const decrypted = CryptoJS.AES.decrypt(encryptedToken, key, {
    iv: iv,
    padding: CryptoJS.pad.Pkcs7,
    mode: CryptoJS.mode.CBC,
  });

  return decrypted.toString(CryptoJS.enc.Utf8);
};

const Patient = () => {
  const { id } = useParams();
  const [patient, setPatient] = useState();
  const [idPraticien, setIdPraticien] = useState(null);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const {
    displayProfil,
    setDisplayProfil,
    displayAntecedent,
    setDisplayAntecedent,
    displayAccouchement,
    setDisplayAccouchement,
    displayGrossesse,
    setDisplayGrossesse,
    displayConsultation,
    setDisplayConsultation,
  } = useStorage();

  const resetDisplay = () => {
    setDisplayProfil(false);
    setDisplayAntecedent(false);
    setDisplayAccouchement(false);
    setDisplayGrossesse(false);
    setDisplayConsultation(false);
  };

  useEffect(() => {
    try {
      const decryptedToken = decryptToken(token);
      const decodedToken = jwtDecode(decryptedToken);
      setIdPraticien(decodedToken.id);
    } catch (error) {
      console.error("Erreur de décryptage ou de décodage du token:", error);
    }
  }, []);

  useEffect(() => {
    if (idPraticien) {
      const fetchPatient = async () => {
        try {
          const response = await axios.get(
            `http://localhost:5000/api/patient/${idPraticien}/${parseInt(id)}`,
            {
              headers: {
                Authorization: "Bearer " + token,
              },
            }
          );

          const data = response.data;
          setPatient(data);
        } catch (error) {
          console.error(error);
          navigate("/error");
        }
      };

      fetchPatient();
    }
  }, [idPraticien]);

  return (
    <div>
      {patient && (
        <div>
          <div className="header col-4 mx-auto">
            <Header />
          </div>

          <br />
          <br />
          <div className="row ">
            <div
              className="col-2 lateral "
              style={{
                backgroundColor: "rgba(200,152,3,0.7)",
                height: "100vh",
              }}
            >
              <br />
              <br />
              <br />
              <ul className="flex-column ">
                <div className=" pb-5" style={{ fontWeight: "bold" }}>
                  <span>
                    &#128100; {patient.prenomPatient} {patient.nomPatient}
                  </span>
                </div>
                <div
                  className="pt-5"
                  onClick={() => {
                    resetDisplay();
                    setDisplayProfil(true);
                  }}
                >
                  &#11162; Profil
                </div>
                <div
                  className="pt-5"
                  onClick={() => {
                    resetDisplay();
                    setDisplayAntecedent(true);
                  }}
                >
                  &#11162; Antecedent
                </div>
                <div
                  className="pt-5"
                  onClick={() => {
                    resetDisplay();
                    setDisplayAccouchement(true);
                  }}
                >
                  &#11162; Accouchement
                </div>
                <div
                  className="pt-5"
                  onClick={() => {
                    resetDisplay();
                    setDisplayGrossesse(true);
                  }}
                >
                  &#11162; Grossesse
                </div>
                <div
                  className="pt-5"
                  onClick={() => {
                    resetDisplay();
                    setDisplayConsultation(true);
                  }}
                >
                  &#11162; Consultation
                </div>
              </ul>
            </div>
            <div className="patient-content-wrapper">
              <div className="patient-content col-8 mx-auto">
                {displayProfil && (
                  <PatientUpdateForm idPatient={patient.idPatient} />
                )}
                {displayAntecedent && (
                  <AntecedentAccueil idPatient={patient.idPatient} />
                )}
                {displayAccouchement && (
                  <Accouchement idPatient={patient.idPatient} />
                )}
                {displayGrossesse && (
                  <Grossesse idPatient={patient.idPatient} />
                )}
                {displayConsultation && (
                  <Consultation idPatient={patient.idPatient} />
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Patient;
