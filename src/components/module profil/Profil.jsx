import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import CryptoJS from "crypto-js";
import axios from "axios";
import NavBar from "../header/NavBar";
import ChangePassword from "./ChangePassword";

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

const Profil = () => {
  const [userId, setUserId] = useState(null);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const [nomAppUser, setNomAppUser] = useState("");
  const [prenomAppUser, setPrenomAppUser] = useState("");
  const [nomVille, setNomVille] = useState("");
  const [codePostal, setCodePostal] = useState("");
  const [numAdeli, setNumAdeli] = useState("");
  const [email, setEmail] = useState("");
  const [tel, setTel] = useState("");
  const [displayUpdateMessageSuccess, setDisplayUpdateMessageSuccess] =
    useState(false);
  const [displayEmailChange, setDisplayEmailChange] = useState(false);

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
    if (userId) {
      setDisplayUpdateMessageSuccess(false);

      const fetchData = async () => {
        try {
          const response = await axios.get(
            `http://localhost:5000/api/praticien/${userId}`,
            {
              headers: {
                Authorization: "Bearer " + token,
              },
            }
          );

          const data = response.data;
          setNomAppUser(data.nomAppUser || "");
          setPrenomAppUser(data.prenomAppUser || "");
          setNomVille(data.nomVille || "");
          setCodePostal(data.codePostal || "");
          setNumAdeli(data.numAdeli || "");
          setEmail(data.email || "");
          setTel(data.tel || "");
        } catch (error) {
          console.error(error);
          localStorage.clear();
          navigate("/login");
        }
      };

      fetchData();
    }
  }, [userId]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = {
      nomAppUser,
      prenomAppUser,
      nomVille,
      codePostal,
      numAdeli,
      email,
      tel,
    };

    try {
      const response = await axios.put(
        `http://localhost:5000/api/praticien/${userId}`,
        formData,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      setDisplayUpdateMessageSuccess(true);
      console.log(response.data);
    } catch (error) {
      if (error.response) {
        // Le serveur a répondu avec un statut autre que 2xx
        console.log("Error response:", error.response.data);
        if (error.response.data && error.response.data.type) {
          const errorType = error.response.data.type;
          if (errorType === "ResourceAlreadyExistsException") {
            // Effectuer l'action en conséquence
            console.log("L'utilisateur avec ce numéro Adeli existe déjà.");
            // Par exemple, afficher un message à l'utilisateur
            alert("Un utilisateur avec ce numéro Adeli existe déjà.");
          }
        }
      } else if (error.request) {
        // La requête a été faite mais aucune réponse n'a été reçue
        console.log("No response received:", error.request);
      } else {
        // Une autre erreur est survenue lors de la création de la requête
        console.log("Error setting up request:", error.message);
      }
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
        <h3 style={{ textAlign: "center" }}>
          <b>Profil</b>
        </h3>
        <br />
        
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="nomAppUser" className="form-label">
              Nom
            </label>
            <input
              type="text"
              className="form-control"
              id="nomAppUser"
              required
              value={nomAppUser}
              onChange={(e) => setNomAppUser(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="prenomAppUser" className="form-label">
              Prénom
            </label>
            <input
              type="text"
              className="form-control"
              id="prenomAppUser"
              required
              value={prenomAppUser}
              onChange={(e) => setPrenomAppUser(e.target.value)}
            />
          </div>
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
          <div className="mb-3">
            <label htmlFor="numAdeli" className="form-label">
              Numéro Adeli
            </label>
            <input
              type="text"
              className="form-control"
              id="numAdeli"
              placeholder="9 chiffres"
              pattern="\d{9}"
              required
              value={numAdeli}
              onChange={(e) => setNumAdeli(e.target.value)}
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
              readOnly
              onClick={() => setDisplayEmailChange(!displayEmailChange)}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {displayEmailChange && (
              <span style={{ color: "red" }}>
                Pour modifier votre mail, merci de contacter l'administrateur
              </span>
            )}
          </div>
          <div className="mb-3">
            <label htmlFor="tel" className="form-label">
              Téléphone
            </label>
            <input
              type="tel"
              className="form-control"
              id="tel"
              placeholder="10 chiffres"
              pattern="\d{10}"
              required
              value={tel}
              onChange={(e) => setTel(e.target.value)}
            />
          </div>
          <br />
          <div className="row">
            <div className="col d-flex justify-content-start">
              <button type="submit" className="btn btn-secondary">
                Mettre à jour
              </button>
            </div>
            <div className="col d-flex justify-content-end">
              <button
                type="button"
                data-bs-toggle="modal"
                data-bs-target={`#Modal-${userId}`}
                className="btn btn-secondary"
              >
                Modifier Mot de passe
              </button>
            </div>
          </div>
          {displayUpdateMessageSuccess && (
            <div className="text-center">
              <span style={{ fontWeight: "bold", color: "green" }}>
                Mise à jour faite
              </span>
            </div>
          )}
        </form>
        <ChangePassword idModalChangePassword={userId} />
      </div>
    </div>
  );
};

export default Profil;
