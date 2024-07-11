import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const ConsultationDetail = ({
  idPatient,
  idRendezVousSelected,
  countRendezVous,
  setCountRendezVous,
  setDisplayRendezVousDetail,
}) => {
  const token = localStorage.getItem("token");
  const [dateRendeVous, setDateRendeVous] = useState("");
  const [syntheseRendezVous, setSyntheseRendezVous] = useState("");
  const [rendezVousSelected, setRendezVousSelected] = useState(null);

  const formData = {
    dateRendeVous,
    syntheseRendezVous,
  };

  const assign = (elem) => {
    if (elem !== null) {
      setDateRendeVous(elem.dateRendeVous);
      setSyntheseRendezVous(elem.syntheseRendezVous || "");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      if (idRendezVousSelected) {
        try {
          const response = await axios.get(
            `http://localhost:5000/api/rendezvous/${idRendezVousSelected}`,
            {
              headers: {
                Authorization: "Bearer " + token,
              },
            }
          );
          setRendezVousSelected(response.data);
          assign(response.data);
        } catch (error) {
          console.error(error);
        }
      }
    };
    fetchData();
  }, [idRendezVousSelected]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (rendezVousSelected) {
      axios
        .put(
          `http://localhost:5000/api/rendezvous/${idRendezVousSelected}`,
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
          setCountRendezVous(countRendezVous + 1);
        })
        .catch((error) => console.log(error));
    } else {
      axios
        .post(`http://localhost:5000/api/rendezvous/${idPatient}`, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          Swal.fire("Création faite");
          console.log(res.data);
          setCountRendezVous(countRendezVous + 1);
        })
        .catch((error) => console.log(error));
    }
  };

  const deleteRendezVous = () => {
    Swal.fire({
      title: "Etes vous sûr de vouloir supprimer ce rendez-vous ?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Oui",
      denyButtonText: `Non`,
    }).then((result) => {
      if (result.isConfirmed) {
        const deleteData = async () => {
          try {
            const response = await axios.delete(
              `http://localhost:5000/api/rendezvous/${idRendezVousSelected}`,
              {
                headers: {
                  Authorization: "Bearer " + token,
                },
              }
            );
            setCountRendezVous(countRendezVous + 1);
            setDisplayRendezVousDetail(false);
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
  };

  return (
    <div className="col-9 mx-auto">
      <div className="row">
        <div className="col-8 mx-auto">
          <h3 style={{ textAlign: "center", paddingTop: "10px" }}>
            {idRendezVousSelected ? "DETAIL RENDEZ-VOUS" : "Créer"}
          </h3>
        </div>
        <div className="col-1">
          {idRendezVousSelected && (
            <div className="btn btn-danger" onClick={deleteRendezVous}>
              Supprimer
            </div>
          )}
        </div>
      </div>
      <br />
      <br />
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Date Rendez-Vous: </label>
          <input
            type="text"
            placeholder="jj/mm/aaaa"
            pattern="\d{2}/\d{2}/\d{4}"
            name="dateRendeVous"
            value={dateRendeVous}
            onChange={(e) => setDateRendeVous(e.target.value)}
            required
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label>Synthèse Rendez-Vous: </label>
          <textarea
            name="syntheseRendezVous"
            value={syntheseRendezVous}
            onChange={(e) => setSyntheseRendezVous(e.target.value)}
            className="form-control"
          />
        </div>
        <button type="submit" className="btn btn-secondary">
          {rendezVousSelected ? "Mettre à jour" : "Créer"}
        </button>
      </form>
    </div>
  );
};

export default ConsultationDetail;
