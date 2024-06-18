import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useStorage } from '../../StorageContext';

const AccouchementDetail = () => {
  const { patient } = useStorage();
  const [accouchement, setAccouchement] = useState();
  const [dateAccouchement, setDateAccouchement] = useState();
  const [dureeTravail, setDureeTravail] = useState();
  const [difficulteTravail, setDifficulteTravail] = useState();
  const [accouchementProvoque, setAccouchementProvoque] = useState();
  const [cesarienne, setCesarienne] = useState();
  const [peridurale, setPeridurale] = useState();
  const [extractionInstrumentale, setExtractionInstrumentale] = useState();
  const [ocytocine, setOcytocine] = useState();
  const [circulaireDuCordonOmbilical, setCirculaireDuCordonOmbilical] = useState();
  const [aideManuellePoussee, setAideManuellePoussee] = useState();
  const [complication, setComplication] = useState();
  const [episiotomie, setEpisiotomie] = useState();
  const [dechirure, setDechirure] = useState();
  const [reeducationPerinee, setReeducationPerinee] = useState();
  const [presentationAAccouchement, setPresentationAAccouchement] = useState();
  const [ageDateAccouchement, setAgeDateAccouchement] = useState();
  const urlGetAccouchement = `http://localhost:5000/api/accouchement/${patient.idPatient}`;

  const assign = (elem) => {
    if (elem !== null) {
      setAccouchement(elem);
      setDateAccouchement(elem.dateAccouchement);
      setDureeTravail(elem.dureeTravail);
      setDifficulteTravail(elem.difficulteTravail);
      setAccouchementProvoque(elem.accouchementProvoque);
      setCesarienne(elem.cesarienne);
      setPeridurale(elem.peridurale);
      setExtractionInstrumentale(elem.extractionInstrumentale);
      setOcytocine(elem.ocytocine);
      setCirculaireDuCordonOmbilical(elem.circulaireDuCordonOmbilical);
      setAideManuellePoussee(elem.aideManuellePoussee);
      setComplication(elem.complication);
      setEpisiotomie(elem.episiotomie);
      setDechirure(elem.dechirure);
      setReeducationPerinee(elem.reeducationPerinee);
      setPresentationAAccouchement(elem.presentationAAccouchement);
      setAgeDateAccouchement(elem.ageDateAccouchement);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(urlGetAccouchement);
        assign(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

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

    console.log(formData);
    // Envoyer les données du formulaire à votre backend ici
  };

  return (
    <div className="col-9 mx-auto">
      <h3 style={{ textAlign: 'center', paddingTop: '10px' }}>Accouchement</h3>
      <br /><br />
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="dateAccouchement" className="form-label">Date d'Accouchement</label>
          <input 
            type="text" 
            className="form-control" 
            id="dateAccouchement" 
            required 
            value={dateAccouchement} 
            onChange={(e) => setDateAccouchement(e.target.value)} 
          />
        </div>
        <div className="mb-3">
          <label htmlFor="dureeTravail" className="form-label">Durée du Travail</label>
          <input 
            type="number" 
            className="form-control" 
            id="dureeTravail" 
            value={dureeTravail} 
            onChange={(e) => setDureeTravail(e.target.value)} 
          />
        </div>
        <div className="mb-3">
          <label htmlFor="difficulteTravail" className="form-label">Difficulté du Travail</label>
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
              <label className="form-check-label" htmlFor="accouchementProvoqueOui">Oui</label>
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
              <label className="form-check-label" htmlFor="accouchementProvoqueNon">Non</label>
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
              <label className="form-check-label" htmlFor="cesarienneOui">Oui</label>
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
              <label className="form-check-label" htmlFor="cesarienneNon">Non</label>
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
              <label className="form-check-label" htmlFor="periduraleOui">Oui</label>
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
              <label className="form-check-label" htmlFor="periduraleNon">Non</label>
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
              <label className="form-check-label" htmlFor="extractionInstrumentaleOui">Oui</label>
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
              <label className="form-check-label" htmlFor="extractionInstrumentaleNon">Non</label>
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
              <label className="form-check-label" htmlFor="ocytocineOui">Oui</label>
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
              <label className="form-check-label" htmlFor="ocytocineNon">Non</label>
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
              <label className="form-check-label" htmlFor="circulaireDuCordonOmbilicalOui">Oui</label>
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
              <label className="form-check-label" htmlFor="circulaireDuCordonOmbilicalNon">Non</label>
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
              <label className="form-check-label" htmlFor="aideManuellePousseeOui">Oui</label>
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
              <label className="form-check-label" htmlFor="aideManuellePousseeNon">Non</label>
            </div>
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="complication" className="form-label">Complication</label>
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
              <label className="form-check-label" htmlFor="episiotomieOui">Oui</label>
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
              <label className="form-check-label" htmlFor="episiotomieNon">Non</label>
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
              <label className="form-check-label" htmlFor="dechirureOui">Oui</label>
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
              <label className="form-check-label" htmlFor="dechirureNon">Non</label>
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
              <label className="form-check-label" htmlFor="reeducationPerineeOui">Oui</label>
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
              <label className="form-check-label" htmlFor="reeducationPerineeNon">Non</label>
            </div>
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="presentationAAccouchement" className="form-label">Présentation à l'Accouchement</label>
          <input 
            type="text" 
            className="form-control" 
            id="presentationAAccouchement" 
            value={presentationAAccouchement} 
            onChange={(e) => setPresentationAAccouchement(e.target.value)} 
          />
        </div>
        <div className="mb-3">
          <label htmlFor="ageDateAccouchement" className="form-label">Âge à la Date de l'Accouchement</label>
          <input 
            type="number" 
            className="form-control" 
            id="ageDateAccouchement" 
            value={ageDateAccouchement} 
            onChange={(e) => setAgeDateAccouchement(e.target.value)} 
          />
        </div>
        <button type="submit" className="btn btn-primary">Soumettre</button>
      </form>
    </div>
  );
};

export default AccouchementDetail;
