import './Profile.css';
import React from 'react';

import { useFormWithValidation } from '../Validation/Validation';

import { CurrentUserContext } from '../../contexts/CurrentUserContext';

function Profile({
  onExit,
  apiError,
  changeApiError,
  handleEditProfileSubmit,
  blocked,
  editSuccess,
}) {
  const currentUser = React.useContext(CurrentUserContext);

  const [isNew, setIsNew] = React.useState(false);

  const { values, handleChange, errors, isValid, resetForm } =
    useFormWithValidation();

  const [isEdited, setIsEdited] = React.useState(false);

  function openEdit() {
    setIsEdited(true);
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (isValid) {
      handleEditProfileSubmit(values, resetForm, setIsEdited);
    }
  }

  React.useEffect(() => {
    if (
      values.name !== currentUser.name ||
      values.email !== currentUser.email
    ) {
      setIsNew(true);
    } else setIsNew(false);
  }, [values, currentUser]);

  React.useEffect(() => {
    resetForm(
      currentUser,
      {},

      false
    );
  }, [currentUser, resetForm]);

  React.useEffect(() => {
    changeApiError('');
  }, [values, changeApiError]);

  return (
    <main className="profile">
      <section className="profile__container">
        <h1 className="form-title">
          {editSuccess && !isEdited
            ? `Изменения успешно сохранены !`
            : `Привет, ${currentUser.name}

       !`}
        </h1>
        {isEdited ? (
          <form className="form" onSubmit={handleSubmit} noValidate>
            <label className="form__label profile__label" htmlFor="name">
              Имя
              <input
                className="profile__input"
                type="text"
                placeholder="Введите ваше имя"
                id="name"
                name="name"
                value={values.name}
                minLength="2"
                maxLength="20"
                pattern="[A-Za-zА-Яа-яЁё\s\-]+$"
                title="Только кириллица, латиница, дефисы и пробелы"
                onChange={handleChange}
                required
                disabled={blocked}
                autoFocus
              ></input>
            </label>
            <p className="form__input-error profile__input-error">
              {isNew ? errors.name : 'Введите новое имя'}
            </p>
            <label className="form__label profile__label" htmlFor="email">
              Почта
              <input
                className="profile__input"
                type="email"
                placeholder="Введите вашу почту"
                id="email"
                name="email"
                pattern="[A-Za-z0-9\._%+\-]+@[a-zA-Z0-9\.\-]+\.[a-zA-Z]{2,4}$"
                title="Введите корректный email"
                value={values.email}
                required
                onChange={handleChange}
                disabled={blocked}
              ></input>
            </label>
            <p className="form__input-error profile__input-error">
              {isNew ? errors.email : 'Введите новый адрес электронной почты'}
            </p>
            <p className="api-error profile__api-error"> {apiError}</p>
            <button
              className="button"
              disabled={!isValid || !isNew || apiError || blocked}
            >
              Сохранить
            </button>
          </form>
        ) : (
          <div className="form">
            <div className="form__label profile__label profile__label_inedited">
              Имя
              <span className="profile__input profile__input_inedited">
                {currentUser.name}
              </span>
            </div>
            <div className="form__label profile__label profile__label_inedited">
              E-mail
              <span className="profile__input profile__input_inedited">
                {currentUser.email}
              </span>
            </div>
            <div className="profile__options">
              <button className="profile__option" onClick={openEdit}>
                Редактировать
              </button>
              <button
                className="profile__option profile__option_type_exit"
                onClick={onExit}
              >
                Выйти из аккаунта
              </button>
            </div>
          </div>
        )}
      </section>
    </main>
  );
}

export default Profile;
