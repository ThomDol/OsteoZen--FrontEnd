import React from 'react';
import { useState,useEffect } from 'react';
import { useStorage } from '../StorageContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Header from '../header/Header';



const ListPatient = () => {

const urlList= "http://localhost:5000/api/patient/all/1";
const [list,setList]=useState([]);
const navigate = useNavigate();

const {setPatient}=useStorage();


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



const selectPatient=(elem)=>{
  setPatient(elem);

  navigate('/patient');
}


    return (
    
             <div className='container '>
              <div className='col-4 mx-auto'><Header/></div>
              
                <br /><br /><br />
                <div className='col-8 mx-auto'>
          <table className="table table-striped-columns">
  <thead>
    <tr>
      <th scope="col">Nom</th>
      <th scope="col">Prenom</th>
      <th scope="col">Date Naissance</th>
    </tr>
  </thead>
  <tbody>
 {list && list.map((patient,index)=>(
    <tr key={index}>
    <td onClick={()=>selectPatient(patient)}>{patient.nomPatient}</td>
    <td>{patient.prenomPatient}</td>
    <td>{patient.dateNaissance}</td>
  </tr>
 ))}
  </tbody>
</table>  
</div>
        </div>
    
    );

}

       

export default ListPatient;
