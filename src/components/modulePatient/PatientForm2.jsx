import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import ModalDocForm from "../module medecin traitant/ModalDocForm";
import { useNavigate } from "react-router-dom";
import NavBar from "../header/NavBar";
import { jwtDecode } from "jwt-decode";
import CryptoJS from "crypto-js";

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

const PatientForm2 = () => {
  const [userId, setUserId] = useState(null);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const [listDoc, setListDoc] = useState([]);
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
  const [count, setCount] = useState(0); //pour actualiser liste de medecin qd ajout
  const idModalDocAdd = "idModalDocAdd";

  const modalRef = useRef();

  useEffect(() => {
    try {
      const decryptedToken = decryptToken(token);
      const decodedToken = jwtDecode(decryptedToken);
      setUserId(decodedToken.id);
    } catch (error) {
      console.error("Erreur de décryptage ou de décodage du token:", error);
    }
  }, []);

  useEffect(() => {
    setDisplaySuccessMessage(false);
  }, []);

  useEffect(() => {
    const loadAllDoc = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/medecintraitant/all",
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        );
        setListDoc(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    loadAllDoc();
  }, [count]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Diviser la valeur combinée du médecin traitant
    const [prenomMedecinTraitant, nomMedecinTraitant, ville] =
      medecinTraitantComplet.split(" ");
    // Diviser la valeur combinée de la ville

    const formData = {
      dateNaissance,
      nomVille,
      codePostal,
      nomGenre,
      nomProfession,
      nomTypePatient,
      nomMedecinTraitant: nomMedecinTraitant,
      prenomMedecinTraitant: prenomMedecinTraitant,
      villeMedecinTraitant: ville,
      nomPatient,
      prenomPatient,
      email,
      tel,
    };

    try {
      const response = await axios.post(
        `http://localhost:5000/api/patient/${userId}`,
        formData,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      setDisplaySuccessMessage(true);
      console.log(response.data);
      navigate("/List");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <div>
        <NavBar />
      </div>
      <br />
      <br />
      <br />
      <br />
      <br />
      <div className="col-6 mx-auto">
        <div className="text-center">
          <h5>Nouvelle Fiche Patient</h5>
        </div>
        <br />
        <div>
          <div className="modal-body">
            <div>
              <button
                type="button"
                className="btn btn-primary"
                data-bs-toggle="modal"
                data-bs-target={`#Modal-${idModalDocAdd}`}
              >
                Ajouter Médecin Traitant
              </button>
              <ModalDocForm
                idModalDoc={idModalDocAdd}
                count={count}
                setCount={setCount}
              />
            </div>
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
                  type="text"
                  className="form-control"
                  id="dateNaissance"
                  placeholder="jj/mm/aaaa"
                  pattern="\d{2}/\d{2}/\d{4}"
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
                  <option value="">Selectionner le mededin traitant</option>
                  {listDoc &&
                    listDoc.map((doc, index) => (
                      <option
                        key={index}
                        value={`${doc.prenomMedecinTraitant} ${doc.nomMedecinTraitant} ${doc.ville}`}
                      >
                        {doc.prenomMedecinTraitant} {doc.nomMedecinTraitant},{" "}
                        {doc.ville}
                      </option>
                    ))}
                </select>
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
                  placeholder="10 chiffres"
                  pattern="\d{10}"
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientForm2;
