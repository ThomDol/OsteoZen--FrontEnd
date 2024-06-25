import React, { useEffect, useState } from 'react';
import { ListePraticien, deletePraticien } from './PraticienService';
import Header from '../header/Header';
import { useNavigate } from 'react-router-dom';

const ListePraticienComponent = () => {
  const [praticiens, setPraticiens] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getAllPraticiens();
  }, []);

  const getAllPraticiens = () => {
    ListePraticien().then((response) => {
      setPraticiens(response.data);
    }).catch(error => {
      console.error(error);
    });
  };

  const addNewPraticien = () => {
    navigate('/ajouter-praticien');
  };

  const updatePraticien = (id) => {
    navigate(`/modifier-praticien/${id}`);
  };

  const removePraticien = (id) => {
    deletePraticien(id).then(() => {
      getAllPraticiens();
    }).catch(error => {
      console.error(error);
    });
  };

  return (
    <div>
      <Header />
      <br /><br />
      <h2 className="text-center">LISTE DES PRATICIENS</h2>
      <br /><br />
      <table className="table table-hover">
        <thead>
          <tr>
            <th>Nom</th>
            <th>Prénom</th>
            <th>Email</th>
            <th>Téléphone</th>
            <th>Siret</th>
            <th>Numéro Adeli</th>
            <th>Ville</th>
            <th>Code Postal</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {praticiens.map(praticien => (
            <tr key={praticien.id}>
              <td>{praticien.nomPraticienConnecte}</td>
              <td>{praticien.prenomPraticienConnecte}</td>
              <td>{praticien.email}</td>
              <td>{praticien.tel}</td>
              <td>{praticien.numSiret}</td>
              <td>{praticien.numAdeli}</td>
              <td>{praticien.nomVille}</td>
              <td>{praticien.codePostal}</td>
              <td>
                <button className="btn btn-info" onClick={() => updatePraticien(praticien.id)}>MODIFIER</button>
              </td>
              <td>
                <button className="btn btn-danger" onClick={() => removePraticien(praticien.id)}>BLOQUER</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <br /><br />
      <div className="col-2 mx-auto">
        <button className="btn btn-primary" onClick={addNewPraticien}>AJOUTER</button>
      </div>
    </div>
  );
};

export default ListePraticienComponent;
