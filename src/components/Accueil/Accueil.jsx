import React, { useEffect } from 'react';
import Header from '../header/Header';
import axios from'axios';
import { useNavigate } from 'react-router-dom';


const Accueil = () => {
    const token = localStorage.getItem('token');
    const navigate =useNavigate();

    useEffect(()=>{
        loadUser();
    })

    const loadUser = async()=>{
        try{
           const response = await axios.get('http://localhost:5000/api/profile', {
            headers: {
              Authorization: 'Bearer ' + token 
              
            }
           })
           const data= await response.data;
           console.log(data);
           localStorage.setItem('idPraticien',data.idPraticien);
          
        }
        catch(error){
            console.error(error);
            localStorage.clear();
            navigate('/login');}

    }

    return (
        <div >
            <Header/>
        </div>
    );
};

export default Accueil;