import './Zone.css';
import React from 'react';
import Task from '../Task/Task';

function Zone({
  zone,
  zoneNumber,
  orderEdited,
  formName,
  passEdited,
  handleChange,
}) {
  //Стейты
  const [nameEdited, setNameEdited] = React.useState(false);
  function openNameForm() {
    setNameEdited(true);
    passEdited(true);
  }
  function closeNameForm() {
    setNameEdited(false);
    passEdited(false);
  }

  const [tasksOpened, setTasksOpened] = React.useState(false);
  function openTasks() {
    setTasksOpened(true);
  }
  function closeTasks() {
    setTasksOpened(false);
  }

  const [addFormOpened, setAddFormOpened] = React.useState(false);
  function openAddForm() {
    setAddFormOpened(true);
  }
  function closeAddForm() {
    setAddFormOpened(false);
  }

  const [width, setWidth] = React.useState(window.innerWidth);

  React.useEffect(() => {
    function handleResizeWindow() {
      setTimeout(setWidth, 500, window.innerWidth);
    }
    window.addEventListener('resize', handleResizeWindow);
    return () => {
      window.removeEventListener('resize', handleResizeWindow);
    };
  }, []);

  return (
    <li className="zone">
      {/* Название зонв */}
      {orderEdited ? (
        // Если редактируется порядок зон
        <div className="item item_type_reorder">
          <h2 className="item__name item__name_type_zone">{zone.name}</h2>
          <div className="item__buttons">
            {width > 425 && (
              <p className="item__name item__name_type_zone">Неделя</p>
            )}

            <select
              name={zoneNumber}
              form={formName}
              className="item__select"
              defaultValue={zoneNumber}
              onChange={handleChange}
            >
              <option required>1</option>
              <option required>2</option>
              <option required>3</option>
              <option required>4</option>
              <option required>5</option>
            </select>
          </div>
        </div>
      ) : (
        // Если порядок зон не редактируется
        <>
          {nameEdited ? (
            // Если редактируется имя
            <>
              <form className="item item_type_form">
                <input
                  className="item__name item__name_type_zone item__input"
                  type="text"
                  placeholder="Введите название зоны"
                  id="zone"
                  name="zone"
                  minLength="2"
                  maxLength="100"
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
            // Если не редактируется имя
            <>
              <div className="item">
                <h2 className="item__name item__name_type_zone">
                  Неделя {zoneNumber}. {zone.name}
                </h2>
                <div className="item__buttons">
                  {tasksOpened ? (
                    <>
                      <button
                        className="item__button item__button_type_add"
                        title="Добавить задачу"
                        onClick={openAddForm}
                      ></button>
                      <button
                        className="item__button item__button_type_collapse"
                        title="Скрыть задачи"
                        onClick={closeTasks}
                      ></button>
                    </>
                  ) : (
                    <button
                      className="item__button item__button_type_open"
                      title="Показать задачи"
                      onClick={openTasks}
                    ></button>
                  )}

                  <button
                    className="item__button item__button_type_edit"
                    title="Редактировать название"
                    onClick={openNameForm}
                  ></button>
                </div>
              </div>
              {tasksOpened && (
                <>
                  <ul className="zone__tasks">
                    {addFormOpened && (
                      <li className="task">
                        <form className="item item_type_task item_type_form">
                          <input
                            className="item__name item__name_type_task item__input"
                            type="text"
                            placeholder="Создайте новую задачу"
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
                              onClick={closeAddForm}
                            ></button>
                          </div>
                        </form>
                        <p className="form__input-error item__input-error">
                          Тестовая ошибка{/* {errors.house} */}
                        </p>
                      </li>
                    )}
                    {zone.tasks.map((task) => (
                      <Task task={task} key={task._id} />
                    ))}
                  </ul>
                </>
              )}
            </>
          )}
        </>
      )}
    </li>
  );
}

export default Zone;
