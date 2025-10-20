import { useState, useMemo, useEffect } from 'react';
import { usePriceType } from '../../Hooks/Settings'
import { CalculateProduct } from '../../Hooks/Calculate';
import './Service.css'

export default function Service({logo='', name='null', price=0, types={}, bonuses={}, discount=0, onAddClick}) {
    const [pickedType, setPickedType] = useState(0);
    
    const pickType = (event) => {
        setPickedType(Number(event.target.value));
    }

    const [bonusesStatus, setBonusesStatus] = useState([]);
    
    useEffect(() => {
        const bonusesArray = Array.isArray(bonuses) ? bonuses : [];
        setBonusesStatus(bonusesArray.map(() => false));
    }, [bonuses]);

    const handleBonusChange = (bonusId) => {
        setBonusesStatus(prev => {
            return prev.map((status, index) => 
                index === bonusId - 1 ? !status : status
            );
        });
    }

    const pickedBonuses = useMemo(() => {
        const bonusesArray = Array.isArray(bonuses) ? bonuses : [];
        
        return bonusesArray.map((bonus, index) => {
            return {
                ...bonus,
                status: bonusesStatus[index] ?? false
            };
        });
    }, [bonusesStatus, bonuses]);

    const [count, setCount] = useState(0);
    const {symbol, coefficient, format} = usePriceType();

    const priceExpression = () => {
        const newPrice = CalculateProduct(price, 1, discount).total;
        if (format === "rub")
            return (newPrice * coefficient) + symbol;
        else
            return symbol + (newPrice * coefficient)
    }
    return (
        <div className="Service">
            <div className="service-logo">
                {logo && (
                    <img
                    src={logo}
                    alt={name}
                    loading="lazy"
                    onError={(e) => {
                            // Fallback при ошибке загрузки
                            e.target.style.display = 'none';
                        }}
                        height={100} // TODO Изменить при необходимости
                    />
                    
                )}
            </div>
            <div className="service-container-small">
                <label className="service-name">{name}</label>
                <div className="service-container-price">
                    {discount > 0 && <label className="service-price-default">{price}</label>}
                    <label className="service-price-discount">{priceExpression()}</label>
                    {discount > 0 && <label className="service-discount">Скидка: {discount}%</label>}
                </div>
            </div>
            {(types?.length > 0 || bonuses?.length > 0) && (
                <div className="service-addings">
                    {types?.length > 0 && (
                        <div className="service-type">
                            <select 
                                name="service-type-selector"
                                onChange={pickType}
                                value={pickedType}
                            >
                                <option value={0}>Выберите тип</option>
                                {types.map(({id, type}, index) => (
                                    <option 
                                        key={id || index} 
                                        value={id || index}
                                    >
                                        {type}
                                    </option>
                                ))}
                            </select>
                        </div>
                    )}
                    
                    {bonuses?.length > 0 && (
                        <div className="service-bonus">
                            <ul className="service-bonus-list">
                                {bonuses.map(bonus => (
                                    <li key={bonus.id}>
                                        <input
                                            name="service-bonus-check"
                                            type="checkbox"
                                            checked={bonusesStatus[bonus.id - 1] || false}
                                            onChange={() => handleBonusChange(bonus.id)}
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
                    Количество:
                    <input
                        type="number"
                        value={count}
                        onChange={e => setCount(Number(e.target.value))}
                    />
                </div>
                <div className="service-addButton">
                    <input
                        type="button"
                        value="Add"
                        onClick={() => onAddClick({logo, name, price, pickedType, pickedBonuses, count})}
                    />
                </div>
            </div>
        </div>
    );
}