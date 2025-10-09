import './Footer.css';

function Footer() {
    return (
        <footer className="site-footer">
            <div className="container footer-inner">
                <p>© {new Date().getFullYear()} — Нехорошев Евгений. Все права защищены.</p>
            </div>
        </footer>
    );
}

export default Footer;