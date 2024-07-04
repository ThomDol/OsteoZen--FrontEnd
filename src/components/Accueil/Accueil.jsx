import React, { useEffect ,useState} from 'react';
import NavBar from '../header/NavBar';
import axios from'axios';
import { useNavigate } from 'react-router-dom';
import logoMassage from '../../assets/logoMassage.png';
import { Link } from 'react-router-dom';


const Accueil = () => {
    const token = localStorage.getItem('token');
    const navigate =useNavigate();
    const [user,setUser]=useState();

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
           setUser(data);
                   }
        catch(error){
            console.error(error);
            localStorage.clear();
            navigate('/login');}

    }

    return (
      <div>
        <div>
        {user && user.isActive && <NavBar role={user.nomRole} />}
        </div>

        <div className="col-5 mx-auto">
          <br />
          <br />
          <br />
          {user && !user.isActive && <span>Votre compte est temporairement bloqué. Contacter l'adminitrateur</span>}
          <br />
          <br />
          <br />
          <br />
          <img
            src={logoMassage}
            alt=""
            style={{ width: "90%", height: "90%" }}
          />
          {user && (
            <h1 style={{ textAlign: "center" }}>
              {user.prenomAppUser} {user.nomAppUser}
            </h1>
          )}
        </div>
      </div>
    );
};

export default Accueil;