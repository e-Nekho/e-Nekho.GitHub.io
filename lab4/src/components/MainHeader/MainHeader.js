import './MainHeader.css';
import Logo from '../Logo/Logo';
import SiteName from '../SiteName/SiteName';
import HeaderNavigation from '../HeaderNavigation/HeaderNavigation';

function MainHeader() {
  return (
    <header className="main-header" role='banner'>
      <div className="main-header__inner">
        <Logo />
        <SiteName />
        <HeaderNavigation />
      </div>
    </header>
  );
}

export default MainHeader;