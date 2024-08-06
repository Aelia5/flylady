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
import Main from "../Main/Main";

function App() {
  const [loggedIn, setLoggedIn] = React.useState(
    // JSON.parse(localStorage.getItem("loggedIn")) ||
    true
  );

  return (
    <div className="app">
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Header loggedIn={loggedIn} />
              <Main />
            </>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
