import "./Header.css";
import React from "react";
import { useNavigate, Link, NavLink } from "react-router-dom";

function Header({ loggedIn }) {
  const navigate = useNavigate();
  const [menuOpened, setMenuOpened] = React.useState(false);

  function openBurgerMenu() {
    setMenuOpened(true);
  }

  function closeBurgerMenu() {
    setMenuOpened(false);
  }

  console.log(menuOpened);

  return (
    <header className="header">
      <button
        className="header__logo"
        onClick={() => {
          navigate("/", { replace: true });
        }}
      />
      <div
        className={menuOpened ? "header__overlay" : ""}
        onClick={menuOpened ? closeBurgerMenu : ""}
      ></div>
      <div
        className={`header__menu ${menuOpened ? "header__menu_opened" : ""}`}
      >
        {loggedIn ? (
          <nav>
            <ul className="header__nav">
              <li className="header__item">
                <NavLink
                  to="/houses"
                  className={({ isActive }) =>
                    `header__link ${isActive ? "header__link_active" : ""}`
                  }
                >
                  Мои дома
                </NavLink>
              </li>
              <li className="header__item">
                <NavLink
                  to="/tasks"
                  className={({ isActive }) =>
                    `header__link ${isActive ? "header__link_active" : ""}`
                  }
                >
                  Задачи на сегодня
                </NavLink>
              </li>
            </ul>
          </nav>
        ) : (
          <div />
        )}
        <div>
          <ul className="header__nav">
            <li className="header__item">
              {loggedIn ? (
                <NavLink
                  to="/profile"
                  className={({ isActive }) =>
                    `header__link ${isActive ? "header__link_active" : ""}`
                  }
                >
                  Профиль
                </NavLink>
              ) : (
                <NavLink
                  to="/signup"
                  className={({ isActive }) =>
                    `header__link ${isActive ? "header__link_active" : ""}`
                  }
                >
                  Зарегистрироваться
                </NavLink>
              )}
            </li>
            <li className="header__item">
              {loggedIn ? (
                <Link to="/exit" className="header__link">
                  Выход
                </Link>
              ) : (
                <NavLink
                  to="/signin"
                  className={({ isActive }) =>
                    `header__link ${isActive ? "header__link_active" : ""}`
                  }
                >
                  Войти
                </NavLink>
              )}
            </li>
          </ul>
        </div>
      </div>
      <button
        className={`header__button ${
          menuOpened
            ? "header__button_type_close"
            : "header__button_type_burger"
        }`}
        onClick={menuOpened ? closeBurgerMenu : openBurgerMenu}
      ></button>
    </header>
  );
}
export default Header;
