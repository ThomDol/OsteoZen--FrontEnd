import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { useStorage } from "../../../StorageContext";
import PhysiqueNew from "./PhysiqueNew";

const Physique = ({ idPatient }) => {
  const [physiques, setPhysiques] = useState([]);
  const token = localStorage.getItem("token");
  const [idPhysiqueSelected, setIdPhysiqueSelected] = useState();
  const [countMesure, setCountMesure] = useState(0);

  const {
    displayCaracteristiquesPhysiquesDetail,
    setDisplayCaracteristiquesPhysiquesDetail,
    displayCaracteristiquesPhysiques,
  } = useStorage();

  const resetDisplay = () => {
    
    setDisplayCaracteristiquesPhysiquesDetail(false);
  };

  useEffect(()=>{
    resetDisplay();
  },[])

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/physique/all/${idPatient}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => setPhysiques(res.data))
      .catch((error) => console.log(error));
  }, [countMesure]);

  const handleCreateClick = () => {
    resetDisplay();
    setIdPhysiqueSelected(null);
  
    // Utilisation d'un timeout pour s'assurer que l'état est mis à jour avant de continuer
    setTimeout(() => {
      setDisplayCaracteristiquesPhysiquesDetail(true);
    }, 0);
  };

  return (
    <div>
      <br />
      <h1 className="text-center">Caractéristiques Physiques</h1>
      <hr />
      <div className="row">
        <div className="col-1">
          {displayCaracteristiquesPhysiques && (
            <div>
              <h5>Liste :</h5>
              <div className="col-2 mx-1">
                {physiques &&
                  physiques.map((physique, index) => (
                    <span
                      className="badge text-bg-secondary"
                      key={index}
                      onClick={() => {
                        resetDisplay();
                        setIdPhysiqueSelected(physique.idPhysique);
                        setDisplayCaracteristiquesPhysiquesDetail(true);
                      }}
                    >
                      {physique.dateMesure}
                    </span>
                  ))}

                <br />
                <br />
                <div>
                  <div
                    className="btn btn-info"
                    onClick={handleCreateClick}
                  >
                    Créer
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="col-11">
      
          {displayCaracteristiquesPhysiquesDetail && (
            <div>
              <PhysiqueNew
                idPatient={idPatient}
                idPhysiqueSelected={idPhysiqueSelected}
                countMesure={countMesure}
                setCountMesure={setCountMesure}
                setDisplayCaracteristiquesPhysiquesDetail ={setDisplayCaracteristiquesPhysiquesDetail }
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Physique;
