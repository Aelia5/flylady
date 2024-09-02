import "./Zone.css";
import React from "react";

function Zone({ zone, zoneNumber, orderEdited, formName, passNameEdited }) {
  const [nameEdited, setNameEdited] = React.useState(false);

  function openNameForm() {
    setNameEdited(true);
    passNameEdited(true);
  }

  function closeNameForm() {
    setNameEdited(false);
    passNameEdited(false);
  }

  const zoneNumbers = [1, 2, 3, 4, 5];
  return (
    <li className="zone">
      {orderEdited ? (
        // Если редактируется порядок зон
        <div className="item item_type_reorder">
          <h2 className="item__name item__name_type_zone">{zone.name}</h2>
          <div className="item__buttons">
            <p className="item__name item__name_type_zone">Неделя</p>
            <select
              name={zoneNumber}
              form={formName}
              className="item__select"
              defaultValue={zoneNumber}
            >
              <option required>1</option>
              <option required>2</option>
              <option required>3</option>
              <option required>4</option>
              <option required>5</option>
            </select>
          </div>
        </div>
      ) : (
        // Если порядок зон не редактируется
        <>
          {nameEdited ? (
            // Если редактируется имя
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
            // Если не редактируется имя
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
        </>
      )}
    </li>
  );
}

export default Zone;
