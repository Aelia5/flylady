import "./App.css";
import React from "react";
import {
  Routes,
  Route,
  // Navigate,
  // useNavigate,
  // useLocation,
} from "react-router-dom";
import Header from "../Header/Header";

function App() {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<Header />} />
      </Routes>
    </div>
  );
}

export default App;
