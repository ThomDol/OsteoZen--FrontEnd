import React, { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import Swal from "sweetalert2";

const PhysiqueNew = ({ idPatient,idPhysiqueSelected, countMesure, setCountMesure,setDisplayCaracteristiquesPhysiquesDetail  }) => {
  const token = localStorage.getItem("token");
  const [dateMesure, setDateMesure] = useState("");
  const [taille, setTaille] = useState("");
  const [poids, setPoids] = useState("");
  const [lunettes, setlunettes] = useState("");
  const [dentaire, setdentaire] = useState("");
  const [droitier, setdroitier] = useState("");
  const [mesureSelected,setMesureSelected]=useState(null);

  const formData = {
    dateMesure,
    taille,
    poids,
    lunettes,
    dentaire,
    droitier,
  };

  const assign = (elem) => {
    if (elem !== null) {
        setDateMesure(elem.dateMesure);
        setPoids(elem.poids || "");
        setTaille(elem.taille || "");
        setdentaire(elem.dentaire || null );
        setdroitier(elem.droitier || null);
        setlunettes(elem.lunettes || null);
    }
  };



  useEffect(() => {
    
    const fetchData = async () => {
      if (idPhysiqueSelected) {
        try {
          const response = await axios.get(`http://localhost:5000/api/physique/${idPhysiqueSelected}`, {
            headers: {
              Authorization: "Bearer " + token,
            },
          });
          setMesureSelected(response.data);
          assign(response.data);
        } catch (error) {
          console.error(error);
        }
      }
    };
    fetchData();
  }, [idPhysiqueSelected]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if(mesureSelected){
        axios
        .put(`http://localhost:5000/api/physique/${idPatient}`, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          console.log(res.data);
          setCountMesure(countMesure + 1);
        })
        .catch((error) => console.log(error));
    }
    else{
    axios
      .post(`http://localhost:5000/api/physique/${idPatient}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        setCountMesure(countMesure + 1);
      })
      .catch((error) => console.log(error));
  }};

  const deleteMesure = ()=>{
    Swal.fire({
      title: "Etes vous sûr de vouloir supprimer cette fiche Mesure ?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Oui",
      denyButtonText: `Non`,
    }).then((result) => {
      if (result.isConfirmed) {
        const deleteData = async () => {
          try {
            const response = await axios.delete(
              `http://localhost:5000/api/physique/${idPhysiqueSelected}`,
              {
                headers: {
                  Authorization: "Bearer " + token,
                },
              }
            );
            setCountMesure(countMesure + 1);
            setDisplayCaracteristiquesPhysiquesDetail(false);
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
  }

  return (
     <div className="col-9 mx-auto">
      <div className="row">
      <div className="col-8 mx-auto">
      <h3 style={{ textAlign: "center", paddingTop: "10px" }}>Créer</h3>
      </div>
      <div className="col-1">
          <div
            className="btn btn-danger"
            onClick={() => {
              deleteMesure(idPhysiqueSelected);
            }}
          >
            Supprimer
          </div>
        </div>
        </div>
      <br />
      <br />
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Date Mesure: </label>
          <input
            type="text"
            placeholder="jj/mm/aaaa"
            pattern="\d{2}/\d{2}/\d{4}"
            name="dateMesure"
            value={dateMesure}
            onChange={(e) => setDateMesure(e.target.value)}
            required
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label>Poids: </label>
          <input
            type="number"
            name="poids"
            value={poids}
            onChange={(e) => setPoids(e.target.value)}
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label>Taille: </label>
          <input
            type="number"
            name="taille"
            value={taille}
            onChange={(e) => setTaille(e.target.value)}
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Droitier</label>
          <div>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="droitier"
                id="droitierOui"
                value={true}
                checked={droitier === true}
                onChange={(e) => setdroitier(true)}
              />
              <label className="form-check-label" htmlFor="droitierOui">
                Oui
              </label>
            </div>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="droitier"
                id="droitierNon"
                value={false}
                checked={droitier === false}
                onChange={(e) => setdroitier(false)}
              />
              <label className="form-check-label" htmlFor="droitierNon">
                Non
              </label>
            </div>
          </div>
        </div>
        <div className="mb-3">
          <label className="form-label">Lunettes</label>
          <div>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="lunettes"
                id="lunettesOui"
                value={true}
                checked={lunettes === true}
                onChange={(e) => setlunettes(true)}
              />
              <label className="form-check-label" htmlFor="lunettesOui">
                Oui
              </label>
            </div>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="lunettes"
                id="lunettesNon"
                value={false}
                checked={lunettes === false}
                onChange={(e) => setlunettes(false)}
              />
              <label className="form-check-label" htmlFor="lunettesNon">
                Non
              </label>
            </div>
          </div>
        </div>
        <div className="mb-3">
          <label className="form-label">Appareil dentaire</label>
          <div>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="dentaire"
                id="dentaireOui"
                value={true}
                checked={dentaire === true}
                onChange={(e) => setdentaire(true)}
              />
              <label className="form-check-label" htmlFor="dentaireOui">
                Oui
              </label>
            </div>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="dentaire"
                id="dentaireNon"
                value={false}
                checked={dentaire === false}
                onChange={(e) => setdentaire(false)}
              />
              <label className="form-check-label" htmlFor="dentaireNon">
                Non
              </label>
            </div>
          </div>
        </div>

        <button type="submit" className="btn btn-secondary">
          {mesureSelected ? "Mettre à jour" : "Créer"}
        </button>
      </form>
    </div> 
  );
};

export default PhysiqueNew;
