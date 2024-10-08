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

  const {
    register,
    login,
    getUser,
    getHouses,
    editProfileData,
    createHouse,
    deleteHouse,
    renameHouse,
    reorderZones,
    renameZone,
    addTask,
    deleteTask,
    renameTask,
    fulfilTask,
    resetDate,
  } = Api();

  //Стейты

  const [currentUser, setCurrentUser] = React.useState({});
  const [loggedIn, setLoggedIn] = React.useState(
    JSON.parse(localStorage.getItem('loggedIn')) || false
  );
  const [registerError, setRegisterError] = React.useState('');
  const changeRegisterError = React.useCallback((errorMessage) => {
    setRegisterError(errorMessage);
  }, []);

  const [loginError, setLoginError] = React.useState('');
  const changeLoginError = React.useCallback((errorMessage) => {
    setLoginError(errorMessage);
  }, []);

  const [profileError, setProfileError] = React.useState('');
  const changeProfileError = React.useCallback((errorMessage) => {
    setProfileError(errorMessage);
  }, []);

  const [formsBlocked, setFormsBlocked] = React.useState(false);

  const [editSuccess, setEditSuccess] = React.useState(false);

  const [houses, setHouses] = React.useState(
    JSON.parse(localStorage.getItem('houses')) || []
  );

  const [housesError, setHousesError] = React.useState(false);

  const [createHouseError, setCreateHouseError] = React.useState('');
  function changeCreateHouseError(errorMessage) {
    setCreateHouseError(errorMessage);
  }

  const [popupOpen, setPopupOpen] = React.useState(false);

  const [nameToDelete, setNameToDelete] = React.useState('');

  const [itemToDelete, setItemToDelete] = React.useState({});

  const [taskToChangeData, setTaskToChangeData] = React.useState({});

  const [popupError, setPopupError] = React.useState(false);
  function changePopupError(value) {
    setPopupError(value);
  }

  //Функции управления попапом

  function closePopup() {
    setPopupOpen(false);
    setItemToDelete({});
    setNameToDelete('');
    changePopupError(false);
    setTaskToChangeData({});
  }

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

  const signOut = React.useCallback(() => {
    const keysToRemove = ['token', 'loggedIn', 'houses'];
    keysToRemove.forEach((key) => localStorage.removeItem(key));

    setCurrentUser({});
    setLoggedIn(false);

    navigate('/', { replace: true });
  }, [navigate]);

  //Общие функции управления домами

  function handleErrorPopupOpen(err) {
    if (err === 401) {
      signOut();
    } else {
      changePopupError(true);
    }
  }

  function handleErrorNoPopup(err) {
    if (err === 401) {
      signOut();
    } else {
      setPopupOpen(true);
      changePopupError(true);
    }
  }

  function updateHouses(house) {
    setHouses(houses.map((item) => (item._id === house._id ? house : item)));
  }

  //Обработка запросов, связанных с домами

  function handleCreateHouseSubmit(data, resetForm) {
    createHouse(data)
      .then((newHouse) => {
        setHouses([...houses, newHouse]);
        resetForm();
      })
      .catch((err) => {
        if (err === 401) {
          signOut();
        } else {
          changeCreateHouseError('При создании дома произошла ошибка');
        }
      });
  }

  function handleDeleteHouse(house) {
    setPopupOpen(true);
    setItemToDelete(house);
    setNameToDelete('дома');
  }

  function handleDeleteHouseConfirmation(id) {
    deleteHouse(id)
      .then((house) => {
        const updatedHouses = houses.filter((item) => {
          return item._id !== house._id;
        });
        setHouses(updatedHouses);
        closePopup();
      })
      .catch((err) => handleErrorPopupOpen(err));
  }

  function handleRenameHouse(id, data) {
    renameHouse(id, data)
      .then((house) => updateHouses(house))
      .catch((err) => handleErrorNoPopup(err));
  }

  function handleReorderZones(id, order) {
    const data = { newOrder: order };
    reorderZones(id, data)
      .then((house) => updateHouses(house))
      .catch((err) => handleErrorNoPopup(err));
  }

  function handleRenameZone(id, number, data) {
    renameZone(id, number, data)
      .then((house) => updateHouses(house))
      .catch((err) => handleErrorNoPopup(err));
  }

  function handleAddTask(id, number, data) {
    addTask(id, number, data)
      .then((house) => updateHouses(house))
      .catch((err) => handleErrorNoPopup(err));
  }
  function handleDeleteTask(task, houseId, zoneNumber, taskNumber) {
    setPopupOpen(true);
    setItemToDelete(task);
    setNameToDelete('задачи');
    setTaskToChangeData({
      houseId: houseId,
      zoneNumber: zoneNumber,
      taskNumber: taskNumber,
    });
  }

  function handleDeleteTaskConfirmation(data) {
    deleteTask(data)
      .then((house) => {
        updateHouses(house);
        closePopup();
      })
      .catch((err) => handleErrorPopupOpen(err));
  }

  function handleRenameTask(data, name) {
    renameTask(data, name)
      .then((house) => updateHouses(house))
      .catch((err) => handleErrorNoPopup(err));
  }

  function handleFulfilTask(houseId, zoneNumber) {
    fulfilTask(houseId, zoneNumber)
      .then((house) => updateHouses(house))
      .catch((err) => handleErrorNoPopup(err));
  }

  function handleResetDate(houseId, zoneNumber) {
    resetDate(houseId, zoneNumber)
      .then((house) => updateHouses(house))
      .catch((err) => handleErrorNoPopup(err));
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
        .catch(() => {
          signOut();
        });
    }
  }, [getUser, signOut]);

  React.useEffect(() => {
    localStorage.setItem('loggedIn', JSON.stringify(loggedIn));
  }, [loggedIn]);

  React.useEffect(() => {
    if (loggedIn) {
      getHouses()
        .then((houses) => {
          setHouses(houses);
          setHousesError(false);
        })
        .catch((err) => {
          if (err === 401) {
            signOut();
          } else {
            setHousesError(true);
          }
        });
    } else {
      setHouses([]);
    }
  }, [loggedIn, getHouses, signOut, currentUser]);

  React.useEffect(() => {
    localStorage.setItem('houses', JSON.stringify(houses));
  }, [houses]);

  React.useEffect(() => {
    setEditSuccess(false);
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
                  <Houses
                    houses={houses}
                    housesError={housesError}
                    handleCreateHouseSubmit={handleCreateHouseSubmit}
                    createHouseError={createHouseError}
                    changeCreateHouseError={changeCreateHouseError}
                    handleDeleteHouse={handleDeleteHouse}
                    handleDeleteHouseConfirmation={
                      handleDeleteHouseConfirmation
                    }
                    handleRenameHouse={handleRenameHouse}
                    handleReorderZones={handleReorderZones}
                    handleRenameZone={handleRenameZone}
                    handleAddTask={handleAddTask}
                    handleDeleteTask={handleDeleteTask}
                    handleDeleteTaskConfirmation={handleDeleteTaskConfirmation}
                    handleRenameTask={handleRenameTask}
                    popupOpen={popupOpen}
                    itemToDelete={itemToDelete}
                    nameToDelete={nameToDelete}
                    taskToChangeData={taskToChangeData}
                    closePopup={closePopup}
                    popupError={popupError}
                    changePopupError={changePopupError}
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
            path="/today"
            element={
              loggedIn ? (
                <>
                  <Header loggedIn={loggedIn} signOut={signOut} />
                  <Today
                    houses={houses}
                    housesError={housesError}
                    handleFulfilTask={handleFulfilTask}
                    handleResetDate={handleResetDate}
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
