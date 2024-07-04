import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const GrossesseDetail = ({
  idGrossesseSelected,
  setCountGrossesse,
  countGrossesse,
}) => {
  const token = localStorage.getItem("token");
  const [dateCreation, setDateCreation] = useState("");
  const [dateUpdate, setDateUpdate] = useState("");
  const [maternite, setMaternite] = useState("");
  const [grossesseMultiple, setGrossesseMultiple] = useState(null);
  const [douleursPendantGrossesse, setDouleursPendantGrossesse] = useState("");
  const [etatPsychoEmotionnel, setEtatPsychoEmotionnel] = useState("");
  const [traitementLieGrossesse, setTraitementLieGrossesse] = useState("");
  const [mouvementsBebe, setMouvementsBebe] = useState("");
  const [cesariennePrevue, setCesariennePrevue] = useState(null);
  const [projetPeridurale, setProjetPeridurale] = useState(null);
  const [projetAllaitement, setProjetAllaitement] = useState(null);
  const [nausees, setNausees] = useState(null);
  const [constipation, setConstipation] = useState(null);
  const [diarrhees, setDiarrhees] = useState(null);
  const [aigreursEstomac, setAigreursEstomac] = useState(null);
  const [oedemesMembresInferieurs, setOedemesMembresInferieurs] =
    useState(null);
  const [pesanteurPelvienne, setPesanteurPelvienne] = useState(null);
  const [incontinence, setIncontinence] = useState(null);
  const [tensionMammaire, setTensionMammaire] = useState(null);
  const [mastose, setMastose] = useState(null);

  const urlGrosesse = `http://localhost:5000/api/grossesse/${idGrossesseSelected}`;

  const assign = (data) => {
    if (data) {
      setDateCreation(data.dateCreation);
      setDateUpdate(data.dateUpdate);
      setMaternite(data.maternite);
      setGrossesseMultiple(data.grossesseMultiple);
      setDouleursPendantGrossesse(data.douleursPendantGrossesse);
      setEtatPsychoEmotionnel(data.etatPsychoEmotionnel);
      setTraitementLieGrossesse(data.traitementLieGrossesse);
      setMouvementsBebe(data.mouvementsBebe);
      setCesariennePrevue(data.cesariennePrevue);
      setProjetPeridurale(data.projetPeridurale);
      setProjetAllaitement(data.projetAllaitement);
      setNausees(data.nausees);
      setConstipation(data.constipation);
      setDiarrhees(data.diarrhees);
      setAigreursEstomac(data.aigreursEstomac);
      setOedemesMembresInferieurs(data.oedemesMembresInferieurs);
      setPesanteurPelvienne(data.pesanteurPelvienne);
      setIncontinence(data.incontinence);
      setTensionMammaire(data.tensionMammaire);
      setMastose(data.mastose);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(urlGrosesse, {
          headers: {
            Authorization: "Bearer " + token,
          },
        });
        assign(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    if (idGrossesseSelected) {
      fetchData();
    }
  }, [idGrossesseSelected]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = {
      dateCreation,
      dateUpdate,
      maternite,
      grossesseMultiple,
      douleursPendantGrossesse,
      etatPsychoEmotionnel,
      traitementLieGrossesse,
      mouvementsBebe,
      cesariennePrevue,
      projetPeridurale,
      projetAllaitement,
      nausees,
      constipation,
      diarrhees,
      aigreursEstomac,
      oedemesMembresInferieurs,
      pesanteurPelvienne,
      incontinence,
      tensionMammaire,
      mastose,
    };

    const putData = async () => {
      try {
        const response = await axios.put(urlGrosesse, formData, {
          headers: {
            Authorization: "Bearer " + token,
          },
        });
        assign(response.data);
        Swal.fire("Mise à jour effectuée!");
        setCountGrossesse(countGrossesse + 1);
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    putData();
  };

  const deleteGrossesse = async (id) => {
    Swal.fire({
      title: "Etes vous sûr de vouloir supprimer cette fiche Accouchement ?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Oui",
      denyButtonText: `Non`,
    }).then((result) => {
      if (result.isConfirmed) {
        const deleteData = async () => {
          try {
            const response = await axios.delete(
              `http://localhost:5000/api/grossesse/${id}`,
              {
                headers: {
                  Authorization: "Bearer " + token,
                },
              }
            );
            setCountGrossesse(countGrossesse + 1);
            setDisplayGrossesseDetail(false);
          } catch (error) {
            console.error(error);
          }
        };
        deleteData();
        Swal.fire("Supprimé", "", "success");
      } else if (result.isDenied) {
        Swal.fire("Suppression annulée", "", "info");
      }
    });
  };

  return (
    <div className="col-9 mx-auto">
      <div className="row">
        <div className="col-8 mx-auto">
          <h3 style={{ textAlign: "center", paddingTop: "10px" }}>
            Détail
          </h3>
        </div>
        <div className="col-1">
          <div
            className="btn btn-danger"
            onClick={() => {
              deleteGrossesse(idGrossesseSelected);
            }}
          >
            Supprimer
          </div>
        </div>
      </div>
      <br />
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="dateCreation" className="form-label">
            Date de Création
          </label>
          <input
            type="text"
            className="form-control"
            id="dateCreation"
            value={dateCreation}
            readOnly
          />
        </div>
        <div className="mb-3">
          <label htmlFor="dateUpdate" className="form-label">
            Date de Mise à Jour
          </label>
          <input
            type="text"
            className="form-control"
            id="dateUpdate"
            value={dateUpdate}
            required
            onChange={(e) => setDateUpdate(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="maternite" className="form-label">
            Maternité
          </label>
          <input
            type="text"
            className="form-control"
            id="maternite"
            value={maternite}
            onChange={(e) => setMaternite(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Grossesse Multiple</label>
          <div>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="grossesseMultiple"
                id="grossesseMultipleOui"
                value={true}
                checked={grossesseMultiple === true}
                onChange={() => setGrossesseMultiple(true)}
              />
              <label
                className="form-check-label"
                htmlFor="grossesseMultipleOui"
              >
                Oui
              </label>
            </div>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="grossesseMultiple"
                id="grossesseMultipleNon"
                value={false}
                checked={grossesseMultiple === false}
                onChange={() => setGrossesseMultiple(false)}
              />
              <label
                className="form-check-label"
                htmlFor="grossesseMultipleNon"
              >
                Non
              </label>
            </div>
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="douleursPendantGrossesse" className="form-label">
            Douleurs Pendant la Grossesse
          </label>
          <input
            type="text"
            className="form-control"
            id="douleursPendantGrossesse"
            value={douleursPendantGrossesse}
            onChange={(e) => setDouleursPendantGrossesse(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="etatPsychoEmotionnel" className="form-label">
            État Psycho-Émotionnel
          </label>
          <input
            type="text"
            className="form-control"
            id="etatPsychoEmotionnel"
            value={etatPsychoEmotionnel}
            onChange={(e) => setEtatPsychoEmotionnel(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="traitementLieGrossesse" className="form-label">
            Traitement Lié à la Grossesse
          </label>
          <input
            type="text"
            className="form-control"
            id="traitementLieGrossesse"
            value={traitementLieGrossesse}
            onChange={(e) => setTraitementLieGrossesse(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="mouvementsBebe" className="form-label">
            Mouvements du Bébé
          </label>
          <input
            type="text"
            className="form-control"
            id="mouvementsBebe"
            value={mouvementsBebe}
            onChange={(e) => setMouvementsBebe(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Césarienne Prévue</label>
          <div>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="cesariennePrevue"
                id="cesariennePrevueOui"
                value={true}
                checked={cesariennePrevue === true}
                onChange={() => setCesariennePrevue(true)}
              />
              <label className="form-check-label" htmlFor="cesariennePrevueOui">
                Oui
              </label>
            </div>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="cesariennePrevue"
                id="cesariennePrevueNon"
                value={false}
                checked={cesariennePrevue === false}
                onChange={() => setCesariennePrevue(false)}
              />
              <label className="form-check-label" htmlFor="cesariennePrevueNon">
                Non
              </label>
            </div>
          </div>
        </div>
        <div className="mb-3">
          <label className="form-label">Projet Péridurale</label>
          <div>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="projetPeridurale"
                id="projetPeriduraleOui"
                value={true}
                checked={projetPeridurale === true}
                onChange={() => setProjetPeridurale(true)}
              />
              <label className="form-check-label" htmlFor="projetPeriduraleOui">
                Oui
              </label>
            </div>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="projetPeridurale"
                id="projetPeriduraleNon"
                value={false}
                checked={projetPeridurale === false}
                onChange={() => setProjetPeridurale(false)}
              />
              <label className="form-check-label" htmlFor="projetPeriduraleNon">
                Non
              </label>
            </div>
          </div>
        </div>
        <div className="mb-3">
          <label className="form-label">Projet Allaitement</label>
          <div>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="projetAllaitement"
                id="projetAllaitementOui"
                value={true}
                checked={projetAllaitement === true}
                onChange={() => setProjetAllaitement(true)}
              />
              <label
                className="form-check-label"
                htmlFor="projetAllaitementOui"
              >
                Oui
              </label>
            </div>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="projetAllaitement"
                id="projetAllaitementNon"
                value={false}
                checked={projetAllaitement === false}
                onChange={() => setProjetAllaitement(false)}
              />
              <label
                className="form-check-label"
                htmlFor="projetAllaitementNon"
              >
                Non
              </label>
            </div>
          </div>
        </div>
        <div className="mb-3">
          <label className="form-label">Nausées</label>
          <div>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="nausees"
                id="nauseesOui"
                value={true}
                checked={nausees === true}
                onChange={() => setNausees(true)}
              />
              <label className="form-check-label" htmlFor="nauseesOui">
                Oui
              </label>
            </div>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="nausees"
                id="nauseesNon"
                value={false}
                checked={nausees === false}
                onChange={() => setNausees(false)}
              />
              <label className="form-check-label" htmlFor="nauseesNon">
                Non
              </label>
            </div>
          </div>
        </div>
        <div className="mb-3">
          <label className="form-label">Constipation</label>
          <div>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="constipation"
                id="constipationOui"
                value={true}
                checked={constipation === true}
                onChange={() => setConstipation(true)}
              />
              <label className="form-check-label" htmlFor="constipationOui">
                Oui
              </label>
            </div>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="constipation"
                id="constipationNon"
                value={false}
                checked={constipation === false}
                onChange={() => setConstipation(false)}
              />
              <label className="form-check-label" htmlFor="constipationNon">
                Non
              </label>
            </div>
          </div>
        </div>
        <div className="mb-3">
          <label className="form-label">Diarrhées</label>
          <div>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="diarrhees"
                id="diarrheesOui"
                value={true}
                checked={diarrhees === true}
                onChange={() => setDiarrhees(true)}
              />
              <label className="form-check-label" htmlFor="diarrheesOui">
                Oui
              </label>
            </div>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="diarrhees"
                id="diarrheesNon"
                value={false}
                checked={diarrhees === false}
                onChange={() => setDiarrhees(false)}
              />
              <label className="form-check-label" htmlFor="diarrheesNon">
                Non
              </label>
            </div>
          </div>
        </div>
        <div className="mb-3">
          <label className="form-label">Aigreurs d'Estomac</label>
          <div>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="aigreursEstomac"
                id="aigreursEstomacOui"
                value={true}
                checked={aigreursEstomac === true}
                onChange={() => setAigreursEstomac(true)}
              />
              <label className="form-check-label" htmlFor="aigreursEstomacOui">
                Oui
              </label>
            </div>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="aigreursEstomac"
                id="aigreursEstomacNon"
                value={false}
                checked={aigreursEstomac === false}
                onChange={() => setAigreursEstomac(false)}
              />
              <label className="form-check-label" htmlFor="aigreursEstomacNon">
                Non
              </label>
            </div>
          </div>
        </div>
        <div className="mb-3">
          <label className="form-label">Œdèmes des Membres Inférieurs</label>
          <div>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="oedemesMembresInferieurs"
                id="oedemesMembresInferieursOui"
                value={true}
                checked={oedemesMembresInferieurs === true}
                onChange={() => setOedemesMembresInferieurs(true)}
              />
              <label
                className="form-check-label"
                htmlFor="oedemesMembresInferieursOui"
              >
                Oui
              </label>
            </div>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="oedemesMembresInferieurs"
                id="oedemesMembresInferieursNon"
                value={false}
                checked={oedemesMembresInferieurs === false}
                onChange={() => setOedemesMembresInferieurs(false)}
              />
              <label
                className="form-check-label"
                htmlFor="oedemesMembresInferieursNon"
              >
                Non
              </label>
            </div>
          </div>
        </div>
        <div className="mb-3">
          <label className="form-label">Pesanteur Pelvienne</label>
          <div>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="pesanteurPelvienne"
                id="pesanteurPelvienneOui"
                value={true}
                checked={pesanteurPelvienne === true}
                onChange={() => setPesanteurPelvienne(true)}
              />
              <label
                className="form-check-label"
                htmlFor="pesanteurPelvienneOui"
              >
                Oui
              </label>
            </div>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="pesanteurPelvienne"
                id="pesanteurPelvienneNon"
                value={false}
                checked={pesanteurPelvienne === false}
                onChange={() => setPesanteurPelvienne(false)}
              />
              <label
                className="form-check-label"
                htmlFor="pesanteurPelvienneNon"
              >
                Non
              </label>
            </div>
          </div>
        </div>
        <div className="mb-3">
          <label className="form-label">Incontinence</label>
          <div>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="incontinence"
                id="incontinenceOui"
                value={true}
                checked={incontinence === true}
                onChange={() => setIncontinence(true)}
              />
              <label className="form-check-label" htmlFor="incontinenceOui">
                Oui
              </label>
            </div>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="incontinence"
                id="incontinenceNon"
                value={false}
                checked={incontinence === false}
                onChange={() => setIncontinence(false)}
              />
              <label className="form-check-label" htmlFor="incontinenceNon">
                Non
              </label>
            </div>
          </div>
        </div>
        <div className="mb-3">
          <label className="form-label">Tension Mammaire</label>
          <div>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="tensionMammaire"
                id="tensionMammaireOui"
                value={true}
                checked={tensionMammaire === true}
                onChange={() => setTensionMammaire(true)}
              />
              <label className="form-check-label" htmlFor="tensionMammaireOui">
                Oui
              </label>
            </div>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="tensionMammaire"
                id="tensionMammaireNon"
                value={false}
                checked={tensionMammaire === false}
                onChange={() => setTensionMammaire(false)}
              />
              <label className="form-check-label" htmlFor="tensionMammaireNon">
                Non
              </label>
            </div>
          </div>
        </div>
        <div className="mb-3">
          <label className="form-label">Mastose</label>
          <div>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="mastose"
                id="mastoseOui"
                value={true}
                checked={mastose === true}
                onChange={() => setMastose(true)}
              />
              <label className="form-check-label" htmlFor="mastoseOui">
                Oui
              </label>
            </div>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="mastose"
                id="mastoseNon"
                value={false}
                checked={mastose === false}
                onChange={() => setMastose(false)}
              />
              <label className="form-check-label" htmlFor="mastoseNon">
                Non
              </label>
            </div>
          </div>
        </div>

        <div className="col-3 mx-auto">
          <button type="submit" className="btn btn-secondary">
            Mettre à jour
          </button>
        </div>
      </form>
    </div>
  );
};

export default GrossesseDetail;
