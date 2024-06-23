import React from "react";
import axios from "axios";
import { useStorage } from "../../StorageContext";
import { useEffect, useState } from "react";

const Accouchement = ({ idPatient }) => {
  const accouchementListUrl =
    "http://localhost:5000/api/accouchement/patient/" + idPatient;
  const [accouchementList, setAccouchementList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(accouchementListUrl);
        setAccouchementList(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h3 className="col-4 mx-auto pt-5">Accouchement List :</h3>
      <br />
      <br />
      <br />
      <div className="col-4 mx-auto">
        <div className="list-group">
          {accouchementList &&
            accouchementList.map((acc, index) => (
              <a
                href="#"
                key={index}
                className="list-group-item list-group-item-action"
              >
                {acc.dateAccouchement}
              </a>
            ))}
        </div>
        <br />
        <br />
        <div>
          <div className="btn btn-primary">Creer accouchement</div>
        </div>
      </div>
    </div>
  );
};

export default Accouchement;
