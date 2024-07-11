import React from "react";
import axios from "axios";
import { useStorage } from "../../../StorageContext";
import { useEffect, useState } from "react";
import PostAccouchementForm from "./postAccouchement/PostAccouchementForm";
import AccouchementDetail from "./AccouchementDetail";
import AccouchementNew from "./AccouchementNew";

const Accouchement = ({ idPatient }) => {
  const token = localStorage.getItem("token");
  const accouchementListUrl =
    "http://localhost:5000/api/accouchement/all/" + idPatient;

  const [accouchementList, setAccouchementList] = useState([]);

  const [idAccouchementSelected, setIdAccouchementSelected] = useState("");
  const [countAccouchement, setCountAccouchement] = useState(0);
  const [idPostAccouchementSelected, setIdPostAccouchementSelected] =
    useState("");
  const [countPostAccouchement, setCountPostAccouchement] = useState(0);

  const {
    displayAccouchement,
    displayAccouchementDetail,
    setDisplayAccouchementDetail,
    displayAccouchementNew,
    setDisplayAccouchementNew,
    displayPostPartum,
    setDisplayPostPartum,
  } = useStorage();

  useEffect(() => {
    setIdAccouchementSelected(null); // reset si un accouchement avait été selectionné précédemment
    resetDisplay(); //reset de l'affichage du menu general Accouchement

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
  }, [countAccouchement, countPostAccouchement]);

  const createPostAcc = (id) => {};

  //Fonction pour remettre tous les affichages des composants susceptibles d'être affichés, à false, pour que celui désiré puisse s'afficher
  const resetDisplay = () => {
    setDisplayAccouchementDetail(false);
    setDisplayAccouchementNew(false);
    setDisplayPostPartum(false);
  };

  return (
    <div>
      <br />
      <h1 className="text-center">Accouchement</h1>
      <hr />
      <div className="row">
        <div className="col-1">
          {displayAccouchement && (
            <div>
              <h5>Liste :</h5>
              <br />
              <div className="col-2 mx-1">
                {accouchementList &&
                  accouchementList.map((acc, index) => (
                    <div>
                      <span
                        className="btn text-bg-secondary mt-3"
                        key={index}
                        onClick={() => {
                          resetDisplay();
                          setIdAccouchementSelected(acc.idAccouchement);
                          setDisplayAccouchementDetail(true);
                        }}
                      >
                        {acc.dateAccouchement}
                      </span>
                      {acc.idPostAccouchement ? (
                        <span
                          key={`detail-${acc.idPostAccouchement}`}
                          className="badge text-bg-warning"
                          onClick={() => {
                            resetDisplay();
                            setIdPostAccouchementSelected(
                              acc.idPostAccouchement
                            );
                            setTimeout(() => {
                              setDisplayPostPartum(true);
                            }, 10);
                          }}
                        >
                          Détail fiche PostPartum
                        </span>
                      ) : (
                        <span
                          key={`create-${acc.idPostAccouchement}`}
                          className="badge text-bg-warning"
                          onClick={() => {
                            setIdPostAccouchementSelected(null);
                            resetDisplay();
                            setIdAccouchementSelected(acc.idAccouchement);
                            setTimeout(() => {
                              setDisplayPostPartum(true);
                            }, 10);
                          }}
                        >
                          Créer fiche Postpartum
                        </span>
                      )}
                    </div>
                  ))}

                <br />
                <br />
                <div>
                  <div
                    className="btn btn-info"
                    onClick={() => {
                      setIdAccouchementSelected(null);
                      resetDisplay();
                      setDisplayAccouchementNew(true);
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
          {displayAccouchementDetail && idAccouchementSelected && (
            <div>
              <AccouchementDetail
                idAccouchementSelected={idAccouchementSelected}
                countAccouchement={countAccouchement}
                setCountAccouchement={setCountAccouchement}
                setDisplayAccouchementDetail={setDisplayAccouchementDetail}
              />
            </div>
          )}
          {displayAccouchementNew && (
            <div>
              <AccouchementNew
                idPatient={idPatient}
                countAccouchement={countAccouchement}
                setCountAccouchement={setCountAccouchement}
              />
            </div>
          )}
          {displayPostPartum && idPostAccouchementSelected && (
            <div>
              <PostAccouchementForm
                idPostAccouchementSelected={idPostAccouchementSelected}
                setCountPostAccouchement={setCountPostAccouchement}
                countPostAccouchement={countPostAccouchement}
              />
            </div>
          )}
          {displayPostPartum &&
            idAccouchementSelected &&
            idPostAccouchementSelected===null && (
              <PostAccouchementForm
                idAccouchementSelected={idAccouchementSelected}
                setCountPostAccouchement={setCountPostAccouchement}
                countPostAccouchement={countPostAccouchement}
              />
            )}
        </div>
      </div>
    </div>
  );
};

export default Accouchement;
