import React, { useEffect, useState } from "react";
import axios from "axios";

const ChangePassword = ({ idModalChangePassword }) => {
  const token = localStorage.getItem("token");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [displaySuccessMessage, setDisplaySuccessMessage] = useState(false);
  const [displayErrorMessage, setDisplayErrorMessage] = useState(false);

  useEffect(() => {
    setDisplaySuccessMessage(false);
    setDisplayErrorMessage(false);
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = {
      oldPassword,
      newPassword,
    };

    try {
      await axios.post(
        `http://localhost:5000/api/praticien/updateMdp/${idModalChangePassword}`, //  idModalChangePassword = userId
        formData,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      setDisplayErrorMessage(false);
      setDisplaySuccessMessage(true);
    } catch (error) {
      setDisplayErrorMessage(true);
      console.error(error);
    }
  };

  return (
    <div
      className="modal fade"
      id={`Modal-${idModalChangePassword}`}
      tabIndex="-1"
      aria-labelledby={`ModalLabel-${idModalChangePassword}`}
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5
              className="modal-title"
              id={`ModalLabel-${idModalChangePassword}`}
            >
              Changer le mot de passe
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
                <label htmlFor="oldPassword" className="form-label">
                  Ancien mot de passe
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="oldPassword"
                  required
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="newPassword" className="form-label">
                  Nouveau mot de passe
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="newPassword"
                  required
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </div>
              <button type="submit" className="btn btn-primary">
                Valider
              </button>
              {displaySuccessMessage && (
                <div className="text-center">
                  <span style={{ fontWeight: "bold", color: "green" }}>
                    Mot de passe mis à jour avec succès
                  </span>
                </div>
              )}
              {displayErrorMessage && (
                <div className="text-center">
                  <span style={{ fontWeight: "bold", color: "red" }}>
                    Ancien mot de passe incorrect
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

export default ChangePassword;
