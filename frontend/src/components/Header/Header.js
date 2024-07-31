import "./Header.css";
import { useNavigate, Link, NavLink } from "react-router-dom";

function Header() {
  const navigate = useNavigate();
  return (
    <header className="header">
      <button
        className="header__logo"
        onClick={() => {
          navigate("/", { replace: true });
        }}
      />
      <div className="header__menu">
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
        <div>
          <ul className="header__nav">
            <li className="header__item">
              <NavLink
                to="/profile"
                className={({ isActive }) =>
                  `header__link ${isActive ? "header__link_active" : ""}`
                }
              >
                Профиль
              </NavLink>
            </li>
            <li className="header__item">
              <Link to="/exit" className="header__link">
                Выход
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
}
export default Header;
