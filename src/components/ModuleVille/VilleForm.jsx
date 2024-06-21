import React, { useState, useRef } from 'react';
import axios from 'axios';
import { Modal } from 'bootstrap';

const VilleForm = ({ idModal, resetListVille, setResetListVille }) => {
  const [nomVille, setNomVille] = useState('');
  const [codePostal, setCodePostal] = useState('');
  const modalRef = useRef();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = {
      nomVille,
      codePostal,
    };

    try {
      const response = await axios.post(
        `http://localhost:5000/api/lieu`,
        formData
      );
      console.log(response.data);
      setResetListVille(resetListVille + 1); // pour que la liste s'actualise

    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div
      className="modal fade"
      id={`Modal-${idModal}`}
      tabIndex="-1"
      aria-labelledby={`ModalLabel-${idModal}`}
      aria-hidden="true"
      ref={modalRef}
    >
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id={`ModalLabel-${idModal}`}>
              Créer Ville
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="nomVille" className="form-label">
                  Ville
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="nomVille"
                  required
                  value={nomVille}
                  onChange={(e) => setNomVille(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="codePostal" className="form-label">
                  Code Postal
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="codePostal"
                  required
                  value={codePostal}
                  onChange={(e) => setCodePostal(e.target.value)}
                />
              </div>
              <button type="submit" className="btn btn-primary">
                Soumettre
              </button>
            </form>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VilleForm;
