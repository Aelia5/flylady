import './Task.css';
import React from 'react';

function Task({ task, houseId, zoneNumber, taskNumber, onDelete }) {
  const [nameEdited, setNameEdited] = React.useState(false);
  function openNameForm() {
    setNameEdited(true);
  }
  function closeNameForm() {
    setNameEdited(false);
  }

  function handleDeleteClick() {
    onDelete(task, houseId, zoneNumber, taskNumber);
  }

  return (
    <>
      {nameEdited ? (
        // Если название редактируется
        <li className="task">
          <form className="item item_type_task item_type_form">
            <input
              className="item__name item__name_type_task item__input"
              type="text"
              placeholder="Опишите задачу"
              id="task"
              name="task"
              minLength="2"
              maxLength="300"
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
