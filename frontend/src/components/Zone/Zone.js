import "./Zone.css";
import React from "react";

function Zone({ zone, zoneNumber }) {
  const [nameEdited, setNameEdited] = React.useState(false);

  function openNameForm() {
    setNameEdited(true);
  }

  function closeNameForm() {
    setNameEdited(false);
  }

  return (
    <li className="zone">
      {nameEdited ? (
        <>
          <form className="item item_type_form">
            <input
              className="item__name item__name_type_zone item__input"
              type="text"
              placeholder="Введите название зоны"
              id="zone"
              name="zone"
              minLength="2"
              maxLength="100"
              // onChange={handleChange}
              // value={values.email || ""}
              required
              // disabled={blocked}
            ></input>
            <div className="item__buttons">
              <button
                className="item__button item__button_type_save"
                title="Сохранить"
              ></button>
              <button
                className="item__button item__button_type_discard"
                title="Отказаться от изменений"
                onClick={closeNameForm}
              ></button>
            </div>
          </form>
          <p className="form__input-error item__input-error">
            Тестовая ошибка{/* {errors.house} */}
          </p>
        </>
      ) : (
        <div className="item">
          <h2 className="item__name item__name_type_zone">
            Неделя {zoneNumber}. {zone.name}
          </h2>
          <div className="item__buttons">
            <button
              className="item__button item__button_type_open"
              title="Показать задачи"
            ></button>
            <button
              className="item__button item__button_type_edit"
              title="Редактировать название"
              onClick={openNameForm}
            ></button>
          </div>
        </div>
      )}
    </li>
  );
}

export default Zone;
