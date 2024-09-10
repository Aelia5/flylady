import "./App.css";
import React from "react";
import {
  Routes,
  Route,
  Navigate,
  // useNavigate,
  // useLocation,
} from "react-router-dom";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import Register from "../Register/Register";
import Login from "../Login/Login";
import Profile from "../Profile/Profile";
import Houses from "../Houses/Houses";
import Today from "../Today/Today";

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
              <Footer />
            </>
          }
        />
        <Route
          path="/signup"
          element={
            loggedIn ? (
              <>
                <Navigate to="/profile" replace />
              </>
            ) : (
              <>
                <Header loggedIn={loggedIn} />
                <Register />
                <Footer />
              </>
            )
          }
        />
        <Route
          path="/signin"
          element={
            loggedIn ? (
              <>
                <Navigate to="/profile" replace />
              </>
            ) : (
              <>
                <Header loggedIn={loggedIn} />
                <Login />
                <Footer />
              </>
            )
          }
        />
        <Route
          path="/profile"
          element={
            loggedIn ? (
              <>
                <Header loggedIn={loggedIn} />
                <Profile />
                <Footer />
              </>
            ) : (
              <>
                <Navigate to="/signin" replace />
              </>
            )
          }
        />
        <Route
          path="/houses"
          element={
            loggedIn ? (
              <>
                <Header loggedIn={loggedIn} />
                <Houses />
                <Footer />
              </>
            ) : (
              <>
                <Navigate to="/signin" replace />
              </>
            )
          }
        />
        <Route
          path="/today"
          element={
            loggedIn ? (
              <>
                <Header loggedIn={loggedIn} />
                <Today />
                <Footer />
              </>
            ) : (
              <>
                <Navigate to="/signin" replace />
              </>
            )
          }
        />
      </Routes>
    </div>
  );
}

export default App;
