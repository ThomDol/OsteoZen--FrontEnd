import axios from "axios";


const token = localStorage.getItem('token');
const REST_API_URL = 'http://localhost:5000/api/praticien';


export const  ListePraticien =()=>axios.get(REST_API_URL+'/all', {
    headers: {
      Authorization: 'Bearer ' + token 
      }});

export const createPraticien = (praticien) =>axios.post(REST_API_URL, praticien);

export const getPraticien =  (praticienId) =>axios.get(REST_API_URL +'/'+ praticienId);

export const updatePraticien =(praticienId ,praticien) => axios.put(REST_API_URL+'/' +praticienId,praticien);

export const deletePraticien =(praticienId)=>axios.delete(REST_API_URL +'/'+praticienId);

    
