import React from "react";
import AntecedentBebe from "./AntecedentBebe";
import AntecedentBebeForm from "./AntecedentBebeForm";
import { useState, useEffect } from "react";
import axios from "axios";

const AntecedentBebeAccueil = ({ idPatient }) => {
  const token = localStorage.getItem("token");
  const [antecedentBebeRes, setAntecedentBebeRes] = useState();
  const [displayAntecedentBebeForm, setDisplayAntecedentBebeForm] = useState(false);

  useEffect(() => {
    const fetchAntecedent = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/antecedentbebe/${idPatient}`,
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        );

        const data = response.data;
        setAntecedentBebeRes(data);
        if (!data) {
          setDisplayAntecedentBebeForm(true);
        } else {
          setDisplayAntecedentBebeForm(false);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchAntecedent();
  }, [idPatient, token]);

  return (
    <div>
      {antecedentBebeRes && (
        <AntecedentBebe
          idAntecedentBebe={antecedentBebeRes.idAntecedentBebe}
          idPatient={idPatient}
        />
      )}
      {displayAntecedentBebeForm && (
        <AntecedentBebeForm idPatient={idPatient} />
      )}
    </div>
  );
};

export default AntecedentBebeAccueil;
