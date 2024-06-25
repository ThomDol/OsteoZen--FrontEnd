import React, { useEffect, useState } from 'react';
import { createPraticien, getPraticien, updatePraticien } from '../modulePraticien/PraticienService';
import { useNavigate, useParams } from 'react-router-dom';

const PraticienComponent = () => {
  const [nomPraticienConnecte, setNomPraticienConnecte] = useState('');
  const [prenomPraticienConnecte, setPrenomPraticienConnecte] = useState('');
  const [password, setPassword] = useState('');
  const [nomRole, setNomRole] = useState('');
  const [nomVille, setNomVille] = useState('');
  const [codePostal, setCodePostal] = useState('');
  const [numAdeli, setNumAdeli] = useState('');
  const [numSiret, setNumSiret] = useState('');
  const [email, setEmail] = useState('');
  const [tel, setTel] = useState('');
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      getPraticien(id).then((response) => {
        const data = response.data;
        setNomPraticienConnecte(data.nomPraticienConnecte);
        setPrenomPraticienConnecte(data.prenomPraticienConnecte);
        setCodePostal(data.codePostal);
        setEmail(data.email);
        setNomRole(data.nomRole);
        setNomVille(data.nomVille);
        setNumAdeli(data.numAdeli);
        setNumSiret(data.numSiret);
        setPassword(data.password);
      }).catch(error => {
        console.error("Erreur lors de la récupération du praticien :", error);
      });
    }
  }, [id]);

  const savePraticien = (e) => {
    e.preventDefault();

    const praticien = {
      nomPraticienConnecte,
      prenomPraticienConnecte,
      password,
      nomRole,
      nomVille,
      codePostal,
      numAdeli,
      numSiret,
      email,
      tel,
    };

    if (id) {
      // Si id existe, on met à jour le praticien
      updatePraticien(id, praticien).then((response) => {
        console.log("Praticien mis à jour avec succès :", response.data);
        navigate('/praticien');
      }).catch(error => {
        console.error("Erreur lors de la mise à jour du praticien :", error);
      });
    } else {
      // Sinon, on crée un nouveau praticien
      createPraticien(praticien).then((response) => {
        console.log("Praticien ajouté avec succès :", response.data);
        navigate('/Admin');
      }).catch(error => {
        console.error("Erreur lors de la création du praticien :", error);
      });
    }
  };

  const pageTitle = () => {
    return id ? <h5 className="card-title text-bold">MODIFIER PRATICIEN</h5> : <h5 className="card-title text-bold">AJOUT NOUVEAU PRATICIEN</h5>;
  };

  return (
    <div className='container'>
      <div className="card col-md-6 offset-md-3 offset-md-3 bg-info" style={{ maxWidth: '600px', margin: '20px auto', padding: '20px' }}>
        <div className="card-body">
          {pageTitle()}
          <form onSubmit={savePraticien}>
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
                value={prenomPraticienConnecte}
                onChange={(e) => setPrenomPraticienConnecte(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Mot de passe</label>
              <input
                type="password"
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
            <br />
            <button className='btn btn-success' type="submit">ENREGISTRER</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PraticienComponent;
