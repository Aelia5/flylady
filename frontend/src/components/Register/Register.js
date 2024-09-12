import './Register.css';
import React from 'react';
import { useFormWithValidation } from '../Validation/Validation';

function Register({
  handleRegistrationSubmit,
  apiError,
  changeApiError,
  blocked,
}) {
  const { values, handleChange, errors, isValid, resetForm } =
    useFormWithValidation();

  function handleSubmit(e) {
    e.preventDefault();
    if (isValid) {
      handleRegistrationSubmit(values, resetForm);
    }
  }

  React.useEffect(() => {
    if (apiError) {
      changeApiError('');
    }
  }, [values]);

  return (
    <main className="register">
      <section className="register__container">
        <h1 className="form-title">Добро пожаловать!</h1>
        <form className="form" onSubmit={handleSubmit} noValidate>
          <label htmlFor="name" className="form__label">
            Имя
          </label>
          <input
            className="form__input"
            type="text"
            placeholder="Введите ваше имя"
            id="name"
            name="name"
            minLength="2"
            maxLength="20"
            pattern="[A-Za-zА-Яа-яЁё\s\-]+$"
            onChange={handleChange}
            title="Только кириллица, латиница, дефисы и пробелы"
            value={values.name || ''}
            required
            disabled={blocked}
          ></input>
          <p className="form__input-error">{errors.name}</p>
          <label htmlFor="email" className="form__label">
            E-mail
          </label>
          <input
            className="form__input"
            type="email"
            placeholder="Введите вашу почту"
            id="email"
            name="email"
            pattern="[A-Za-z0-9\._%+\-]+@[a-zA-Z0-9\.\-]+\.[a-zA-Z]{2,4}$"
            title="Введите корректный email"
            onChange={handleChange}
            value={values.email || ''}
            required
            disabled={blocked}
          ></input>
          <p className="form__input-error">{errors.email}</p>
          <label htmlFor="password" className="form__label">
            Пароль
          </label>
          <input
            className="form__input"
            type="password"
            placeholder="Введите ваш пароль"
            id="password"
            name="password"
            minLength="7"
            onChange={handleChange}
            value={values.password || ''}
            required
            disabled={blocked}
          ></input>
          <p className="form__input-error">{errors.password}</p>
          <p className="api-error">{apiError}</p>
          <button
            type="submit"
            className="submit-button"
            disabled={!isValid || apiError || blocked}
          >
            Зарегистрироваться
          </button>
        </form>
      </section>
    </main>
  );
}

export default Register;
