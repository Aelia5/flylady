import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <li className="footer__list">
        <ul className="footer__list-item">
          Веб-разработка:{" "}
          <a
            href="https://github.com/Aelia5"
            className="footer__link"
            target="_blank"
            rel="noreferrer"
          >
            О.В. Любимова
          </a>
        </ul>
        <ul className="footer__list-item">
          Логотип:{" "}
          <a
            href="https://www.artstation.com/sabinatariverdieva2"
            className="footer__link"
            target="_blank"
            rel="noreferrer"
          >
            Sabina Tari
          </a>
        </ul>
      </li>
      <li className="footer__list">
        <ul className="footer__list-item">
          Авторы идеи:{" "}
          <a
            href="http://flylady.net/"
            className="footer__link"
            target="_blank"
            rel="noreferrer"
          >
            Проект Flylady
          </a>
        </ul>
        <ul className="footer__list-item">
          Русский перевод списка задач:{" "}
          <a
            href="https://www.flylady.ru/bases/1086/"
            className="footer__link"
            target="_blank"
            rel="noreferrer"
          >
            Клуб Flylady.ru
          </a>
        </ul>
      </li>
    </footer>
  );
}

export default Footer;
