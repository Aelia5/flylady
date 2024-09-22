import './Houses.css';
import React from 'react';
import House from '../House/House';
import Popup from '../Popup/Popup';
import { useFormWithValidation } from '../Validation/Validation';

function Houses({
  houses,
  housesError,
  handleCreateHouseSubmit,
  createHouseError,
  changeCreateHouseError,
  handleDeleteHouse,
  handleDeleteHouseConfirmation,
  handleRenameHouse,
  handleReorderZones,
  handleRenameZone,
  handleAddTask,
  handleDeleteTask,
  handleDeleteTaskConfirmation,
  handleRenameTask,
  popupOpen,
  itemToDelete,
  nameToDelete,
  taskToChangeData,
  closePopup,
  popupError,
}) {
  const { values, handleChange, errors, isValid, resetForm } =
    useFormWithValidation();

  const [formOpened, setFormOpened] = React.useState(false);
  function openForm() {
    setFormOpened(true);
    changeCreateHouseError('');
  }

  function closeForm() {
    setFormOpened(false);
  }

  function handleSubmit(e) {
    e.preventDefault();
    closeForm();
    if (isValid) {
      handleCreateHouseSubmit(values, resetForm);
    }
  }

  return (
    <main className="houses">
      <Popup
        open={popupOpen}
        itemToDelete={itemToDelete}
        nameToDelete={nameToDelete}
        taskToChangeData={taskToChangeData}
        onReject={closePopup}
        onHouseConfirmation={handleDeleteHouseConfirmation}
        onTaskConfirmation={handleDeleteTaskConfirmation}
        popupError={popupError}
        closePopup={closePopup}
      />
      {housesError ? (
        <>
          <h1 className="houses__title houses__title_err">
            Во время запроса произошла ошибка. Возможно, проблема с соединением
            или сервер недоступен. Подождите немного и попробуйте ещё раз
          </h1>
        </>
      ) : (
        <>
          {' '}
          {houses.length === 0 ? (
            <h1 className="houses__title">У вас пока нет ни одного дома</h1>
          ) : (
            <>
              <h1 className="houses__title">Мои дома</h1>
              <ul className="houses__list">
                {houses.map((house) => (
                  <House
                    house={house}
                    key={house._id}
                    onDelete={handleDeleteHouse}
                    onRename={handleRenameHouse}
                    onZonesReorder={handleReorderZones}
                    handleRenameZone={handleRenameZone}
                    handleAddTask={handleAddTask}
                    handleDeleteTask={handleDeleteTask}
                    handleRenameTask={handleRenameTask}
                  />
                ))}
              </ul>
            </>
          )}
          <form
            className={`form ${formOpened ? '' : 'form_hidden'}`}
            onSubmit={handleSubmit}
            noValidate
          >
            <label htmlFor="name" className="form__label">
              Название дома
            </label>
            <input
              className="form__input"
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
            <p className="form__input-error">{errors.name}</p>
            <button
              className="submit-button"
              onClick={handleSubmit}
              disabled={!isValid}
              type="submit"
            >
              Создать новый дом
            </button>
          </form>
          <p className="api-error">{createHouseError}</p>
          <button
            className={`submit-button houses__button ${
              formOpened ? 'submit-button_hidden' : ''
            }`}
            onClick={openForm}
            type="button"
          >
            Создать новый дом
          </button>
          <p className="houses__comment">
            В новом доме будут созданы зоны и задачи по умолчанию. Потом вы
            сможете их отредактировать
          </p>
        </>
      )}
    </main>
  );
}

export default Houses;
