import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import IndexPage from "./pages/IndexPage";
import { useState, useEffect } from "react";
import mainContext from "./context/mainContext";

function App() {
  const [allCompanys, setAllCompanys] = useState([]);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [inputBoxesVlaue, setInputBoxesValue] = useState(null);

  const state = {
    allCompanys,
    setAllCompanys,
    selectedCompany,
    setSelectedCompany,
    inputBoxesVlaue,
    setInputBoxesValue,
  };

  // cheking localStorage for JSON data file
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("shipments"));
    if (!data) {
      alert("No data in Local Storage, please load a set over the network");
    } else {
      setAllCompanys(data);
    }
  }, []);

  return (
    <mainContext.Provider value={state}>
      <div style={{ height: "100vh" }}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<IndexPage />} />
            <Route path="/:id" element={<IndexPage />} />
          </Routes>
        </BrowserRouter>
      </div>
    </mainContext.Provider>
  );
}

export default App;
