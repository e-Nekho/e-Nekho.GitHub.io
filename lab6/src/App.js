import React from 'react';
import MyCarousel from './Components/MyCarousel';
import './App.css';

function App() {
  const images = [
    {url: '/images/nature1.jpg'},
    {url: '/images/nature2.jpg'},
    {url: '/images/nature3.jpg'},
    {url: '/images/nature4.jpg'},
    {url: '/images/nature5.jpg'},
    {url: '/images/nature6.jpg'},
    {url: '/images/nature7.jpg'},
    {url: '/images/nature8.jpg'}
  ];

  return (
    <div className="App">
      <header className="nature-header">
        <h1>🌿 Галерея Природы</h1>
        <p className="subtitle">Путешествие в мир естественной красоты</p>
      </header>
      
      <main className="main-content">
        <div className="carousel-container">
          <MyCarousel images={images} />
        </div>
        
        <div className="nature-quote">
          <blockquote>
            "Природа — это бесконечная сфера, центр которой везде, а окружность нигде"
            <footer>— Блез Паскаль</footer>
          </blockquote>
        </div>
      </main>
      
      <footer className="nature-footer">
        <p>© 2025 Галерея Природы.</p>
      </footer>
    </div>
  );
}

export default App;