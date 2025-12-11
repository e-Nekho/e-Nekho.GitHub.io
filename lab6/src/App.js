import React, { useState, useEffect } from 'react';
import MyCarousel from './Components/MyCarousel';
import './App.css';

function App() {
  const [images, setImages] = useState([]);

  useEffect(() => {
    // Динамическая загрузка изображений
    const imagePaths = [
      'images/nature1.jpg',
      'images/nature2.jpg',
      'images/nature3.jpg',
      'images/nature4.jpg',
      'images/nature5.jpg',
      'images/nature6.jpg',
      'images/nature7.jpg',
      'images/nature8.jpg'
    ];

    const loadedImages = imagePaths.map((path, index) => ({
      url: `${process.env.PUBLIC_URL}/${path}`,
      alt: `Природа ${index + 1}`
    }));

    setImages(loadedImages);
  }, []);

  return (
    <div className="App">
      <header className="nature-header">
        <h1>🌿 Галерея Природы</h1>
        <p className="subtitle">Путешествие в мир естественной красоты</p>
      </header>
      
      <main className="main-content">
        <div className="carousel-container">
          {images.length > 0 ? (
            <MyCarousel images={images} />
          ) : (
            <div className="loading">Загрузка изображений...</div>
          )}
        </div>
      </main>
      
      <footer className="nature-footer">
        <p>© 2024 Галерея Природы</p>
      </footer>
    </div>
  );
}

export default App;