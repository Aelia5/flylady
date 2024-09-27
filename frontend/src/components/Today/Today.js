import './Today.css';
import React from 'react';
import TodayTask from '../TodayTask/TodayTask';

function Today({ houses, housesError, handleFulfilTask, handleResetDate }) {
  const d = new Date();
  // const [weekDay, setWeekDay] = React.useState(
  //   localStorage.getItem('weekDay') || d.getDay()
  // );

  const weekDay = d.getDay();

  const todayDate = d.toLocaleString('ru', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  function getWeek(d, weekDay) {
    const date = d.getDate();
    const weekOfMonth = Math.ceil((date - 1 - weekDay) / 7);
    return weekOfMonth;
  }

  const [weekend, setWeekend] = React.useState(weekDay === 6 || weekDay === 0);

  // React.useEffect(() => {
  //   if (localStorage.getItem('weekDay') !== weekDay) {
  //     localStorage.setItem('weekDay');
  //   }
  // });

  React.useEffect(() => {
    if (weekDay === 6 || weekDay === 0) {
      setWeekend(true);
    } else {
      setWeekend(false);
    }
  }, [weekDay]);

  const [weekNumber, setWeekNumber] = React.useState(getWeek(d, weekDay));
  React.useEffect(() => {
    getWeek(d, weekDay);
  }, [weekDay]);

  // function getTodayTasks(houses) {
  //   return houses.map((house) => {
  //     return house.zones[weekNumber].tasks[0].name;
  //   });
  // }

  // // const [todayTasks, setTodayTasks] = React.useState(getTodayTasks(houses));

  // React.useEffect(() => {
  //   setTodayTasks(getTodayTasks(houses));
  // }, [weekDay, houses]);

  return (
    <main className="today">
      {housesError ? (
        <h1 className="today__title today__title_err">
          Во время запроса произошла ошибка. Возможно, проблема с соединением
          или сервер недоступен. Подождите немного и попробуйте ещё раз
        </h1>
      ) : (
        <>
          {' '}
          {houses.length === 0 ? (
            <h1 className="today__title">У вас пока нет ни одного дома</h1>
          ) : (
            <>
              <h1 className="today__title">Задачи на сегодня ({todayDate})</h1>
              <ul className="today__houses-list">
                {houses.map((house, index) => (
                  <li key={house._id} className="today_house">
                    <div className="item">
                      <h2 className="item__name">{house.name}</h2>
                    </div>
                    <div
                      className="item today__zone"
                      key={house.zones[weekNumber].name._id}
                    >
                      <p className="item__name item__name_type_zone">
                        {weekend
                          ? 'В выходные задач нет'
                          : `Текущая зона: ${house.zones[weekNumber].name}`}
                      </p>
                    </div>
                    {!weekend && (
                      <TodayTask
                        // task={todayTasks[index]}
                        // key={todayTasks[index]._id}
                        task={house.zones[weekNumber].tasks[0].name}
                        onCheck={handleFulfilTask}
                        houseId={house._id}
                        zoneNumber={weekNumber}
                        fulfilDate={house.zones[weekNumber].fulfilled}
                        resetDate={handleResetDate}
                      ></TodayTask>
                    )}
                  </li>
                ))}
              </ul>
            </>
          )}
        </>
      )}{' '}
    </main>
  );
}

export default Today;
