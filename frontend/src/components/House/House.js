import "./House.css";
import React from "react";

import Zone from "../Zone/Zone";

function House({ house }) {
  const [nameEdited, setNameEdited] = React.useState(false);
  function openNameForm() {
    setNameEdited(true);
  }
  function closeNameForm() {
    setNameEdited(false);
  }

  const [zonesOrderEdited, setZonesOrderEdited] = React.useState(false);
  function openZonesReorder() {
    setZonesOrderEdited(true);
  }
  function closeZonesReorder() {
    setZonesOrderEdited(false);
  }

  const [zoneNameEdited, setZoneNameEdited] = React.useState(false);

  return (
    <li className="house">
      {nameEdited ? (
        // Если имя редактируется
        <>
          <form className="item item_type_form">
            <input
              className="item__name item__input"
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
        // Если имя не редактируется
        <div className={`item ${zonesOrderEdited ? "item_type_reorder" : ""}`}>
          <h2 className="item__name">{house.name}</h2>
          <div className="item__buttons">
            {zonesOrderEdited ? (
              // Если редактируется порядок зон
              <>
                <button
                  className="item__button item__button_type_save"
                  title="Сохранить порядок зон"
                ></button>{" "}
                <button
                  className="item__button item__button_type_discard"
                  title="Отказаться от изменений"
                  onClick={closeZonesReorder}
                ></button>
              </>
            ) : (
              // Если ничего не редактируется
              <>
                {" "}
                <button
                  className="item__button item__button_type_edit"
                  title="Редактировать название"
                  onClick={openNameForm}
                ></button>
                <button
                  className="item__button item__button_type_reorder"
                  title="Изменить порядок зон"
                  onClick={openZonesReorder}
                  disabled={zoneNameEdited}
                ></button>
                <button
                  className="item__button item__button_type_delete"
                  title="Удалить"
                ></button>
              </>
            )}
          </div>
        </div>
      )}
      {zonesOrderEdited ? (
        // Если редактируется порядок зон
        <form className="house__zones house__zones_type_reorder" id={house._id}>
          {house.zones.map((zone, index) => (
            <Zone
              zone={zone}
              key={zone._id}
              zoneNumber={index + 1}
              orderEdited={zonesOrderEdited}
              formName={house._id}
            />
          ))}
        </form>
      ) : (
        // Если ничего не редактируется
        <ul className="house__zones">
          {house.zones.map((zone, index) => (
            <Zone
              zone={zone}
              key={zone._id}
              zoneNumber={index + 1}
              orderEdited={zonesOrderEdited}
              formName=""
              passEdited={setZoneNameEdited}
            />
          ))}
        </ul>
      )}
    </li>
  );
}

export default House;
