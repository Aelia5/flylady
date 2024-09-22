import './Task.css';
import React from 'react';
import { useFormWithValidation } from '../Validation/Validation';

function Task({ task, houseId, zoneNumber, taskNumber, onDelete, onRename }) {
  const { values, handleChange, errors, isValid, resetForm } =
    useFormWithValidation();

  const [nameEdited, setNameEdited] = React.useState(false);
  function openNameForm() {
    setNameEdited(true);
    values.name = task.name;
  }
  function closeNameForm() {
    setNameEdited(false);
    resetForm();
  }

  function handleDeleteClick() {
    onDelete(task, houseId, zoneNumber, taskNumber);
  }

  function handleRenameSubmit(e) {
    e.preventDefault();
    const data = {
      houseId: houseId,
      zoneNumber: zoneNumber,
      taskNumber: taskNumber,
    };

    onRename(data, values);
    closeNameForm();
  }

  return (
    <>
      {nameEdited ? (
        // Если название редактируется
        <li className="task">
          <form
            className="item item_type_task item_type_form"
            onSubmit={handleRenameSubmit}
          >
            <input
              className="item__name item__name_type_task item__input"
              type="text"
              placeholder="Опишите задачу"
              id="name"
              name="name"
              minLength="2"
              maxLength="300"
              onChange={handleChange}
              value={values.name || ''}
              required
              autoFocus
            ></input>
            <div className="item__buttons">
              <button
                className="item__button item__button_type_save"
                title="Сохранить"
                type="submit"
                disabled={!isValid}
              ></button>
              <button
                className="item__button item__button_type_discard"
                title="Отказаться от изменений"
                onClick={closeNameForm}
                type="button"
              ></button>
            </div>
          </form>
          <p className="form__input-error item__input-error">{errors.name}</p>
        </li>
      ) : (
        <li className="task">
          <div className="item item_type_task">
            <p className="item__name item__name_type_task">{task.name}</p>
            <div className="item__buttons">
              <button
                className="item__button item__button_type_edit"
                title="Редактировать задачу"
                onClick={openNameForm}
              ></button>
              <button
                className="item__button item__button_type_delete"
                title="Удалить задачу"
                type="button"
                onClick={handleDeleteClick}
              ></button>
            </div>
          </div>
        </li>
      )}
    </>
  );
}

export default Task;
