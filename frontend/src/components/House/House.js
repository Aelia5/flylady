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

  return (
    <li className="house">
      {nameEdited ? (
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
        <div className="item">
          <h2 className="item__name">{house.name}</h2>
          <div className="item__buttons">
            {zonesOrderEdited ? (
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
        <form className="house__zones">
          <div className="item">
            <h2 className="item__name item__name_type_zone">
              {house.zones[0].name}
            </h2>
            <div className="item__buttons">
              <select name="numberOne">
                <option value="1" selected>
                  1
                </option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </select>
            </div>
          </div>
          <div className="item">
            <h2 className="item__name item__name_type_zone">
              {house.zones[1].name}
            </h2>
            <div className="item__buttons">
              <select name="numberOne">
                <option value="1">1</option>
                <option value="2" selected>
                  2
                </option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </select>
            </div>
          </div>
          <div className="item">
            <h2 className="item__name item__name_type_zone">
              {house.zones[2].name}
            </h2>
            <div className="item__buttons">
              <select name="numberOne">
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3" selected>
                  3
                </option>
                <option value="4">4</option>
                <option value="5">5</option>
              </select>
            </div>
          </div>
          <div className="item">
            <h2 className="item__name item__name_type_zone">
              {house.zones[3].name}
            </h2>
            <div className="item__buttons">
              <select name="numberOne">
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4" selected>
                  4
                </option>
                <option value="5">5</option>
              </select>
            </div>
          </div>
          <div className="item">
            <h2 className="item__name item__name_type_zone">
              {house.zones[4].name}
            </h2>
            <div className="item__buttons">
              <select name="numberOne">
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5" selected>
                  5
                </option>
              </select>
            </div>
          </div>
        </form>
      ) : (
        <ul className="house__zones">
          {house.zones.map((zone, index) => (
            <Zone
              zone={zone}
              key={zone._id}
              zoneNumber={index + 1}
              orderEdited={zonesOrderEdited}
            />
          ))}
        </ul>
      )}
    </li>
  );
}

export default House;

// Стилизовать форму, чтобы высота и шрифт не отличались.
// Заблокировать кнопки редактирования, чтобы не открывались одновременно
// Стилизовать выпадающий список
