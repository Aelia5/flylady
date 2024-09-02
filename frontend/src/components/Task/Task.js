import "./Task.css";
import React from "react";

function Task({ task }) {
  console.log(task);
  return (
    <li className="task">
      <div className="item">
        <p className="item__name item__name_type_task">{task}</p>
        <div className="item__buttons">
          <button
            className="item__button item__button_type_edit"
            title="Редактировать задачу"
          ></button>
          <button
            className="item__button item__button_type_delete"
            title="Удалить задачу"
          ></button>
        </div>
      </div>
    </li>
  );
}

export default Task;
