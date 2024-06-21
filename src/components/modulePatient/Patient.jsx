import React, { useEffect } from "react";
import Header from "../header/Header";
import { useStorage } from "../StorageContext";
import AntecedentAccueil from "./sousmodulePatient/Antecedent menu/AntecedentAccueil";
import Accouchement from "./sousmodulePatient/Accouchement";
import Grossesse from "./sousmodulePatient/Grossesse";
import Consultation from "./sousmodulePatient/Consutation";
import "../../style/Patient.css";
import PatientUpdateForm from "./sousmodulePatient/PatientUpdateForm";


const Patient = () => {

  
  const {
    patient,
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


  
 

  

  return (
    <div>
      <div className="header col-4 mx-auto">
        <Header />
      </div>

      <br />
      <br />
      <div className="row ">
        <div
          className="col-2 lateral "
          style={{ backgroundColor: "rgba(225, 173, 1,0.7)", height: "100vh" }}
        >
          <br />
          <br />
          <br />
          <ul className="flex-column ">
            <div
              className=" pb-5"
              style={{ fontWeight: "bold" }}
            >
              {" "}
              <span>
                &#128100; {patient.prenomPatient} {patient.nomPatient}{" "}
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
        <div
          className="col-9 patient-content"
          style={{ backgroundColor: "rgba(255,255,255,0.7)" }}
        >
          <div className="patient-content col-8 mx-auto">
            {displayProfil && (
              <PatientUpdateForm
                
              />
            )}
            {displayAntecedent && <AntecedentAccueil idPatient={patient.idPatient}  />}
            {displayAccouchement && <Accouchement />}
            {displayGrossesse && <Grossesse />}
            {displayConsultation && <Consultation />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Patient;
