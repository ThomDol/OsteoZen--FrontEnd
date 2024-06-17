import React from 'react';
import { useEffect,useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';


const Patient = () => {
//const idPatient=localStorage.getItem('idPatientSelected');
const idPatient=useParams();
const [patientSelected,setPatientSelected]=useState();
const urldetailPatient = "http://localhost:5000/api/patient/"+idPatient;

useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(urldetailPatient);
        setPatientSelected(response.data);
      } catch (error) {
        console.error(error);
      }
    };
  
    fetchData();
  }, []);

    return (
        <div>
            {patientSelected && <h1>{patientSelected.nomPatient} {patientSelected.prenomPatient}</h1>}
          
        </div>
    );
};

export default Patient;