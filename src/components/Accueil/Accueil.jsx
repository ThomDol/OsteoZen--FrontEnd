import React, { useEffect ,useState} from 'react';
import NavBar from '../header/NavBar';
import axios from'axios';
import { useNavigate } from 'react-router-dom';
import logoMassage from '../../assets/logoMassage.png';


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
           
            <div className='col-5 mx-auto'>
            <br /><br /><br /><br /><br /><br /><br />
                <img src={logoMassage} alt="" style={{width:"90%",height:"90%"}}/>
                {praticien && <h1 style={{textAlign:'center'}}>{praticien.prenomPraticienConnecte} {praticien.nomPraticienConnecte}</h1>}
            </div>
            </div>
           

        
    );
};

export default Accueil;