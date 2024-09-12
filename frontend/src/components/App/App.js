import './App.css';
import React from 'react';
import {
  Routes,
  Route,
  Navigate,
  useNavigate,
  useLocation,
} from 'react-router-dom';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import Register from '../Register/Register';
import Login from '../Login/Login';
import Profile from '../Profile/Profile';
import Houses from '../Houses/Houses';
import Today from '../Today/Today';
import Api from '../../utils/Api';

function App() {
  //Константы
  const navigate = useNavigate();

  const location = useLocation();

  const { register, login, getUser, editProfileData } = Api();

  //Стейты

  const [currentUser, setCurrentUser] = React.useState({});
  const [loggedIn, setLoggedIn] = React.useState(
    // JSON.parse(localStorage.getItem("loggedIn")) ||
    false
  );
  const [registerError, setRegisterError] = React.useState('');
  function changeRegisterError(errorMessage) {
    setRegisterError(errorMessage);
  }

  const [loginError, setLoginError] = React.useState('');
  function changeLoginError(errorMessage) {
    setLoginError(errorMessage);
  }

  const [profileError, setProfileError] = React.useState('');
  function changeProfileError(errorMessage) {
    setProfileError(errorMessage);
  }

  const [formsBlocked, setFormsBlocked] = React.useState(false);

  const [editSuccess, setEditSuccess] = React.useState(false);

  //Функции управления профилем

  function authorize(token, resetForm) {
    localStorage.setItem('token', token);
    getUser(token)
      .then((res) => {
        return res;
      })
      .then((userData) => {
        resetForm();
        setCurrentUser(userData);
        setLoggedIn(true);
        navigate('/houses', { replace: true });
      });
  }

  function handleRegistrationSubmit(data, resetForm) {
    setFormsBlocked(true);
    const password = data.password;
    register(data)
      .then((userData) => {
        userData.password = password;
        return login(userData);
      })
      .then((res) => {
        authorize(res.token, resetForm);
      })
      .catch((err) => {
        setRegisterError(err);
      })
      .finally(() => {
        setFormsBlocked(false);
      });
  }

  function handleLoginSubmit(data, resetForm) {
    setFormsBlocked(true);
    login(data)
      .then((res) => {
        authorize(res.token, resetForm);
      })
      .catch((err) => {
        setLoginError(err);
      })
      .finally(() => {
        setFormsBlocked(false);
      });
  }

  function handleEditProfileSubmit(data, resetForm, redirect) {
    setFormsBlocked(true);
    editProfileData(data)
      .then((res) => {
        setCurrentUser(res);
      })
      .then(() => {
        resetForm(data, {}, false);
        redirect(false);
        setEditSuccess(true);
      })
      .catch((err) => {
        if (err === 401) {
          signOut();
        } else {
          changeProfileError(err);
        }
      })
      .finally(() => {
        setFormsBlocked(false);
      });
  }

  function signOut() {
    localStorage.removeItem('token');

    setCurrentUser({});
    setLoggedIn(false);

    navigate('/', { replace: true });
  }

  //Эффекты

  React.useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      getUser(token)
        .then((res) => {
          return res;
        })
        .then((userData) => {
          setCurrentUser(userData);
          setLoggedIn(true);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);

  React.useEffect(() => {
    if (editSuccess === true) {
      setEditSuccess(false);
    }
  }, [location]);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="app">
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Header loggedIn={loggedIn} signOut={signOut} />
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
                  <Header loggedIn={loggedIn} signOut={signOut} />
                  <Register
                    handleRegistrationSubmit={handleRegistrationSubmit}
                    apiError={registerError}
                    changeApiError={changeRegisterError}
                    blocked={formsBlocked}
                  />
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
                  <Header loggedIn={loggedIn} signOut={signOut} />
                  <Login
                    handleLoginSubmit={handleLoginSubmit}
                    apiError={loginError}
                    changeApiError={changeLoginError}
                    blocked={formsBlocked}
                  />
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
                  <Header loggedIn={loggedIn} signOut={signOut} />
                  <Profile
                    loggedIn={loggedIn}
                    onExit={signOut}
                    handleEditProfileSubmit={handleEditProfileSubmit}
                    apiError={profileError}
                    changeApiError={changeProfileError}
                    blocked={formsBlocked}
                    editSuccess={editSuccess}
                  />
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
                  <Header loggedIn={loggedIn} signOut={signOut} />
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
                  <Header loggedIn={loggedIn} signOut={signOut} />
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
          <Route
            path="/*"
            element={
              <>
                {' '}
                <Header loggedIn={loggedIn} signOut={signOut} />
                <main>
                  <section className="not-found">
                    <h1 className="not-found__title">Ошибка 404</h1>
                    <p className="not-found__text">Страница не найдена</p>
                    <button
                      className="not-found__button"
                      onClick={() => navigate(-1)}
                    >
                      Назад
                    </button>
                  </section>
                </main>
                <Footer />
              </>
            }
          />
        </Routes>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
