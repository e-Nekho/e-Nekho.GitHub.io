import { useState, useMemo } from 'react';
import './Service.css'

export default function Service({logo='', name='null', price=0, types={}, bonuses={}, discount=0, onAddClick}) {
    const [pickedType, setPickedType] = useState(0);
    const pickType = (event) => {
        setPickedType(event.target.value);
    }

    const [bonusesStatus, setBonusesStatus] = useState([]) // Сделать базовую инициализацию по id и false значениями
    const handleBonusChange = (Id) => {
        setBonusesStatus(prev => {
            prev.map((id, status) => id === Id ? !status : status)
        })
    }

    const pickedBonuses = useMemo(() => {
        const bonusesArray = Array.isArray(bonuses) ? bonuses : [];
        
        return bonusesArray.map(bonus => {
            // Безопасный доступ к bonusesStatus
            const statusIndex = bonus?.id ? bonus.id - 1 : 0;
            return {
                ...bonus,
                status: bonusesStatus?.[statusIndex] ?? false
            }
        });
    }, [bonusesStatus, bonuses]);

    const count = useState(0);

    return (
        <div className="Service">
            <div className="service-logo">
                <img
                src={logo}
                loading="lazy"
                size={100}
                />
            </div>
            <div className="service-container-small">
                <label className="service-name">{name}</label>
                <div className="service-container-price">
                    <label className="service-price">{price}</label>
                    <label className="service-discount">{discount}</label>
                </div>
            </div>
            <div className="service-addings">
                <div className="service-type">
                <select 
                    name="service-type-selector"
                    onChange={pickType}
                    value={pickedType}
                >
                    <option value={0}>Выберите тип</option>
                    {Array.isArray(types) ? types.map((type, index) => (
                        <option 
                            key={type.id || type || index} 
                            value={type.id || type}
                        >
                            {type.name || type}
                        </option>
                    )) : null}
                </select>
            </div>
                <div className="service-bonus">
                    <ul className="service-bonus-list">
                        {Array.isArray(bonuses) ? bonuses.map(bonus => (
                            <li key={bonus.id}>
                                <input
                                    name="service-bonus-check"
                                    type="checkbox"
                                    onChange={() => handleBonusChange(bonus.id)}
                                />
                                {bonus.name}: +{bonus.price} руб.
                            </li>
                        )) : null}
                    </ul>
                </div>
            </div>
            <div className="service-confirmation">
                <div className="service-count-input">
                    Количество:
                    <input
                    type="number"
                    value={count}
                    placeholder=''
                    />
                </div>
                <div className="service-addButton">
                    <input
                    type="button"
                    onClick={onAddClick({logo, name, price, pickedType, pickedBonuses, count})}>
                        Add
                    </input>
                </div>
            </div>
        </div>
    );
}