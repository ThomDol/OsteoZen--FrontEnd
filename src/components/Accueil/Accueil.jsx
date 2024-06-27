import React, { useEffect ,useState} from 'react';
import Header from '../header/Header';
import NavBar from '../header/NavBar';
import axios from'axios';
import { useNavigate } from 'react-router-dom';


const Accueil = () => {
    const token = localStorage.getItem('token');
    const navigate =useNavigate();
    const [praticien,setPraticien]=useState();

    useEffect(()=>{
        loadUser();
    },[])

    const loadUser = async()=>{
        try{
           const response = await axios.get('http://localhost:5000/api/profile', {
            headers: {
              Authorization: 'Bearer ' + token 
              
            }
           })
           const data= await response.data;
           setPraticien(data);
           console.log(data);
           
          
        }
        catch(error){
            console.error(error);
            localStorage.clear();
            navigate('/login');}

    }

    return (
        <div >
            <div>
            <NavBar/>
            </div>
            <br /><br /><br />

           
        </div>
    );
};

export default Accueil;