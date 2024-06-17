
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ListPatient from "./components/modulePatient/ListPatient";
import Patient from "./components/modulePatient/Patient";


function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/patients/:id" element={<ListPatient />} />
          <Route path="/patient/:id" element={<Patient />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

