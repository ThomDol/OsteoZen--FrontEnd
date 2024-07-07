import React from "react";
import axios from "axios";
import { useStorage } from "../../../StorageContext";
import { useEffect, useState } from "react";
import GrossesseNew from "./GrossesseNew";
import GrossesseDetail from "./GrossesseDetail";

const Grossesse = ({ idPatient }) => {
  const token = localStorage.getItem("token");
  const grossesseListUrl =
    "http://localhost:5000/api/grossesse/all/" + idPatient;
  const [grossesseList, setGrossesseList] = useState([]);

  const [idGrossesseSelected, setIdGrossesseSelected] = useState("");
  const [countGrossesse, setCountGrossesse] = useState(0);

  const {
    displayGrossesse,
    displayGrossesseNew,
    setDisplayGrossesseNew,
    displayGrossesseDetail,
    setDisplayGrossesseDetail,
  } = useStorage();

  useEffect(() => {
    setIdGrossesseSelected(null); // reset si une grossesse avait été selectionnée précédemment
    resetDisplay(); //reset de l'affichage du menu general Accouchement

    //Chargement de la liste de grossesse déjà enregistrées au chargement du composant
    const fetchData = async () => {
      try {
        const response = await axios.get(grossesseListUrl, {
          headers: {
            Authorization: "Bearer " + token,
          },
        });
        setGrossesseList(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [countGrossesse]);

  //Fonction pour remettre tous les affichages des composants susceptibles d'être affichés, à false, pour que celui désiré puisse s'afficher
  const resetDisplay = () => {
    setDisplayGrossesseDetail(false);
    setDisplayGrossesseNew(false);
  };

  return (
    <div>
      <br />
      <h1 className="text-center">Grossesse</h1>
      <hr />
      <div className="row">
        <div className="col-1">
          {displayGrossesse && (
            <div>
              <h5>Liste :</h5>
              <br />
              <div className="col-2 mx-1">
                {grossesseList &&
                  grossesseList.map((grossesse, index) => (
                    <span
                      className="btn text-bg-secondary mt-3"
                      key={index}
                      onClick={() => {
                        resetDisplay();
                        setIdGrossesseSelected(null);
                        setIdGrossesseSelected(grossesse.idGrossesse);
                        setDisplayGrossesseDetail(true);
                      }}
                    >
                      {grossesse.dateCreation}
                    </span>
                  ))}

                <br />
                <br />
                <div>
                  <div
                    className="btn btn-info"
                    onClick={() => {
                      setIdGrossesseSelected(null);
                      setDisplayGrossesseDetail(false);
                      setDisplayGrossesseNew(true);
                    }}
                  >
                    Créer
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="col-11">
          {displayGrossesseDetail && idGrossesseSelected && (
            <div>
              <GrossesseDetail
                idGrossesseSelected={idGrossesseSelected}
                countGrossesse={countGrossesse}
                setCountGrossesse={setCountGrossesse}
                setDisplayGrossesseDetail={setDisplayGrossesseDetail}
              />
            </div>
          )}
          {displayGrossesseNew && (
            <div>
              <GrossesseNew
                idPatient={idPatient}
                countGrossesse={countGrossesse}
                setCountGrossesse={setCountGrossesse}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Grossesse;
