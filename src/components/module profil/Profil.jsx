import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Profil = ({ idAppUser }) => {
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

  useEffect(() => {
    setDisplayUpdateMessageSuccess(false);

    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/appuser/${idAppUser}`,
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
  }, [idAppUser, navigate, token]);

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
        `http://localhost:5000/api/appuser/${idAppUser}`,
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
      console.error(error);
      localStorage.clear();
      navigate("/login");
    }
  };

  return (
    <div>
      <h3 style={{ textAlign: "center" }}>
        <b>Profil</b>
      </h3>
      <br />
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
            required
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
          Mettre à jour
        </button>
        {displayUpdateMessageSuccess && (
          <div className="text-center">
            <span style={{ fontWeight: "bold", color: "green" }}>
              Mise à jour faite
            </span>
          </div>
        )}
      </form>
    </div>
  );
};

export default Profil;
