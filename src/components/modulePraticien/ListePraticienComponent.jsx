import React ,{useEffect, useState }from 'react';
import { ListePraticien } from './PraticienService';
import Header from '../header/Header';
import { useNavigate } from 'react-router-dom';

const ListePraticienComponent = () => {

    const [praticien ,setPraticien ] = useState([])
    const navigator = useNavigate();

    useEffect(()=>{
      getAllPraticien();

    },[])
    function getAllPraticien (){
      ListePraticien().then((response)=>{
        setPraticien(response.data);

     }).catch(error =>{
        console.error(error);
     })

    }
   function addNewPraticien (){
    navigator('/ajouter-praticien')

   }

  function  updatePraticien (id){
    navigator(`/modifier-praticien`)

  }
    function removePraticien(id){
      console.log(id)

      deletePraticien(id).then((response)=>{

        getAllPraticien();

      }).catch(error=>{
        console.error(error);
      })


       
    }

  return (
    <div className>
      <div>
        <Header/>
      </div>
      <br /><br />
         <h2 className='text-center'>LISTE DES PRATICIENS</h2>
         <br /><br />
         <table className='table table-hover'>
            <thead>
                <tr >
                    <th>Nom</th>
                    <th>Prenom</th>
                    <th>Email</th>
                    <th>Telephone</th>
                    <th>Siret</th>
                    <th>Numero Adeli</th>
                    <th>Ville</th>
                    <th>Code Postal</th>
                    <th></th>
                    <th></th>

                </tr>
            </thead>
           
            <tbody>
                {
                    praticien.map(praticien =>
                       <tr key={praticien.id}>
                        <td>{praticien.nomPraticienConnecte}</td>
                        <td>{praticien.prenomPreaticienConnecte}</td>
                        <td>{praticien.email}</td>
                        <td>{praticien.tel}</td>
                        <td>{praticien.numSiret}</td>
                        <td>{praticien.numAdeli}</td>
                        <td>{praticien.nomVille}</td>
                        <td>{praticien.codePostal}</td>
                        <td> 
                        <button className='btn btn-info'onClick={()=>updatePraticien(praticien.id)} >MODIFIER</button>
                        </td>
                        <td>
                        <button className='btn btn-danger'onClick={()=>removePraticien(praticien.id)} >BLOQUER</button>
                        </td>
                     </tr> )
                }
            </tbody>
            
         </table>
         <br /><br />
         <div className='col-2 mx-auto'>
         <button className='btn btn-primary mb-'onClick={addNewPraticien}>AJOUTER</button>
         </div>
    </div>
    
  )
}

export default ListePraticienComponent