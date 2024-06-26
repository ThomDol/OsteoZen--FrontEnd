import React from "react";
import Antecedent from "./Antecedent";
import AntecedentForm from "./AntecedentForm";
import { useState, useEffect } from "react";
import axios from "axios";

const AntecedentAccueil = ({ idPatient }) => {
  const token = localStorage.getItem("token");
  const [antecedentRes, setAntecedentRes] = useState();
  const [displayAntecedentForm, setDisplayAntecedentForm] = useState(false);

  useEffect(() => {
    const fetchAntecedent = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/antecedent/${idPatient}`,
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        );

        const data = response.data;
        setAntecedentRes(data);
        if (!data) {
          setDisplayAntecedentForm(true);
        } else {
          setDisplayAntecedentForm(false);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchAntecedent();
  }, []);

  return (
    <div>
      {antecedentRes && (
        <Antecedent
          idAntecedent={antecedentRes.idAntecedentClassique}
          idPatient={idPatient}
        />
      )}
      {displayAntecedentForm && <AntecedentForm idPatient={idPatient} />}
    </div>
  );
};

export default AntecedentAccueil;
