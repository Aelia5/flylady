import "./App.css";
import React from "react";
import {
  Routes,
  Route,
  // Navigate,
  // useNavigate,
  // useLocation,
} from "react-router-dom";

function App() {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<div>Тест</div>} />
      </Routes>
    </div>
  );
}

export default App;
