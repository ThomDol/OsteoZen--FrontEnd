import React from 'react';
import { useStorage } from '../../StorageContext';
import { useState } from 'react';

const ProfilPatient = () => {
  const { patient } = useStorage();

  const [isReadOnly, setIsReadOnly] = useState(true);

  const getEditable = () => {
    setIsReadOnly(!isReadOnly);
  };

  return (
    <div>
      <br /><br />
      <div className="col-6 patient Infos mx-auto">
        <div className="form-floating mb-3">
          <input
            type="email"
            className="form-control"
            id="dateNaissance"
            readOnly={isReadOnly}
            value={patient.dateNaissance || ''}
            onClick={getEditable}
          />
          <label htmlFor="dateNaissance">Date de Naissance</label>
        </div>
        <div className="form-floating mb-3">
          <input
            type="text"
            className="form-control"
            id="ville"
            readOnly={isReadOnly}
            value={`${patient.nomVille || ''} ${patient.codePostal || ''}`}
            onClick={getEditable}
          />
          <label htmlFor="ville">Ville</label>
        </div>
        <div className="form-floating mb-3">
          <input
            type="text"
            className="form-control"
            id="genre"
            readOnly={isReadOnly}
            value={patient.nomGenre || ''}
            onClick={getEditable}
          />
          <label htmlFor="genre">Genre</label>
        </div>
        <div className="form-floating mb-3">
          <input
            type="text"
            className="form-control"
            id="profession"
            readOnly={isReadOnly}
            value={patient.nomProfession || ''}
            onClick={getEditable}
          />
          <label htmlFor="profession">Profession</label>
        </div>
        <div className="form-floating mb-3">
          <input
            type="text"
            className="form-control"
            id="type"
            readOnly={isReadOnly}
            value={patient.nomTypePatient || ''}
            onClick={getEditable}
          />
          <label htmlFor="type">Type</label>
        </div>
        <div className="form-floating mb-3">
          <input
            type="text"
            className="form-control"
            id="medecin"
            readOnly={isReadOnly}
            value={`${patient.prenomMedecinTraitant || ''} ${patient.nomMedecinTraitant || ''} ${patient.villeMedecinTraitant || ''}`}
            onClick={getEditable}
          />
          <label htmlFor="medecin">Medecin Traitant</label>
        </div>
        <div className="form-floating mb-3">
          <input
            type="text"
            className="form-control"
            id="email"
            readOnly={isReadOnly}
            value={patient.email || ''}
            onClick={getEditable}
          />
          <label htmlFor="email">Email</label>
        </div>
        <div className="form-floating mb-3">
          <input
            type="text"
            className="form-control"
            id="tel"
            readOnly={isReadOnly}
            value={patient.tel || ''}
            onClick={getEditable}
          />
          <label htmlFor="tel">Tel</label>
        </div>
      </div>
    </div>
  );
};

export default ProfilPatient;
