import React, { useState, useEffect, useRef } from "react";
import { jwtDecode } from "jwt-decode";
import CryptoJS from "crypto-js";
import axios from "axios";
import { Modal } from "bootstrap";

const SECRET_KEY = "q#4puta9!am4$fcl";
const INIT_VECTOR = "1zp6@y#ect4?5krx";

const decryptToken = (encryptedToken) => {
  const key = CryptoJS.enc.Utf8.parse(SECRET_KEY);
  const iv = CryptoJS.enc.Utf8.parse(INIT_VECTOR);

  const decrypted = CryptoJS.AES.decrypt(encryptedToken, key, {
    iv: iv,
    padding: CryptoJS.pad.Pkcs7,
    mode: CryptoJS.mode.CBC,
  });

  return decrypted.toString(CryptoJS.enc.Utf8);
};

const PatientForm = ({ idModal, count, setCount }) => {
  const token = localStorage.getItem("token");
  const [idPraticien, setIdPraticien] = useState(null);
  const [dateNaissance, setDateNaissance] = useState("");
  const [nomGenre, setNomGenre] = useState("");
  const [nomProfession, setNomProfession] = useState("");
  const [nomTypePatient, setNomTypePatient] = useState("");
  const [nomPatient, setNomPatient] = useState("");
  const [prenomPatient, setPrenomPatient] = useState("");
  const [email, setEmail] = useState("");
  const [tel, setTel] = useState("");
  const [medecinTraitantComplet, setMedecinTraitantComplet] = useState("");
  const [nomVille, setNomVille] = useState("");
  const [codePostal, setCodePostal] = useState("");
  const [displaySuccessMessage, setDisplaySuccessMessage] = useState(false);

  const modalRef = useRef();

  useEffect(() => {
    setDisplaySuccessMessage(false);
  }, []);

  useEffect(() => {
    try {
      const decryptedToken = decryptToken(token);
      const decodedToken = jwtDecode(decryptedToken);
      setIdPraticien(decodedToken.id);
    } catch (error) {
      console.error("Erreur de décryptage ou de décodage du token:", error);
    }
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Diviser la valeur combinée du médecin traitant
    const [medecinNom, medecinPrenom, medecinVille] =
      medecinTraitantComplet.split(" ");
    // Diviser la valeur combinée de la ville

    const formData = {
      dateNaissance,
      nomVille,
      codePostal,
      nomGenre,
      nomProfession,
      nomTypePatient,
      MedecinTraitant: {
        nom: medecinNom,
        prenom: medecinPrenom,
        ville: medecinVille,
      },
      nomPatient,
      prenomPatient,
      email,
      tel,
    };

    try {
      if (idPraticien) {
        const response = await axios.post(
          `http://localhost:5000/api/patient/${idPraticien}`,
          formData,
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        );
        setDisplaySuccessMessage(true);
        console.log(response.data);
        setCount(count + 1); //pour que liste s'actualise

        
      }
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
              Patient Form
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
                <label htmlFor="nomPatient" className="form-label">
                  Nom du Patient
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="nomPatient"
                  required
                  value={nomPatient}
                  onChange={(e) => setNomPatient(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="prenomPatient" className="form-label">
                  Prénom du Patient
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="prenomPatient"
                  required
                  value={prenomPatient}
                  onChange={(e) => setPrenomPatient(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="dateNaissance" className="form-label">
                  Date de Naissance
                </label>
                <input
                  type="date"
                  className="form-control"
                  id="dateNaissance"
                  required
                  value={dateNaissance}
                  onChange={(e) => setDateNaissance(e.target.value)}
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Genre</label>
                <div>
                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="nomGenre"
                      id="genreHomme"
                      value="Homme"
                      required
                      checked={nomGenre === "Homme"}
                      onChange={(e) => setNomGenre(e.target.value)}
                    />
                    <label className="form-check-label" htmlFor="genreHomme">
                      Homme
                    </label>
                  </div>
                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="nomGenre"
                      id="genreFemme"
                      value="Femme"
                      required
                      checked={nomGenre === "Femme"}
                      onChange={(e) => setNomGenre(e.target.value)}
                    />
                    <label className="form-check-label" htmlFor="genreFemme">
                      Femme
                    </label>
                  </div>
                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="nomGenre"
                      id="genreSans"
                      value="Sans"
                      required
                      checked={nomGenre === "Sans"}
                      onChange={(e) => setNomGenre(e.target.value)}
                    />
                    <label className="form-check-label" htmlFor="genreSans">
                      Sans
                    </label>
                  </div>
                </div>
              </div>
              <div className="mb-3">
                <label className="form-label">Type de Patient</label>
                <div>
                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="nomTypePatient"
                      id="typeAdulte"
                      value="adulte"
                      required
                      checked={nomTypePatient === "adulte"}
                      onChange={(e) => setNomTypePatient(e.target.value)}
                    />
                    <label className="form-check-label" htmlFor="typeAdulte">
                      Adulte
                    </label>
                  </div>
                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="nomTypePatient"
                      id="typeEnfant"
                      value="enfant"
                      required
                      checked={nomTypePatient === "enfant"}
                      onChange={(e) => setNomTypePatient(e.target.value)}
                    />
                    <label className="form-check-label" htmlFor="typeEnfant">
                      Enfant
                    </label>
                  </div>
                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="nomTypePatient"
                      id="typeBebe"
                      value="bebe"
                      required
                      checked={nomTypePatient === "bebe"}
                      onChange={(e) => setNomTypePatient(e.target.value)}
                    />
                    <label className="form-check-label" htmlFor="typeBebe">
                      Bébé
                    </label>
                  </div>
                </div>
              </div>

              <div className="mb-3">
                <label htmlFor="MedecinTraitant" className="form-label">
                  Médecin Traitant
                </label>
                <select
                  className="form-select"
                  id="MedecinTraitant"
                  value={medecinTraitantComplet}
                  onChange={(e) => setMedecinTraitantComplet(e.target.value)}
                >
                  {/* Options à remplir dynamiquement */}
                </select>
                <button type="button" className="btn btn-link">
                  Ajouter Médecin
                </button>
              </div>
              <div className="mb-3">
                <label htmlFor="nomVille" className="form-label">
                  Ville
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="nomVille"
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
                  value={codePostal}
                  onChange={(e) => setCodePostal(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="libelleProfession" className="form-label">
                  Profession
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="nomProfession"
                  value={nomProfession}
                  onChange={(e) => setNomProfession(e.target.value)}
                />
              </div>

              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="tel" className="form-label">
                  Téléphone
                </label>
                <input
                  type="tel"
                  className="form-control"
                  id="tel"
                  required
                  value={tel}
                  onChange={(e) => setTel(e.target.value)}
                />
              </div>
              <button type="submit" className="btn btn-primary">
                Créer
              </button>
            </form>
            <br />
            {displaySuccessMessage && (
              <div className="text-center">
                <span style={{ fontWeight: "bold", color: "green" }}>
                  Patient crée
                </span>
              </div>
            )}
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

export default PatientForm;
