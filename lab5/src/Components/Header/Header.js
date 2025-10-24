import './Header.css';

export default function Header() {
  return (
    <header className="Header glass">
      <div className="Header-container">
        <div className="Header-logo">
          🍬
        </div>
        <div className="Header-text">
          <h1 className="Header-title">Sweet Box Store</h1>
          <p className="Header-subtitle">Собери свой идеальный набор сладостей</p>
        </div>
        <div className="Header-actions">
          <button className="Header-btn" onClick={() => {window.location.href = '../../'}}>Главная</button>
          <button className="Header-btn">Контакты</button>
        </div>
      </div>
    </header>
  );
}
