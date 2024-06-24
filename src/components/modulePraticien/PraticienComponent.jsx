import React, { useEffect, useState } from 'react';
import { createPraticien, getPraticien } from '../modulePraticien/PraticienService';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';


const PraticienComponent = () => {
  const [nomPraticienConnecte, setNomPraticienConnecte] = useState('');
  const [PrenomPraticienConnecte, setPrenomnomPraticienConnecte] = useState('');
  const [password, setPassword] = useState('');
  const [nomRole, setNomRole] = useState('');
  const [nomVille, setNomVille] = useState('');
  const [codePostal, setCodePostal] = useState('');
  const [numAdeli, setNumAdeli] = useState('');
  const [numSiret, setNumSiret] = useState('');
  const [email, setEmail] = useState('');
  const [tel, setTel] = useState('');
  const{id} =useParams();

  const navigator = useNavigate();
  useEffect(()=>{

    if(id){
        getPraticien(id).then((response)=>{
            setNomPraticienConnecte(response.data.nomPraticienConnecte)
            setPrenomnomPraticienConnecte(response.data.PrenomPraticienConnecte)
            setCodePostal(response.data.codePostal)
            setEmail(response.data.email)
            setNomRole(response.data.nomRole)
            setNomVille(response.data.nomVille)
            setNumAdeli(response.data.numAdeli)
            setNumSiret(response.data.numSiret)
            setPassword(response.data.password)
        }).catch(error=>{
            console.error(error);
        }
            

        )
    }

  },[id])
  

  function saveOrUpdatePraticien (e){
    e.preventDefault();
    
    const praticien = {nomPraticienConnecte,PrenomPraticienConnecte,password,nomRole,nomVille,codePostal,numAdeli,numSiret,email,tel}
    console.log(praticien)


    createPraticien(praticien).then((response)=>{
        console.log(response.data);

        navigator('/praticien')

    })
  }
  function pageTitle (){
    if(id){
        return  <h5 className="card-title text-bold">MODIFIER PRATICIEN</h5>
    }else{
        return <h5 className="card-title text-bold">AJOUT NOUVEAU PRATICIEN</h5>
    }

  }

  return (
    <div className='container'>
    <div className="card col-md-6 offset-md-3 offset-md-3 bg-info" style={{ maxWidth: '600px', margin: '20px auto', padding: '20px' }}>
      <div className="card-body">
        {
            pageTitle()
        }
        <div className="form-group">
          <label>Nom</label>
          <input
            type="text"
            className="form-control"
            value={nomPraticienConnecte}
            onChange={(e) => setNomPraticienConnecte(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Prénom</label>
          <input
            type="text"
            className="form-control"
            value={PrenomPraticienConnecte}
            onChange={(e) => setPrenomnomPraticienConnecte(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Mot de passe</label>
          <input
            type="text"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Rôle</label>
          <input
            type="text"
            className="form-control"
            value={nomRole}
            onChange={(e) => setNomRole(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Ville</label>
          <input
            type="text"
            className="form-control"
            value={nomVille}
            onChange={(e) => setNomVille(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Code Postal</label>
          <input
            type="text"
            className="form-control"
            value={codePostal}
            onChange={(e) => setCodePostal(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Numéro Adeli</label>
          <input
            type="text"
            className="form-control"
            value={numAdeli}
            onChange={(e) => setNumAdeli(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Numéro Siret</label>
          <input
            type="text"
            className="form-control"
            value={numSiret}
            onChange={(e) => setNumSiret(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Téléphone</label>
          <input
            type="tel"
            className="form-control"
            value={tel}
            onChange={(e) => setTel(e.target.value)}
          />
        </div>
        <button className='btn btn-success' onClick={saveOrUpdatePraticien }></button>
      </div>
    </div>
    </div>
  );
};

export default PraticienComponent;
