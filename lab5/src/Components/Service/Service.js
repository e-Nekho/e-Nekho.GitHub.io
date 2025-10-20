// Service.jsx
import { useState, useMemo, useEffect } from 'react';
import { usePriceType } from '../../Hooks/Settings'
import './Service.css'

export default function Service({
    category={},
    id=-1,
    logo='',
    name='null',
    price=0,
    types=[],
    bonuses=[],
    discount=0,
    onAddClick
}) {
    const [pickedType, setPickedType] = useState(types[0] || {});
    const [bonusesStatus, setBonusesStatus] = useState([]);
    const [count, setCount] = useState(1);
    const {symbol, coefficient, format} = usePriceType();

    useEffect(() => {
        setBonusesStatus(bonuses.map(() => false));
    }, [bonuses]);

    useEffect(() => {
        if (types.length > 0 && !pickedType.id) {
            setPickedType(types[0]);
        }
    }, [types, pickedType]);

    const handleBonusChange = (bonusId) => {
        setBonusesStatus(prev => {
            return prev.map((status, index) => 
                index === bonusId ? !status : status
            );
        });
    }

    const pickedBonuses = useMemo(() => {
        return bonuses.filter((bonus, index) => bonusesStatus[index]);
    }, [bonusesStatus, bonuses]);

    const calculateCurrentPrice = () => {
        const bonusMultiplier = pickedBonuses.reduce((total, bonus) => total + (bonus.value / 100), 0);
        const priceWithBonuses = price * (1 + bonusMultiplier);
        return priceWithBonuses * (1 - discount / 100);
    };

    const priceExpression = (basePrice) => {
        if (format === "rub") {
            return (basePrice * coefficient).toFixed(2) + symbol;
        } else {
            return symbol + (basePrice * coefficient).toFixed(2);
        }
    };

    const handleAddClick = () => {
        if (count <= 0 || !pickedType.id) return;

        const preCookedService = {
            category: category,
            id: id,
            logo: logo,
            name: name,
            type: pickedType,
            pickedBonuses: pickedBonuses,
            rawPrice: price,
            price: calculateCurrentPrice(),
            discount: discount
        };

        onAddClick(preCookedService, count);
        setCount(1); // Сброс количества после добавления
    };

    const currentPrice = calculateCurrentPrice();

    return (
        <div className="Service">
            <div className="service-logo">
                {logo && (
                    <img
                    src={logo}
                    alt={name}
                    loading="lazy"
                    onError={(e) => {
                            e.target.style.display = 'none';
                        }}
                    height={100}
                    />
                )}
            </div>
            <div className="service-container-small">
                <label className="service-name">{name}</label>
                <div className="service-container-price">
                    {discount > 0 && (
                        <label className="service-price-default">
                            {priceExpression(price)}
                        </label>
                    )}
                    <label className="service-price-discount">
                        {priceExpression(currentPrice)}
                    </label>
                    {discount > 0 && (
                        <label className="service-discount">
                            Скидка: {discount}%
                        </label>
                    )}
                </div>
            </div>
            {(types.length > 0 || bonuses.length > 0) && (
                <div className="service-addings">
                    {types.length > 0 && (
                        <div className="service-type">
                            <select 
                                name="service-type-selector"
                                onChange={(e) => setPickedType(types.find(t => t.id === Number(e.target.value)) || types[0])}
                                value={pickedType.id || ''}
                            >
                                {types.map((type) => (
                                    <option 
                                        key={type.id} 
                                        value={type.id}
                                    >
                                        {type.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    )}
                    
                    {bonuses.length > 0 && (
                        <div className="service-bonus">
                            <ul className="service-bonus-list">
                                {bonuses.map((bonus, index) => (
                                    <li key={bonus.id}>
                                        <input
                                            name="service-bonus-check"
                                            type="checkbox"
                                            checked={bonusesStatus[index] || false}
                                            onChange={() => handleBonusChange(index)}
                                        />
                                        {bonus.name}: +{Math.round(price * (bonus.value / 100))} руб.
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            )}
            <div className="service-confirmation">
                <div className="service-count-input">
                    <label className='service-count-input-label'>Количество:</label>
                    <input
                        type="number"
                        value={count}
                        min="1"
                        onChange={e => setCount(Number(e.target.value))}
                    />
                </div>
                <div className="service-addButton">
                    <input
                        type="button"
                        value="Add"
                        onClick={handleAddClick}
                        disabled={!pickedType.id || count <= 0}
                    />
                </div>
            </div>
        </div>
    );
}
/*
// Сырой сервис с учётом всех возможностей
const rawService = {
    category: {id, name}    // Берётся из функции выше
    id: number              // Задаётся в пресете
    logo: url-string        // Задаётся в пресете
    name: string            // Задаётся в пресете
    price: number           // Задаётся в пресете (Цена за штуку)
    discount: number        // Задаётся в пресете
    possibleTypes: [{id, name}] // Задаётся в отдельном пресете типов
    possibleBonuses: [{id, name, value}] // Задаётся в отдельном пресете дополнений
    count: number           // задаётся в Service() с помощью input
}

// Комплексный сервис с готовыми данными без совмещения с распределительной системой
// т.е. сервис, готовый к распределению
const preCookedService = {
    category: {id, name}    // Передаётся из rawService
    id: number,             // Передаётся из rawService
    logo: url-string,       // Передаётся из rawService
    name: string,           // Передаётся из rawService
    type: {id, name}        // Выбирается из possibleTypes[] в Service()
    pickedBonuses: [{id, name, value}] // Выбирается несколько из possibleBonuses[] в Service()
    rawPrice: number        // Высчитывается без учёта скидки для данного набора
    price: number           // Высчитывается с учётом скидки для данного набора
    discount: number,       // Передаётся из rawService
}

// Готовый сервис с набором саб-сервисов, отсортированным по отличным характеристикам
const cookedService = {
    category: {id, name}    // Передаётся из preCookedService
    id: number,             // Передаётся из preCookedService
    logo: url-string,       // Передаётся из preCookedService
    name: string,           // Передаётся из preCookedService
    type: {id, name}        // Передаётся из preCookedService
    rawprice: number        // Цена стандартного продукта для перерасчёта всех саб-сервисов // Возможно бесполезен
    rawTotalPrice: number   // Финальная цена всего элемента с саб-элементами без учёта скидки
    totalPrice: number      // Финальная цена всего элемента с саб-элементами с учётом скидки
    discount: number,       // Передаётся из preCookedService
    subServices: [{
        pickedBonuses: [{id, name, string}] // Передаётся из preCookedService, является разграничителем subService-ов
        count: number                       // Передаётся/обновляется из preCookedService
        price: number                       // передаётся/высчитывается из текущих характеристик
    }]
}

при этой структуре важно учитывать:
rawService и cookedService имеют свои jsx структуры и, соответственно, визуализацию в коде и на странице;
preCookedService же является лишь визуализацией структуры данных для косвенного вывода rawService и ввода cookedService 
*/