import './House.css';
import React, { useCallback } from 'react';

import Zone from '../Zone/Zone';
import { useFormWithValidation } from '../Validation/Validation';

function House({
  house,
  onDelete,
  onRename,
  onZonesReorder,
  handleRenameZone,
}) {
  //Стейты
  const { values, handleChange, errors, isValid, resetForm } =
    useFormWithValidation();

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

  const [zonesValues, setZonesValues] = React.useState([1, 2, 3, 4, 5]);
  const [zonesIsValid, setZonesIsValid] = React.useState(false);

  const [zonesError, setZonesError] = React.useState('');

  //Функции

  function handleDelete() {
    onDelete(house);
  }

  function handleRename(e) {
    e.preventDefault();
    onRename(house._id, values);
    closeNameForm();
    resetForm();
  }

  const zonesHandleChange = (event) => {
    const target = event.target;
    const name = target.name;
    const value = Number(target.value);
    const newZonesValues = zonesValues.map((item, index) =>
      index === name - 1 ? value : item
    );
    const uniqueZoneValues = new Set(newZonesValues);
    setZonesValues(newZonesValues);
    setZonesIsValid(uniqueZoneValues.size === 5);
    if (!isValid) {
      setZonesError('Номера недель не должны повторяться');
    }
  };

  const zonesResetForm = useCallback(
    (newZonesValues = [1, 2, 3, 4, 5], newZonesIsValid = false) => {
      setZonesValues(newZonesValues);
      setZonesIsValid(newZonesIsValid);
      setZonesError('');
    },
    [setZonesValues, setZonesIsValid, setZonesError]
  );

  function handleReorder(e) {
    e.preventDefault();
    onZonesReorder(house._id, zonesValues);
    closeZonesReorder();
    zonesResetForm();
  }

  return (
    <li className="house">
      {nameEdited ? (
        // Если имя редактируется
        <>
          <form className="item item_type_form" onSubmit={handleRename}>
            <input
              className="item__name item__input"
              type="text"
              placeholder="Введите название дома"
              id="name"
              name="name"
              minLength="2"
              maxLength="30"
              pattern="[A-Za-zА-Яа-яЁё0-9\s\-]+$"
              title="Только кириллица, латиница, цифры, дефисы и пробелы"
              onChange={handleChange}
              value={values.name || ''}
              required
            ></input>
            <div className="item__buttons">
              <button
                className="item__button item__button_type_save"
                type="submit"
                title="Сохранить"
                onClick={handleRename}
                disabled={!isValid}
              ></button>
              <button
                type="button"
                className="item__button item__button_type_discard"
                title="Отказаться от изменений"
                onClick={closeNameForm}
              ></button>
            </div>
          </form>
          <p className="form__input-error item__input-error">{errors.name}</p>
        </>
      ) : (
        // Если имя не редактируется
        <>
          <div className={`item ${zonesOrderEdited && 'item_type_form'}`}>
            <h2 className="item__name">{house.name}</h2>
            <div className="item__buttons">
              {zonesOrderEdited ? (
                // Если редактируется порядок зон
                <>
                  <button
                    className="item__button item__button_type_save"
                    title="Сохранить порядок зон"
                    type="submit"
                    form={house._id}
                    disabled={!zonesIsValid}
                  ></button>{' '}
                  <button
                    className="item__button item__button_type_discard"
                    title="Отказаться от изменений"
                    onClick={closeZonesReorder}
                    type="button"
                  ></button>
                </>
              ) : (
                // Если ничего не редактируется
                <>
                  {' '}
                  <button
                    className="item__button item__button_type_edit"
                    title="Редактировать название"
                    onClick={openNameForm}
                    type="button"
                  ></button>
                  <button
                    className="item__button item__button_type_reorder"
                    title="Изменить порядок зон"
                    onClick={openZonesReorder}
                    disabled={zoneNameEdited}
                    type="button"
                  ></button>
                  <button
                    className="item__button item__button_type_delete"
                    title="Удалить"
                    onClick={handleDelete}
                    type="button"
                  ></button>
                </>
              )}
            </div>
          </div>
          {zonesOrderEdited && (
            <p className="form__input-error item__input-error">{zonesError}</p>
          )}
        </>
      )}
      {zonesOrderEdited ? (
        // Если редактируется порядок зон
        <form
          className="house__zones house__zones_type_reorder"
          id={house._id}
          onSubmit={handleReorder}
        >
          {house.zones.map((zone, index) => (
            <Zone
              zone={zone}
              key={zone._id}
              zoneNumber={index}
              orderEdited={zonesOrderEdited}
              handleChangeOrder={zonesHandleChange}
              houseId={house._id}
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
              zoneNumber={index}
              houseId={house._id}
              orderEdited={zonesOrderEdited}
              passEdited={setZoneNameEdited}
              onRename={handleRenameZone}
            />
          ))}
        </ul>
      )}
    </li>
  );
}

export default House;
