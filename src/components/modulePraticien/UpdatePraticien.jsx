import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import NavBar from "../header/NavBar";

function UpdatePraticien() {
  const token = localStorage.getItem("token");
  const { id } = useParams();
  const [values, setValues] = useState({
    password: "",
    nomRole: "",
    nomVille: "",
    codePostal: "",
    numAdeli: "",
    numSiret: "",
    nomPraticienConnecte: "",
    prenomPraticienConnecte: "",
    email: "",
    tel: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/praticien/${parseInt(id)}`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        setValues(res.data);
      })
      .catch((error) => console.log(error));
  }, []);

  const handleUpdate = (event) => {
    event.preventDefault();
    axios
      .put(`http://localhost:5000/api/praticien/${id}`, values, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        console.log(res);
        navigate("/Admin");
      })
      .catch((error) => console.log(error));
  };

  return (
    <div>
      <div>
        <NavBar />
      </div>
      <br />
      <div className="d-flex w-100 vh-100 justify-content-center align-items-center">
        <div className="w-50 border bg-white shadow px-5 pt-3 pb-5 rounded">
          <div className="col-10 mx-auto">
            <h1>Modifier le Praticien</h1>
          </div>
          <br />
          <br />
          <form onSubmit={handleUpdate}>
            <div className="mb-2">
              <label htmlFor="nom praticien"> Nom</label>
              <input
                type="text"
                name="nom praticien"
                className="form-control"
                value={values.nomAppUser}
                onChange={(e) =>
                  setValues({ ...values, nomAppUser: e.target.value })
                }
              />
            </div>
            <div className="mb-2">
              <label htmlFor="prenom"> Prénom</label>
              <input
                type="text"
                name="prenom"
                className="form-control"
                value={values.prenomAppUser}
                onChange={(e) =>
                  setValues({
                    ...values,
                    prenomAppUser: e.target.value,
                  })
                }
              />
            </div>
            <div className="mb-2">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                className="form-control"
                value={values.email}
                onChange={(e) =>
                  setValues({ ...values, email: e.target.value })
                }
              />
            </div>
            <div className="mb-2">
              <label htmlFor="tel">Tél</label>
              <input
                type="tel"
                name="tel"
                className="form-control"
                value={values.tel}
                onChange={(e) => setValues({ ...values, tel: e.target.value })}
              />

              <div className="mb-2">
                <label htmlFor="Ville ">Ville </label>
                <input
                  type="ville"
                  name="ville"
                  className="form-control"
                  value={values.nomVille}
                  onChange={(e) =>
                    setValues({ ...values, nomVille: e.target.value })
                  }
                />
              </div>
              <div className="mb-2">
                <label htmlFor="code Postal">Code Postal</label>
                <input
                  type="text"
                  name="code postal"
                  className="form-control"
                  value={values.codePostal}
                  onChange={(e) =>
                    setValues({ ...values, codePostal: e.target.value })
                  }
                />
              </div>
              <div className="mb-2">
                <label htmlFor="numAdeli">Numéro Adeli</label>
                <input
                  type="text"
                  name="numAdeli"
                  className="form-control"
                  value={values.numAdeli}
                  onChange={(e) =>
                    setValues({ ...values, numAdeli: e.target.value })
                  }
                />
              </div>
            </div>
            <br />
            <button className="btn btn-success">Update</button>
            <Link to="/Admin" className="btn btn-primary ms-3">
              Back
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}

export default UpdatePraticien;
