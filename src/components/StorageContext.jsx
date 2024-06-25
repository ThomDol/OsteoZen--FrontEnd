import React, { createContext, useContext, useState } from 'react';

const StorageContext = createContext();

export const useStorage = ()=> useContext(StorageContext);

export const StorageProvider =({children})=>{
const [idPraticien,setIdPraticien]=useState();
const [patient,setPatient]=useState();
const [idPatient,setIdPatient]=useState();
const [displayProfil,setDisplayProfil]=useState(false);
const [displayAntecedent,setDisplayAntecedent]=useState(false);
const [displayAccouchement,setDisplayAccouchement]=useState(false);
const [displayGrossesse,setDisplayGrossesse]=useState(false);
const [displayConsultation,setDisplayConsultation]=useState(false);
const[displayAccouchementDetail,setDisplayAccouchementDetail]=useState(false);
const [displayAccouchementNew,setDisplayAccouchementNew]=useState(false);



return(
    <StorageContext.Provider value={{
        idPraticien,setIdPraticien,
        patient,setPatient,
        idPatient,setIdPatient,
        displayProfil,setDisplayProfil,
        displayAccouchement,setDisplayAccouchement,
        displayGrossesse,setDisplayGrossesse,
        displayConsultation,setDisplayConsultation,
        displayAntecedent,setDisplayAntecedent,
        displayAccouchementDetail,setDisplayAccouchementDetail,
        displayAccouchementNew,setDisplayAccouchementNew


    }}>{children}</StorageContext.Provider>
);
};
