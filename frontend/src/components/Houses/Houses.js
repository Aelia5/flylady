import "./Houses.css";
import React from "react";

function Houses() {
  const [houses, setHouses] = React.useState([]);

  const [formOpened, setFormOpened] = React.useState(false);
  function openForm() {
    setFormOpened(true);
  }
  function closeForm() {
    setFormOpened(false);
  }

  function handleSubmit(e) {
    e.preventDefault();
    closeForm();
    // if (isValid) {
    //   handleEditProfileSubmit(values, resetForm, setIsEdited);
    // }
  }

  return (
    <main className="houses">
      {houses.length === 0 ? (
        <h1 className="houses__title">У вас пока нет ни одного дома</h1>
      ) : (
        <div />
      )}
      <form className={`form ${formOpened ? "" : "form_hidden"}`} noValidate>
        <label htmlFor="house" className="form__label">
          Название дома
        </label>
        <input
          className="form__input"
          type="text"
          placeholder="Введите название дома"
          id="house"
          name="house"
          minLength="2"
          maxLength="30"
          pattern="[A-Za-zА-Яа-яЁё0-9\s\-]+$"
          title="Только кириллица, латиница, цифры, дефисы и пробелы"
          // onChange={handleChange}
          // value={values.email || ""}
          required
          // disabled={blocked}
        ></input>
        <p className="form__input-error">{/* {errors.house} */}</p>
        <button className="submit-button" onClick={handleSubmit}>
          Создать новый дом
        </button>
      </form>
      <button
        className={`submit-button houses__button ${
          formOpened ? "submit-button_hidden" : ""
        }`}
        onClick={openForm}
      >
        Создать новый дом
      </button>
      <p className="houses__comment">
        В новом доме будут созданы зоны и задачи по умолчанию. Потом вы сможете
        их отредактировать
      </p>
    </main>
  );
}

export default Houses;
