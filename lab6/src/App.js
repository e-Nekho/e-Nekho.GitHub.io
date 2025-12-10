import React from 'react';
import MyCarousel from './Components/MyCarousel';
import './App.css';

// Импортируем изображения
import nature1 from './images/nature1.jpg';
import nature2 from './images/nature2.jpg';
import nature3 from './images/nature3.jpg';
import nature4 from './images/nature4.jpg';
import nature5 from './images/nature5.jpg';
import nature6 from './images/nature6.jpg';
import nature7 from './images/nature7.jpg';
import nature8 from './images/nature8.jpg';

function App() {
  const images = [
    {url: nature1},
    {url: nature2},
    {url: nature3},
    {url: nature4},
    {url: nature5},
    {url: nature6},
    {url: nature7},
    {url: nature8}
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