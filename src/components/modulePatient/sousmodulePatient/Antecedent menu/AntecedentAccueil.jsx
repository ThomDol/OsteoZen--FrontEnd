import React from 'react';
import Antecedent from './Antecedent';
import { useState,useEffect } from 'react';
import axios from 'axios';


const AntecedentAccueil = ({idPatient}) => {

    const [antecedentRes,setAntecedentRes]=useState();
    


    useEffect(()=>{
        const fetchAntecedent = async () => {
          try {
            const response = await axios.get(
              `http://localhost:5000/api/antecedent/${idPatient}`
            );
            const data = response.data;
            setAntecedentRes(data);
          } catch (error) {
              console.error(error);
            }
          };
      
          fetchAntecedent();
        }, []);

    return (
        <div>
            {antecedentRes ? <Antecedent/> : <div className='btn btn-primary'>Creer Antecedent</div>}
            
        </div>
    );
};

export default AntecedentAccueil;