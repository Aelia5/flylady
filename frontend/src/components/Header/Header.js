import './Header.css';
import React from 'react';
import { useNavigate, NavLink } from 'react-router-dom';

function Header({ loggedIn, signOut }) {
  const navigate = useNavigate();
  const [menuOpened, setMenuOpened] = React.useState(false);

  function openBurgerMenu() {
    setMenuOpened(true);
  }

  function closeBurgerMenu() {
    setMenuOpened(false);
  }

  function onExit() {
    if (menuOpened) {
      closeBurgerMenu();
    }
    signOut();
  }

  return (
    <header className="header">
      <button
        className="header__logo"
        onClick={() => {
          navigate('/', { replace: true });
        }}
      />
      <div
        className={menuOpened ? 'header__overlay' : ''}
        onClick={menuOpened ? closeBurgerMenu : undefined}
      ></div>
      <div
        className={`header__menu ${menuOpened ? 'header__menu_opened' : ''}`}
      >
        {loggedIn ? (
          <nav>
            <ul className="header__nav">
              <li className="header__item">
                <NavLink
                  to="/houses"
                  className={({ isActive }) =>
                    `header__link ${isActive ? 'header__link_active' : ''}`
                  }
                  onClick={menuOpened ? closeBurgerMenu : undefined}
                >
                  Мои дома
                </NavLink>
              </li>
              <li className="header__item">
                <NavLink
                  to="/today"
                  className={({ isActive }) =>
                    `header__link ${
                      isActive ? 'header__link_active' : undefined
                    }`
                  }
                  onClick={menuOpened ? closeBurgerMenu : ''}
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
                    `header__link ${
                      isActive ? 'header__link_active' : undefined
                    }`
                  }
                  onClick={menuOpened ? closeBurgerMenu : ''}
                >
                  Профиль
                </NavLink>
              ) : (
                <NavLink
                  to="/signup"
                  className={({ isActive }) =>
                    `header__link ${
                      isActive ? 'header__link_active' : undefined
                    }`
                  }
                  onClick={menuOpened ? closeBurgerMenu : ''}
                >
                  Зарегистрироваться
                </NavLink>
              )}
            </li>
            <li className="header__item">
              {loggedIn ? (
                <button className="header__link" onClick={onExit}>
                  Выход
                </button>
              ) : (
                <NavLink
                  to="/signin"
                  className={({ isActive }) =>
                    `header__link ${isActive ? 'header__link_active' : ''}`
                  }
                  onClick={menuOpened ? closeBurgerMenu : undefined}
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
            ? 'header__button_type_close'
            : 'header__button_type_burger'
        }`}
        onClick={menuOpened ? closeBurgerMenu : openBurgerMenu}
      ></button>
    </header>
  );
}
export default Header;
