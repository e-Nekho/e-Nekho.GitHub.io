import { useState, useMemo } from 'react';
import './Service.css'

export default function Service({logo='', name='null', price=0, types={}, bonuses={}, discount=0, onAddClick}) {
    const [pickedType, setPickedType] = useState(0);
    const pickType = (type) => {
        setPickedType(type.target.value);
    }

    const [bonusesStatus, setBonusesStatus] = useState([]) // Сделать базовую инициализацию по id и false значениями
    const handleBonusChange = (Id) => {
        setBonusesStatus(prev => {
            prev.map((id, status) => id === Id ? !status : status)
        })
    }

    const pickedBonuses = useMemo(() => {
        bonuses.map(bonus => {
            return {
                ...bonus,
                status: bonusesStatus[bonus.id - 1]
            }
        })
    }, [bonusesStatus, bonuses])

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
                    onChange={pickType}>
                        {types?.map(type => (
                            <option
                            value={type}
                            >{type}</option>
                        )) || []}
                    </select>
                </div>
                <div className="service-bonus">
                    <ul className="service-bonus-list">
                    {bonuses?.map(bonus => (
                        <li>
                            <input
                            name="service-bonus-check"
                            type="checkbox"
                            // checked argument
                            onChange={handleBonusChange(bonus.id)}
                            >
                            {bonus.name}: +{bonus.price} руб.
                            </input>
                        </li>
                    )) || []};
                    </ul>
                </div>
            </div>
            <div className="service-addButton">
                <input
                type="button"
                onClick={onAddClick({logo, name, price, pickedType})}>
                    Add
                </input>
            </div>
        </div>
    );
}