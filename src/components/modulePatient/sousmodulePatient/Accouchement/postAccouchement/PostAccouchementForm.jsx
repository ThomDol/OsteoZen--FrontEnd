import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const PostAccouchementForm = ({
  idAccouchementSelected,
  idPostAccouchementSelected,
  countPostAccouchement,
  setCountPostAccouchement,
}) => {
  const token = localStorage.getItem("token");
  const [dateCreation, setDateCreation] = useState("");
  const [dateUpdate, setDateUpdate] = useState("");
  const [qualiteSommeil, setQualiteSommeil] = useState("");
  const [instabiliteVesicale, setInstabiliteVesicale] = useState("");
  const [ecoulementsVaginaux, setEcoulementsVaginaux] = useState("");
  const [retourDeCouche, setRetourDeCouche] = useState(null);
  const [douleurAbdominales, setDouleurAbdominales] = useState(null);
  const [fievre, setFievre] = useState(null);
  const [infosComplementaires, setInfosComplementaires] = useState("");
  const [dataPostAccouchement, setDataPostAccouchement] = useState(null);

  const formData = {
    dateCreation,
    dateUpdate,
    qualiteSommeil,
    instabiliteVesicale,
    ecoulementsVaginaux,
    retourDeCouche,
    douleurAbdominales,
    fievre,
    infosComplementaires,
  };

  const assign = (elem) => {
    if (elem !== null) {
      setDateCreation(elem.dateCreation);
      setDateUpdate(elem.dateUpdate || "");
      setQualiteSommeil(elem.qualiteSommeil || "");
      setInstabiliteVesicale(elem.instabiliteVesicale || "");
      setEcoulementsVaginaux(elem.ecoulementsVaginaux || "");
      setRetourDeCouche(elem.retourDeCouche || null);
      setDouleurAbdominales(elem.douleurAbdominales || null);
      setFievre(elem.fievre || null);
      setInfosComplementaires(elem.infosComplementaires || "");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      if (idPostAccouchementSelected) {
        try {
          const response = await axios.get(
            `http://localhost:5000/api/postaccouchement/${idPostAccouchementSelected}`,
            {
              headers: {
                Authorization: "Bearer " + token,
              },
            }
          );
          setDataPostAccouchement(response.data);
          assign(response.data);
        } catch (error) {
          console.error(error);
        }
      }
    };
    fetchData();
  }, [idPostAccouchementSelected]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (dataPostAccouchement) {
      axios
        .put(
          `http://localhost:5000/api/postaccouchement/${idPostAccouchementSelected}`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((res) => {
          Swal.fire("Mise à jour effectuée");
          console.log(res.data);
        })
        .catch((error) => console.log(error));
    } else {
      axios
        .post(
          `http://localhost:5000/api/postaccouchement/${idAccouchementSelected}`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((res) => {
          Swal.fire("Création faite");
          setCountPostAccouchement(countPostAccouchement + 1);
          console.log(res.data);
        })
        .catch((error) => console.log(error));
    }
  };

  const deletePostAcc = () => {
    Swal.fire({
      title:
        "Etes vous sûr de vouloir supprimer cette fiche PostAccouchement ?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Oui",
      denyButtonText: `Non`,
    }).then((result) => {
      if (result.isConfirmed) {
        const deleteData = async () => {
          try {
            const response = await axios.delete(
              `http://localhost:5000/api/postaccouchement/${idPostAccouchementSelected}`,
              {
                headers: {
                  Authorization: "Bearer " + token,
                },
              }
            );

          } catch (error) {
            console.error(error);
          }
          setCountPostAccouchement(countPostAccouchement+1);
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
            {idPostAccouchementSelected
              ? "DETAIL FICHE POSTPARTUM"
              : "CREER FICHE POSTPARTUM"}
          </h3>
        </div>
        <div className="col-1">
          {idPostAccouchementSelected && (
            <div
              className="btn btn-danger"
              onClick={() => {
                deletePostAcc(idPostAccouchementSelected);
              }}
            >
              Supprimer
            </div>
          )}
        </div>
      </div>
      <br />
      <br />
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Date Création: </label>
          <input
            type="text"
            placeholder="jj/mm/aaaa"
            pattern="\d{2}/\d{2}/\d{4}"
            name="dateCreation"
            value={dateCreation}
            onChange={(e) => setDateCreation(e.target.value)}
            required
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label>Date Mise à jour: </label>
          <input
            type="text"
            placeholder="jj/mm/aaaa"
            pattern="\d{2}/\d{2}/\d{4}"
            name="dateUpdate"
            value={dateUpdate}
            onChange={(e) => setDateUpdate(e.target.value)}
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label>Qualité du Sommeil: </label>
          <input
            type="text"
            name="qualiteSommeil"
            value={qualiteSommeil}
            onChange={(e) => setQualiteSommeil(e.target.value)}
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label>Instabilité Vésicale: </label>
          <input
            type="text"
            name="instabiliteVesicale"
            value={instabiliteVesicale}
            onChange={(e) => setInstabiliteVesicale(e.target.value)}
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label>Écoulements Vaginalaux: </label>
          <input
            type="text"
            name="ecoulementsVaginaux"
            value={ecoulementsVaginaux}
            onChange={(e) => setEcoulementsVaginaux(e.target.value)}
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Retour de Couches</label>
          <div>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="retourDeCouche"
                id="retourDeCoucheOui"
                value={true}
                checked={retourDeCouche === true}
                onChange={(e) => setRetourDeCouche(true)}
              />
              <label className="form-check-label" htmlFor="retourDeCoucheOui">
                Oui
              </label>
            </div>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="retourDeCouche"
                id="retourDeCoucheNon"
                value={false}
                checked={retourDeCouche === false}
                onChange={(e) => setRetourDeCouche(false)}
              />
              <label className="form-check-label" htmlFor="retourDeCoucheNon">
                Non
              </label>
            </div>
          </div>
        </div>
        <div className="mb-3">
          <label className="form-label">Douleurs Abdominales</label>
          <div>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="douleurAbdominales"
                id="douleurAbdominalesOui"
                value={true}
                checked={douleurAbdominales === true}
                onChange={(e) => setDouleurAbdominales(true)}
              />
              <label
                className="form-check-label"
                htmlFor="douleurAbdominalesOui"
              >
                Oui
              </label>
            </div>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="douleurAbdominales"
                id="douleurAbdominalesNon"
                value={false}
                checked={douleurAbdominales === false}
                onChange={(e) => setDouleurAbdominales(false)}
              />
              <label
                className="form-check-label"
                htmlFor="douleurAbdominalesNon"
              >
                Non
              </label>
            </div>
          </div>
        </div>
        <div className="mb-3">
          <label className="form-label">Fièvre</label>
          <div>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="fievre"
                id="fievreOui"
                value={true}
                checked={fievre === true}
                onChange={(e) => setFievre(true)}
              />
              <label className="form-check-label" htmlFor="fievreOui">
                Oui
              </label>
            </div>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="fievre"
                id="fievreNon"
                value={false}
                checked={fievre === false}
                onChange={(e) => setFievre(false)}
              />
              <label className="form-check-label" htmlFor="fievreNon">
                Non
              </label>
            </div>
          </div>
        </div>
        <div className="mb-3">
          <label>Infos Complémentaires: </label>
          <textarea
            name="infosComplementaires"
            value={infosComplementaires}
            onChange={(e) => setInfosComplementaires(e.target.value)}
            className="form-control"
          />
        </div>
        <button type="submit" className="btn btn-secondary">
          {dataPostAccouchement ? "Mettre à jour" : "Créer"}
        </button>
      </form>
    </div>
  );
};

export default PostAccouchementForm;
