import React from 'react';
import { useState,useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';



const ListPatient = () => {

const urlList= "http://localhost:5000/api/patient/all/1";
const [list,setList]=useState([]);
const navigate = useNavigate();


useEffect(() => {
  const fetchData = async () => {
    try {
      const response = await axios.get(urlList);
      setList(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  fetchData();
}, []);



const selectPatient=(id)=>{
  //localStorage.setItem('idPatientSelected',id);
  navigate('/patient/'+id);
}


    return (
    
             <div className='container '>
          <table class="table table-striped-columns">
  <thead>
    <tr>
      <th scope="col">Nom</th>
      <th scope="col">Prenom</th>
      <th scope="col">Date Naissance</th>
    </tr>
  </thead>
  <tbody>
 {list && list.map((patient)=>(
    <tr>
    <td onClick={()=>selectPatient(patient.idPatient)}>{patient.nomPatient}</td>
    <td>{patient.prenomPatient}</td>
    <td>{patient.dateNaissance}</td>
  </tr>
 ))}
  </tbody>
</table>  
        </div>
    
    );

}

       

export default ListPatient;
