import React, { useState, useEffect } from "react";
import axios from "axios";
import { useStorage } from "../../StorageContext";

const PatientUpdateForm = ({ listMedecin, listVille, listProfession }) => {
  const { patient } = useStorage();
  const [dateNaissance, setDateNaissance] = useState("");
  const [nomGenre, setNomGenre] = useState("");
  const [nomProfession, setNomProfession] = useState("");
  const [nomTypePatient, setNomTypePatient] = useState("");
  const [nomPatient, setNomPatient] = useState("");
  const [prenomPatient, setPrenomPatient] = useState("");
  const [email, setEmail] = useState("");
  const [tel, setTel] = useState("");
  const [medecinTraitantComplet, setMedecinTraitantComplet] = useState("");
  const [villeComplet, setVilleComplet] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/patient/${patient.idPatient}`
        );
        const data = response.data;
        setDateNaissance(data.dateNaissance);
        setNomGenre(data.nomGenre);
        setNomProfession(data.nomProfession);
        setNomTypePatient(data.nomTypePatient);
        setNomPatient(data.nomPatient);
        setPrenomPatient(data.prenomPatient);
        setEmail(data.email);
        setTel(data.tel);
        setMedecinTraitantComplet(
          `${data.MedecinTraitant.nom} ${data.MedecinTraitant.prenom} ${data.MedecinTraitant.ville}`
        );
        setVilleComplet(`${data.codePostal}-${data.nomville}`);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [patient.idPatient]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const [medecinNom, medecinPrenom, medecinVille] =
      medecinTraitantComplet.split(" ");
    const [codePostal, nomville] = villeComplet.split(" ");

    const formData = {
      dateNaissance,
      nomville,
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
      const response = await axios.put(
        `http://localhost:5000/api/patient/${patient.idPatient}`,
        formData
      );
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h5 style={{textAlign:'center'}}>Profil</h5>
      <br /><br />
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
          <select
            className="form-select"
            id="nomVille"
            value={villeComplet}
            onChange={(e) => setVilleComplet(e.target.value)}
          >
            {listVille.map((ville) => (
              <option
                key={ville.idVille}
                value={`${ville.codePostal} ${ville.nomville}`}
              >
                {`${ville.codePostal} ${ville.nomville}`}
              </option>
            ))}
          </select>
          <button type="button" className="btn btn-link">
            Ajouter Ville
          </button>
        </div>
        <div className="mb-3">
          <label htmlFor="nomProfession" className="form-label">
            Profession
          </label>
          <select
            className="form-select"
            id="nomProfession"
            value={nomProfession}
            onChange={(e) => setNomProfession(e.target.value)}
          >
            {/* Ajoutez les options ici */}
          </select>
          <button type="button" className="btn btn-link mt-2">
            Ajouter une profession
          </button>
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
            value={tel}
            onChange={(e) => setTel(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Soumettre
        </button>
      </form>
    </div>
  );
};

export default PatientUpdateForm;
