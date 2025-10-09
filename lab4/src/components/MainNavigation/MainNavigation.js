import { useRef, useState } from 'react';
import { useEffect } from 'react';

import './MainNavigation.css';

function MainNavigation() {
    const [hidden, setHidden] = useState(false);
    const lastScroll = useRef(0);
    const hover = useRef(false);

    useEffect(() => {
        const onScroll = () => {
            const y = window.scrollY;
            if (y > lastScroll.current && y > 100 && !hover.current) {
                setHidden(true);
            } else {
                setHidden(false);
            }
            lastScroll.current = y;
        };
        window.addEventListener('scroll', onScroll, {passive: true});
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    return (
    <div
        className={`main-navigation ${hidden ? 'main-navigation--hidden' : ''}`}
        onMouseEnter={() => { hover.current = true; setHidden(false); }}
        onMouseLeave={() => { hover.current = false; }}
    >
        <div className="container">
            <ul className="main-navigation__list">
                <li><a href="#section1">Котики</a></li>
                <li><a href="#section2">Собачки</a></li>
                <li><a href="#section3">Хомячки</a></li>
                <li><a href="https://армиярф.рф/">Контракт</a></li>
            </ul>
        </div>
    </div>
    );
}

export default MainNavigation;