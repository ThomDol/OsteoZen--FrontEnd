import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { useStorage } from "../../../StorageContext";
import ConsultationDetail from "./ConsultationDetail";

const Consultation = ({ idPatient }) => {
  const [rendezVousList, setRendezVousList] = useState([]);
  const token = localStorage.getItem("token");
  const [idRendezVousSelected, setIdRendezVousSelected] = useState();
  const [countRendezVous, setCountRendezVous] = useState(0);

  const { displayRendezVousDetail, setDisplayRendezVousDetail } = useStorage();

  const resetDisplay = () => {
    setDisplayRendezVousDetail(false);
  };

  useEffect(() => {
    resetDisplay();
  }, []);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/rendezvous/all/${idPatient}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => setRendezVousList(res.data))
      .catch((error) => console.log(error));
  }, [countRendezVous]);

  const handleCreateClick = () => {
    resetDisplay();
    setIdRendezVousSelected(null);

    // Utilisation d'un timeout pour s'assurer que l'état est mis à jour avant de continuer
    setTimeout(() => {
      setDisplayRendezVousDetail(true);
    }, 10);
  };

  return (
    <div>
      <br />
      <h1 className="text-center">Consultations</h1>
      <hr />
      <div className="row">
        <div className="col-1">
          <div>
            <h5>Liste :</h5>
            <div className="col-2 mx-1">
              {rendezVousList &&
                rendezVousList.map((rendezVous, index) => (
                  <span
                    className="btn text-bg-secondary mt-3"
                    key={index}
                    onClick={() => {
                      resetDisplay();
                      setIdRendezVousSelected(rendezVous.idRendezVous);
                      setDisplayRendezVousDetail(true);
                    }}
                  >
                    {rendezVous.dateRendeVous}
                  </span>
                ))}

              <br />
              <br />
              <div>
                <div className="btn btn-info" onClick={handleCreateClick}>
                  Créer
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-11">
          {displayRendezVousDetail && (
            <div>
              <ConsultationDetail
                idPatient={idPatient}
                idRendezVousSelected={idRendezVousSelected}
                countRendezVous={countRendezVous}
                setCountRendezVous={setCountRendezVous}
                setDisplayRendezVousDetail={setDisplayRendezVousDetail}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Consultation;
