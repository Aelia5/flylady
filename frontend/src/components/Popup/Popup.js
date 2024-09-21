import './Popup.css';
import React from 'react';

function Popup({
  open,
  itemToDelete,
  nameToDelete,
  taskToChangeData,
  onReject,
  onHouseConfirmation,
  onTaskConfirmation,
  popupError,
  closePopup,
}) {
  function handleConfirmation() {
    if (nameToDelete === 'дома') {
      onHouseConfirmation(itemToDelete._id);
    } else if (nameToDelete === 'задачи') {
      onTaskConfirmation(taskToChangeData);
    }
  }
  return (
    <div className={`popup ${open && 'popup_open'}`}>
      <div className="popup__container">
        {popupError ? (
          <>
            <p className="popup__text">На сервере произошла ошибка</p>
            <button
              className="popup__button popup__button_type_confirm"
              onClick={closePopup}
              type="button"
            >
              Закрыть
            </button>
          </>
        ) : (
          <>
            {' '}
            <p className="popup__text">
              Удаление {nameToDelete} "{itemToDelete.name}".
            </p>
            <p className="popup__text">Вы уверены?</p>
            <div className="popup__buttons">
              <button
                className="popup__button popup__button_type_confirm"
                onClick={handleConfirmation}
                type="button"
              >
                Да
              </button>
              <button
                className="popup__button popup__button_type_reject"
                onClick={onReject}
                type="button"
              >
                Нет
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Popup;
