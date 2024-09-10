import "./TodayTask.css";
import React from "react";

function TodayTask({ task }) {
  const [checked, setChecked] = React.useState(false);
  function check() {
    setChecked(true);
  }

  return (
    <div className="item todaytask">
      <p className="item__name item__name_type_task">
        {checked ? "Сегодняшняя задача выполнена!" : `Текущая задача: ${task}`}
      </p>
      <div className="item__buttons">
        {!checked && (
          <button
            className="item__button item__button_type_check"
            title="Отметить выполненным"
            onClick={check}
          ></button>
        )}
      </div>
    </div>
  );
}

export default TodayTask;
