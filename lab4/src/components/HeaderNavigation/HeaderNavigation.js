import './HeaderNavigation.css';

function HeaderNavigation() {
  return (
    <nav className="header-nav" aria-label="header navigation">
      <div className="header-nav__row header-nav__row--top">
        <div className="header-nav__left">
          <a href="#" className="nav-link">Home</a>
          <a href="#" className="nav-link">Account</a>
        </div>
        <div className="header-nav__right">
          <button className="btn-logout" type="button">Выйти</button>
        </div>
      </div>
      <div className="header-nav__row header-nav__row--lang">
        <button className="lang-btn">Rus</button>
        <button className="lang-btn">Eng</button>
      </div>
    </nav>
);
}

export default HeaderNavigation;