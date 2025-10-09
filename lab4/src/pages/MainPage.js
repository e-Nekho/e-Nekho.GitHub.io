import MainHeader from '../components/MainHeader/MainHeader';
import Footer from '../components/Footer/Footer';
import MainContent from '../components/MainContent/MainContent';
import MainNavigation from '../components/MainNavigation/MainNavigation';

function MainPage() {
  return (
    <div className='main-page'>
      <MainHeader />
      <MainNavigation />
      <MainContent />
      <Footer />
    </div>
  );
}

export default MainPage;