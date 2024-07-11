import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const AccouchementNew = ({
  idPatient,
  setCountAccouchement,
  countAccouchement,
}) => {
  const token = localStorage.getItem("token");
  const [dateAccouchement, setDateAccouchement] = useState("");
  const [dureeTravail, setDureeTravail] = useState("");
  const [difficulteTravail, setDifficulteTravail] = useState("");
  const [accouchementProvoque, setAccouchementProvoque] = useState(null);
  const [cesarienne, setCesarienne] = useState(null);
  const [peridurale, setPeridurale] = useState(null);
  const [extractionInstrumentale, setExtractionInstrumentale] = useState(null);
  const [ocytocine, setOcytocine] = useState(null);
  const [circulaireDuCordonOmbilical, setCirculaireDuCordonOmbilical] =
    useState(null);
  const [aideManuellePoussee, setAideManuellePoussee] = useState(null);
  const [complication, setComplication] = useState(null);
  const [episiotomie, setEpisiotomie] = useState(null);
  const [dechirure, setDechirure] = useState(null);
  const [reeducationPerinee, setReeducationPerinee] = useState(null);
  const [presentationAAccouchement, setPresentationAAccouchement] =
    useState("");
  const [ageDateAccouchement, setAgeDateAccouchement] = useState("");
  const urlAccouchement = `http://localhost:5000/api/accouchement/${idPatient}`;

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = {
      dateAccouchement,
      dureeTravail,
      difficulteTravail,
      accouchementProvoque,
      cesarienne,
      peridurale,
      extractionInstrumentale,
      ocytocine,
      circulaireDuCordonOmbilical,
      aideManuellePoussee,
      complication,
      episiotomie,
      dechirure,
      reeducationPerinee,
      presentationAAccouchement,
      ageDateAccouchement,
    };

    const postData = async () => {
      try {
        const response = await axios.post(urlAccouchement, formData, {
          headers: {
            Authorization: "Bearer " + token,
          },
        });
        Swal.fire("Création effectuée!");
        setCountAccouchement(countAccouchement + 1);
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    postData();
  };

  return (
    <div className="col-9 mx-auto">
      <h3 style={{ textAlign: "center", paddingTop: "10px" }}>CREER FICHE ACCOUCHEMENT</h3>
      <br />
      <br />
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="dateAccouchement" className="form-label">
            Date d'Accouchement
          </label>
          <input
            type="text"
            className="form-control"
            id="dateAccouchement"
            placeholder="jj/mm/aaaa"
            pattern="\d{2}/\d{2}/\d{4}"
            required
            value={dateAccouchement}
            onChange={(e) => setDateAccouchement(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="dureeTravail" className="form-label">
            Durée du Travail
          </label>
          <input
            type="number"
            className="form-control"
            id="dureeTravail"
            value={dureeTravail}
            onChange={(e) => setDureeTravail(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="difficulteTravail" className="form-label">
            Difficulté du Travail
          </label>
          <input
            type="text"
            className="form-control"
            id="difficulteTravail"
            value={difficulteTravail}
            onChange={(e) => setDifficulteTravail(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Accouchement Provoqué</label>
          <div>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="accouchementProvoque"
                id="accouchementProvoqueOui"
                value={true}
                checked={accouchementProvoque === true}
                onChange={() => setAccouchementProvoque(true)}
              />
              <label
                className="form-check-label"
                htmlFor="accouchementProvoqueOui"
              >
                Oui
              </label>
            </div>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="accouchementProvoque"
                id="accouchementProvoqueNon"
                value={false}
                checked={accouchementProvoque === false}
                onChange={() => setAccouchementProvoque(false)}
              />
              <label
                className="form-check-label"
                htmlFor="accouchementProvoqueNon"
              >
                Non
              </label>
            </div>
          </div>
        </div>
        <div className="mb-3">
          <label className="form-label">Césarienne</label>
          <div>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="cesarienne"
                id="cesarienneOui"
                value={true}
                checked={cesarienne === true}
                onChange={() => setCesarienne(true)}
              />
              <label className="form-check-label" htmlFor="cesarienneOui">
                Oui
              </label>
            </div>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="cesarienne"
                id="cesarienneNon"
                value={false}
                checked={cesarienne === false}
                onChange={() => setCesarienne(false)}
              />
              <label className="form-check-label" htmlFor="cesarienneNon">
                Non
              </label>
            </div>
          </div>
        </div>
        <div className="mb-3">
          <label className="form-label">Péridurale</label>
          <div>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="peridurale"
                id="periduraleOui"
                value={true}
                checked={peridurale === true}
                onChange={() => setPeridurale(true)}
              />
              <label className="form-check-label" htmlFor="periduraleOui">
                Oui
              </label>
            </div>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="peridurale"
                id="periduraleNon"
                value={false}
                checked={peridurale === false}
                onChange={() => setPeridurale(false)}
              />
              <label className="form-check-label" htmlFor="periduraleNon">
                Non
              </label>
            </div>
          </div>
        </div>
        <div className="mb-3">
          <label className="form-label">Extraction Instrumentale</label>
          <div>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="extractionInstrumentale"
                id="extractionInstrumentaleOui"
                value={true}
                checked={extractionInstrumentale === true}
                onChange={() => setExtractionInstrumentale(true)}
              />
              <label
                className="form-check-label"
                htmlFor="extractionInstrumentaleOui"
              >
                Oui
              </label>
            </div>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="extractionInstrumentale"
                id="extractionInstrumentaleNon"
                value={false}
                checked={extractionInstrumentale === false}
                onChange={() => setExtractionInstrumentale(false)}
              />
              <label
                className="form-check-label"
                htmlFor="extractionInstrumentaleNon"
              >
                Non
              </label>
            </div>
          </div>
        </div>
        <div className="mb-3">
          <label className="form-label">Ocytocine</label>
          <div>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="ocytocine"
                id="ocytocineOui"
                value={true}
                checked={ocytocine === true}
                onChange={() => setOcytocine(true)}
              />
              <label className="form-check-label" htmlFor="ocytocineOui">
                Oui
              </label>
            </div>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="ocytocine"
                id="ocytocineNon"
                value={false}
                checked={ocytocine === false}
                onChange={() => setOcytocine(false)}
              />
              <label className="form-check-label" htmlFor="ocytocineNon">
                Non
              </label>
            </div>
          </div>
        </div>
        <div className="mb-3">
          <label className="form-label">Circulaire du Cordon Ombilical</label>
          <div>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="circulaireDuCordonOmbilical"
                id="circulaireDuCordonOmbilicalOui"
                value={true}
                checked={circulaireDuCordonOmbilical === true}
                onChange={() => setCirculaireDuCordonOmbilical(true)}
              />
              <label
                className="form-check-label"
                htmlFor="circulaireDuCordonOmbilicalOui"
              >
                Oui
              </label>
            </div>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="circulaireDuCordonOmbilical"
                id="circulaireDuCordonOmbilicalNon"
                value={false}
                checked={circulaireDuCordonOmbilical === false}
                onChange={() => setCirculaireDuCordonOmbilical(false)}
              />
              <label
                className="form-check-label"
                htmlFor="circulaireDuCordonOmbilicalNon"
              >
                Non
              </label>
            </div>
          </div>
        </div>
        <div className="mb-3">
          <label className="form-label">Aide Manuelle à la Poussée</label>
          <div>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="aideManuellePoussee"
                id="aideManuellePousseeOui"
                value={true}
                checked={aideManuellePoussee === true}
                onChange={() => setAideManuellePoussee(true)}
              />
              <label
                className="form-check-label"
                htmlFor="aideManuellePousseeOui"
              >
                Oui
              </label>
            </div>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="aideManuellePoussee"
                id="aideManuellePousseeNon"
                value={false}
                checked={aideManuellePoussee === false}
                onChange={() => setAideManuellePoussee(false)}
              />
              <label
                className="form-check-label"
                htmlFor="aideManuellePousseeNon"
              >
                Non
              </label>
            </div>
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="complication" className="form-label">
            Complications
          </label>
          <input
            type="text"
            className="form-control"
            id="complication"
            value={complication}
            onChange={(e) => setComplication(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Épisiotomie</label>
          <div>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="episiotomie"
                id="episiotomieOui"
                value={true}
                checked={episiotomie === true}
                onChange={() => setEpisiotomie(true)}
              />
              <label className="form-check-label" htmlFor="episiotomieOui">
                Oui
              </label>
            </div>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="episiotomie"
                id="episiotomieNon"
                value={false}
                checked={episiotomie === false}
                onChange={() => setEpisiotomie(false)}
              />
              <label className="form-check-label" htmlFor="episiotomieNon">
                Non
              </label>
            </div>
          </div>
        </div>
        <div className="mb-3">
          <label className="form-label">Déchirure</label>
          <div>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="dechirure"
                id="dechirureOui"
                value={true}
                checked={dechirure === true}
                onChange={() => setDechirure(true)}
              />
              <label className="form-check-label" htmlFor="dechirureOui">
                Oui
              </label>
            </div>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="dechirure"
                id="dechirureNon"
                value={false}
                checked={dechirure === false}
                onChange={() => setDechirure(false)}
              />
              <label className="form-check-label" htmlFor="dechirureNon">
                Non
              </label>
            </div>
          </div>
        </div>
        <div className="mb-3">
          <label className="form-label">Rééducation Périnée</label>
          <div>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="reeducationPerinee"
                id="reeducationPerineeOui"
                value={true}
                checked={reeducationPerinee === true}
                onChange={() => setReeducationPerinee(true)}
              />
              <label
                className="form-check-label"
                htmlFor="reeducationPerineeOui"
              >
                Oui
              </label>
            </div>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="reeducationPerinee"
                id="reeducationPerineeNon"
                value={false}
                checked={reeducationPerinee === false}
                onChange={() => setReeducationPerinee(false)}
              />
              <label
                className="form-check-label"
                htmlFor="reeducationPerineeNon"
              >
                Non
              </label>
            </div>
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="presentationAAccouchement" className="form-label">
            Présentation à l'Accouchement
          </label>
          <input
            type="text"
            className="form-control"
            id="presentationAAccouchement"
            value={presentationAAccouchement}
            onChange={(e) => setPresentationAAccouchement(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="ageDateAccouchement" className="form-label">
            Âge à la Date d'Accouchement
          </label>
          <input
            type="number"
            className="form-control"
            id="ageDateAccouchement"
            value={ageDateAccouchement}
            onChange={(e) => setAgeDateAccouchement(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-secondary">
          Créer
        </button>
      </form>
    </div>
  );
};

export default AccouchementNew;
