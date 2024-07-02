import React from "react";
import axios from "axios";
import { useStorage } from "../../../StorageContext";
import { useEffect, useState } from "react";
import AccouchementDetail from "./AccouchementDetail";
import AccouchementNew from "./AccouchementNew";

const Accouchement = ({ idPatient }) => {
  const token = localStorage.getItem("token");
  const accouchementListUrl =
    "http://localhost:5000/api/accouchement/all/" + idPatient;
  const [accouchementList, setAccouchementList] = useState([]);

  const [idAccouchementSelected, setIdAccouchementSelected] = useState(null);

  const {
    setDisplayAccouchement,
    displayAccouchement,
    displayAccouchementDetail,
    setDisplayAccouchementDetail,
    displayAccouchementNew,
    setDisplayAccouchementNew
  } = useStorage();

  useEffect(() => {
    setIdAccouchementSelected(null); // reset si un accouchement avait été selectionné précédemment
    setDisplayAccouchementDetail(false); //reset de l'affichage du menu general Accouchement
    setDisplayAccouchementNew(false); //reset de l'affichage du menu general Accouchement

    //Chargement de la liste d'accouchement déjà enregistré au chargement du composant
    const fetchData = async () => {
      try {
        const response = await axios.get(accouchementListUrl, {
          headers: {
            Authorization: "Bearer " + token,
          },
        });
        setAccouchementList(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  //Fonction pour remettre tous les affichages des composants susceptibles d'être affichés, à false, pour que celui désiré puisse s'afficher
  const resetDisplay = () => {
    setDisplayAccouchement(false);
    setDisplayAccouchementDetail(false);
    setDisplayAccouchementNew(false);
  };

  return (
    <div>
      {displayAccouchement && (
        <div>
          <h3 className="col-4 mx-auto pt-5">Accouchement List :</h3>
          <br />
          <br />
          <br />
          <div className="col-4 mx-auto">
            <div className="list-group">
              {accouchementList &&
                accouchementList.map((acc, index) => (
                  <span
                    key={index}
                    className="list-group-item list-group-item-action"
                    onClick={() => {
                      setIdAccouchementSelected(acc.idAccouchement);
                      resetDisplay();
                      setDisplayAccouchementDetail(true);
                    }}
                  >
                    {acc.dateAccouchement}
                  </span>
                ))}
            </div>
            <br />
            <br />
            <div>
              <div
                className="btn btn-primary"
                onClick={() => {
                  resetDisplay();
                  setDisplayAccouchementNew(true);
                }}
              >
                Creer accouchement
              </div>
            </div>
          </div>
        </div>
      )}
      {idAccouchementSelected && displayAccouchementDetail && ( 
        <div><AccouchementDetail idAccouchementSelected={idAccouchementSelected} /></div>
      )}
      {displayAccouchementNew && <div><AccouchementNew /></div>}
    </div>
  );
};

export default Accouchement;
