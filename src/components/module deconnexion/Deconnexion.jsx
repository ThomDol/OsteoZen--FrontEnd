import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const Deconnexion = () => {
const navigate = useNavigate();

    useEffect(()=>{
        localStorage.clear();
        navigate('/login');
    },[]);

    return (
        <div>
            
        </div>
    );
};

export default Deconnexion;