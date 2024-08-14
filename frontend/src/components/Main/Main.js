import "./Main.css";
import imagePath from "../../images/main-image.jpg";

function Main() {
  return (
    <main className="main">
      <div className="main__titlebox">
        <h1 className="main__title">Flylady</h1>
        <p className="main__subtitle">Ежедневные задачи</p>
      </div>
      <img
        className="main__image"
        src={imagePath}
        alt="Мыть полы можно с удовольствием!"
      />
      <div className="main__text-container">
        <p className="main__text">
          Не знаете, чем полезным заняться сегодня дома? Разобрать шкаф, помыть
          ванну или пропылесосить диван? С чего начать и когда закончить?{" "}
        </p>
        <p className="main__text">
          Как известно, домашние дела не кончаются никогда. Но можно хотя бы не
          ломать над ними голову. Для этого придумана система Flylady.
        </p>
        <p className="main__text">
          {" "}
          Разделите свой дом на пять зон, создайте план уборки для каждой зоны,
          и каждый день вы будете получать новое задание. Оно займёт ровно 15
          минут.
        </p>
      </div>
    </main>
  );
}

export default Main;
