import React, { useEffect, useState } from "react";
import NavBar from "../header/NavBar";
import { jwtDecode } from "jwt-decode";
import CryptoJS from "crypto-js";
import { useStorage } from "../StorageContext";
import { useNavigate, useParams } from "react-router-dom";
import AntecedentAccueil from "./sousmodulePatient/Antecedent menu/AntecedentAccueil";
import AntecedentBebeAccueil from "./sousmodulePatient/AntecedentBebe Menu/AntecedentBebeAccueil";
import Accouchement from "./sousmodulePatient/Accouchement/Accouchement";
import Grossesse from "./sousmodulePatient/Grossesse/Grossesse";
import Consultation from "./sousmodulePatient/Consutation";
import "../../style/Patient.css";
import PatientUpdateForm from "./sousmodulePatient/PatientUpdateForm";
import axios from "axios";
import Physique from "./sousmodulePatient/Caracteristques physiques/Physique";

// Clé secrète et vecteur d'initialisation pour le décryptage
const SECRET_KEY = "q#4puta9!am4$fcl";
const INIT_VECTOR = "1zp6@y#ect4?5krx";

// Fonction de décryptage du token
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
  const [user, setUser] = useState(null);
  const [role, setRole] = useState();
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  // Récupération des états et fonctions de mise à jour depuis le contexte de stockage
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
    displayAntecedentBebe,
    setDisplayAntecedentBebe,
    setDisplayAccouchementDetail,
    setDisplayAccouchementNew,
    displayCaracteristiquesPhysiques,
    setDisplayCaracteristiquesPhysiques,
  } = useStorage();

  // Fonction pour réinitialiser l'affichage des sections
  const resetDisplay = () => {
    setDisplayProfil(false);
    setDisplayAntecedent(false);
    setDisplayAccouchement(false);
    setDisplayGrossesse(false);
    setDisplayConsultation(false);
    setDisplayAntecedentBebe(false);
    setDisplayAccouchementDetail(false);
    setDisplayAccouchementNew(false);
    setDisplayCaracteristiquesPhysiques(false);
  };

  // Effet pour déchiffrer et décoder le token au chargement du composant
  useEffect(() => {
    try {
      const decryptedToken = decryptToken(token);
      const decodedToken = jwtDecode(decryptedToken);
      setUser(decodedToken.id);
      setRole(decodedToken.roles[0]);
    } catch (error) {
      console.error("Erreur de décryptage ou de décodage du token:", error);
    }
  }, []);

  // Effet pour charger les données du patient
  useEffect(() => {
    if (user) {
      const fetchPatient = async () => {
        try {
          const response = await axios.get(
            `http://localhost:5000/api/patient/${user}/${parseInt(id)}`,
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
          localStorage.clear();
          navigate("/login");
        }
      };

      fetchPatient();
    }
  }, [user]);

  return (
    <div>
      {patient && (
        <div>
          {role && (
            <div className="header col-4 mx-auto">
              <NavBar role={role} /> {/* Barre de navigation */}
            </div>
          )}

          <br />
          <br />
          <div className="row">
            <div
              className="col-2 lateral"
              style={{
                backgroundColor: "rgba(49, 210, 242, 0.7)",
                height: "100vh",
              }}
            >
              <br />
              <br />
              <br />
              {patient && (
                <ul className="flex-column">
                  <div className="pb-5" style={{ fontWeight: "bold" }}>
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
                      setDisplayCaracteristiquesPhysiques(true);
                    }}
                  >
                    &#11162; Caractéristiques <br />
                    physiques
                  </div>
                  {patient.nomTypePatient !== "Bebe" && (
                    <div
                      className="pt-5"
                      onClick={() => {
                        resetDisplay();
                        setDisplayAntecedent(true);
                      }}
                    >
                      &#11162; Antecedent
                    </div>
                  )}
                  {patient.nomTypePatient === "Bebe" && (
                    <div
                      className="pt-5"
                      onClick={() => {
                        resetDisplay();
                        setDisplayAntecedentBebe(true);
                      }}
                    >
                      &#11162; Antecedent Bébé
                    </div>
                  )}
                  {patient.nomGenre === "Femme" &&
                    patient.nomTypePatient === "Adulte" && (
                      <>
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
                      </>
                    )}
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
              )}
            </div>
            <div className="patient-content-wrapper">
              <div className="patient-content col-10 mx-auto">
                {displayProfil && (
                  <PatientUpdateForm idPatient={patient.idPatient} />
                )}
                {displayCaracteristiquesPhysiques && (
                  <Physique idPatient={patient.idPatient} />
                )}
                {displayAntecedent && (
                  <AntecedentAccueil idPatient={patient.idPatient} />
                )}
                {displayAntecedentBebe && (
                  <AntecedentBebeAccueil idPatient={patient.idPatient} />
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
