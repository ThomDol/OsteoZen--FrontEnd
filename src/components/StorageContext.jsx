import React, { createContext, useContext, useState } from "react";

const StorageContext = createContext();

export const useStorage = () => useContext(StorageContext);

export const StorageProvider = ({ children }) => {
  const [idPraticien, setIdPraticien] = useState();
  const [patient, setPatient] = useState();
  const [idPatient, setIdPatient] = useState();
  const [displayProfil, setDisplayProfil] = useState(false);
  const [displayAntecedent, setDisplayAntecedent] = useState(false);
  const [displayAccouchement, setDisplayAccouchement] = useState(false);
  const [displayGrossesse, setDisplayGrossesse] = useState(false);
  const [displayGrossesseNew, setDisplayGrossesseNew] = useState(false);
  const [displayGrossesseDetail, setDisplayGrossesseDetail] = useState(false);
  const [displayCaracteristiquesPhysiques,setDisplayCaracteristiquesPhysiques]=useState(false);
  const [displayCaracteristiquesPhysiquesDetail,setDisplayCaracteristiquesPhysiquesDetail]=useState(false);
  const [displayConsultation, setDisplayConsultation] = useState(false);
  const [displayAccouchementDetail, setDisplayAccouchementDetail] =
    useState(false);
  const [displayAccouchementNew, setDisplayAccouchementNew] = useState(false);
  const [displayAntecedentBebe, setDisplayAntecedentBebe] = useState(false);
  const [displayPostPartum,setDisplayPostPartum]=useState(false);
  const [displayRendezVousDetail,
    setDisplayRendezVousDetail]=useState(false);

  return (
    <StorageContext.Provider
      value={{
        idPraticien,
        setIdPraticien,
        patient,
        setPatient,
        idPatient,
        setIdPatient,
        displayProfil,
        setDisplayProfil,
        displayAccouchement,
        setDisplayAccouchement,
        displayGrossesse,
        setDisplayGrossesse,
        displayConsultation,
        setDisplayConsultation,
        displayAntecedent,
        setDisplayAntecedent,
        displayAccouchementDetail,
        setDisplayAccouchementDetail,
        displayAccouchementNew,
        setDisplayAccouchementNew,
        displayAntecedentBebe,
        setDisplayAntecedentBebe,
        displayGrossesseNew,
        setDisplayGrossesseNew,
        displayGrossesseDetail,
        setDisplayGrossesseDetail,
        displayCaracteristiquesPhysiques,
        setDisplayCaracteristiquesPhysiques,
        displayCaracteristiquesPhysiquesDetail,
        setDisplayCaracteristiquesPhysiquesDetail,
        displayPostPartum,
        setDisplayPostPartum,
        displayRendezVousDetail,
        setDisplayRendezVousDetail,
      }}
    >
      {children}
    </StorageContext.Provider>
  );
};
