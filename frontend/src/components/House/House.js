import "./House.css";
import React from "react";

function House({ house }) {
  const [nameEdited, setNameEdited] = React.useState(false);

  function openNameForm() {
    setNameEdited(true);
  }

  function closeNameForm() {
    setNameEdited(false);
  }

  return (
    <li className="house">
      {nameEdited ? (
        <>
          <form className="house__name-container house__form">
            <input
              className="house__name house__input"
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
            <div className="house__buttons">
              <button className="little-button little-button_type_save"></button>
              <button
                className="little-button little-button_type_discard"
                onClick={closeNameForm}
              ></button>
            </div>
          </form>
          <p className="form__input-error">
            Тестовая ошибка{/* {errors.house} */}
          </p>
        </>
      ) : (
        <div className="house__name-container">
          <h2 className="house__name">{house.name}</h2>
          <div className="house__buttons">
            <button
              className="little-button little-button_type_edit"
              onClick={openNameForm}
            ></button>
            <button className="little-button little-button_type_reorder"></button>
            <button className="little-button little-button_type_delete"></button>
          </div>
        </div>
      )}
    </li>
  );
}

export default House;
