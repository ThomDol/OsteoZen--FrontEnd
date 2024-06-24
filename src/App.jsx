
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ListPatient from "./components/modulePatient/ListPatient";
import Accueil from "./components/Accueil/Accueil";
import Deconnexion from "./components/module deconnexion/Deconnexion";
import Patient from "./components/modulePatient/Patient";
import Login from "./components/Login/Login";
import { StorageProvider } from "./components/StorageContext";
import ListePraticienComponent from "./components/modulePraticien/ListePraticienComponent";
import PraticienComponent from "./components/modulePraticien/PraticienComponent";


function App() {
  return (
    <StorageProvider>
    <div className="container p-2">
      <Router>
        <Routes>
        <Route path='/login' element={<Login/>}/>
        <Route path="/" element={<Accueil />}/>
        <Route path="/List" element={<ListPatient />} />
        <Route path="/patient/:id" element={<Patient />} />
        <Route path="/Deconnexion" element={<Deconnexion />} />
        <Route path="/Admin" element={<ListePraticienComponent/>}></Route>
        <Route path="/ajouter-praticien" element={<PraticienComponent/>}> </Route>
        <Route path="/modifier-praticien" element={<PraticienComponent/>}></Route>

        </Routes>
      </Router>
    </div>
    </StorageProvider>
  );
}

export default App;

