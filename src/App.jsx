import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Patient from "./components/modulePatient/Patient";
import ListPatient from "./components/modulePatient/ListPatient";
import Accueil from "./components/Accueil/Accueil";
import Deconnexion from "./components/module deconnexion/Deconnexion";
import Profil from "./components/module profil/Profil";
import Error from "./components/module erreur/Error";
import Login from "./components/Login/Login";
import { StorageProvider } from "./components/StorageContext";
import PatientForm from "./components/modulePatient/PatientForm";
import ListPraticien from "./components/module Admin/ListPraticien";
import CreatePraticien from "./components/module Admin/CreatePraticien";
import UpdatePraticien from "./components/module Admin/UpdatePraticien";
import ResetPassword from "./components/Login/ResetPassword";
import Forgot from "./components/Login/Forgot";
import Contact from "./components/Contact/Contact";


function App() {
  return (
    <StorageProvider>
      <div className="container p-2" style={{marginLeft:"10%"}}>
        <Router>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/forgot" element={<Forgot />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/" element={<Accueil />} />
            <Route path="/Profil" element={<Profil />} />
            <Route path="/CreateNewPatient" element={<PatientForm />} />
            <Route path="/List" element={<ListPatient />} />
            <Route path="/patient/:id" element={<Patient />} />
            <Route path="/Admin" element={<ListPraticien />} />
            <Route path="/create" element={<CreatePraticien />} />
            <Route path="/update/:id" element={<UpdatePraticien />} />
            <Route path="/Deconnexion" element={<Deconnexion />} />
            <Route path="/error" element={<Error />} />
        
            <Route path="/*" element={<Login />} />       
          </Routes>
        </Router>
      </div>
    </StorageProvider>
  );
}

export default App;
