import './Popup.css';
import React from 'react';

function Popup({
  open,
  itemToDelete,
  nameToDelete,
  onReject,
  onConfirmation,
  popupError,
  closePopup,
}) {
  function handleConfirmation() {
    console.log(itemToDelete._id);
    onConfirmation(itemToDelete._id);
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
            >
              Закрыть
            </button>
          </>
        ) : (
          <>
            {' '}
            <p className="popup__text">
              Удаление {nameToDelete} {itemToDelete.name}.
            </p>
            <p className="popup__text">Вы уверены?</p>
            <div className="popup__buttons">
              <button
                className="popup__button popup__button_type_confirm"
                onClick={handleConfirmation}
              >
                Да
              </button>
              <button
                className="popup__button popup__button_type_reject"
                onClick={onReject}
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
