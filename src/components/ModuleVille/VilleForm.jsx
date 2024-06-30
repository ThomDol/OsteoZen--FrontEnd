import React, { useState } from "react";
import axios from "axios";

const VilleForm = ({ idModalVille, countVille, setCountVille }) => {
  const token = localStorage.getItem("token");
  const [nomVille, setNomVille] = useState("");
  const [displaySuccessMessage, setDisplaySuccessMessage] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = { nom: nomVille };

    try {
      await axios.post(`http://localhost:5000/api/lieu`, formData, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      setCountVille(countVille + 1);
      setDisplaySuccessMessage(true);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div
      className="modal fade"
      id={`Modal-${idModalVille}`}
      tabIndex="-1"
      aria-labelledby={`ModalLabel-${idModalVille}`}
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id={`ModalLabel-${idModalVille}`}>
              Ajouter une Ville
            </h1>
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
                  Nom de la Ville
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="nomVille"
                  value={nomVille}
                  onChange={(e) => setNomVille(e.target.value)}
                />
              </div>
              <button type="submit" className="btn btn-primary">
                Ajouter
              </button>
              {displaySuccessMessage && (
                <div className="text-center">
                  <span style={{ fontWeight: "bold", color: "green" }}>
                    Ville ajoutée avec succès
                  </span>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VilleForm;