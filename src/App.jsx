
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ListPatient from "./components/modulePatient/ListPatient";
import Accueil from "./components/Accueil/Accueil";
import Patient from "./components/modulePatient/Patient";
import { StorageProvider } from "./components/StorageContext";


function App() {
  return (
    <StorageProvider>
    <div className="container p-2">
      <Router>
        <Routes>
        <Route path="/" element={<Accueil />}/>
        <Route path="/List" element={<ListPatient />} />
        <Route path="/patient/:id" element={<Patient />} />
        </Routes>
      </Router>
    </div>
    </StorageProvider>
  );
}

export default App;

