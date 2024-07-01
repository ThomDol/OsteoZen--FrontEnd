import React, { useState } from "react";
import axios from "axios";

const ModalMedecinForm = ({ idModalDoc, count, setCount }) => {
  const token = localStorage.getItem("token");
  const [nomMedecinTraitant, setNomMedecinTraitant] = useState("");
  const [prenomMedecinTraitant, setPrenomMedecinTraitant] = useState("");
  const [villeMedecinTraitant, setVilleMedecinTraitant] = useState("");
  const [codePostalMedecinTraitant, setCodePostalTraitant] = useState("");
  const [displaySuccessMessage, setDisplaySuccessMessage] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = {
      nomMedecinTraitant,
      prenomMedecinTraitant,
      villeMedecinTraitant,
      codePostalMedecinTraitant,
    };
    try {
      await axios.post(`http://localhost:5000/api/medecintraitant`, formData, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      setCount(count + 1);
      setDisplaySuccessMessage(true);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div
      className="modal fade"
      id={`Modal-${idModalDoc}`}
      tabIndex="-1"
      aria-labelledby={`ModalLabel-${idModalDoc}`}
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id={`ModalLabel-${idModalDoc}`}>
              Création nouveau Medecin Traitant
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
                <label htmlFor="nomMedecinTraitant" className="form-label">
                  Nom du médecin traitant
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="nomMedecinTraitant"
                  required
                  value={nomMedecinTraitant}
                  onChange={(e) => setNomMedecinTraitant(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="prenomMedecinTraitant" className="form-label">
                  Prénom du médecin traitant
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="prenomMedecinTraitant"
                  required
                  value={prenomMedecinTraitant}
                  onChange={(e) => setPrenomMedecinTraitant(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="ville" className="form-label">
                  Ville
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="ville"
                  required
                  value={villeMedecinTraitant}
                  onChange={(e) => setVilleMedecinTraitant(e.target.value)}
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
                  value={codePostalMedecinTraitant}
                  onChange={(e) => setCodePostalTraitant(e.target.value)}
                />
              </div>
              <button type="submit" className="btn btn-primary">
                Valider
              </button>
              {displaySuccessMessage && (
                <div className="text-center">
                  <span style={{ fontWeight: "bold", color: "green" }}>
                    Medecin crée
                  </span>
                </div>
              )}
            </form>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Fermer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalMedecinForm;
