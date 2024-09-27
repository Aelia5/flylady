import './TodayTask.css';
import React from 'react';
import moment from 'moment';

function TodayTask({
  task,
  onCheck,
  houseId,
  zoneNumber,
  fulfilDate,
  resetDate,
}) {
  const d = moment().format('YYYY-MM-DD') + 'T00:00:00.000Z';
  const isFulfilledToday = fulfilDate === d;
  console.log(fulfilDate);
  console.log(d);

  function handleRenew() {
    resetDate(houseId, zoneNumber);
  }

  function handleCheck() {
    onCheck(houseId, zoneNumber);
  }

  return (
    <div className="item todaytask">
      <p className="item__name item__name_type_task">
        {isFulfilledToday
          ? 'Сегодняшняя задача выполнена! Следующая появится завтра'
          : `Текущая задача: ${task}`}
      </p>
      <div className="item__buttons">
        {isFulfilledToday ? (
          <button
            className="item__button item__button_type_refresh"
            title="Получить новую задачу"
            onClick={handleRenew}
          ></button>
        ) : (
          <button
            className="item__button item__button_type_check"
            title="Отметить выполненным"
            onClick={handleCheck}
          ></button>
        )}
      </div>
    </div>
  );
}

export default TodayTask;
