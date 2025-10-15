import Service from '../Service/Service'
import PickedService from '../../Hooks/PickedServices/PickedServices';

export default function ServiceField({categoryId, categoryName, services={}, types={}, bonuses={}, onAddClick}) {
    return (
        <div className="ServiceField">
            <h1 className="service-field-category">{categoryName}</h1>
            {services?.map(service => (
                <li key={service.id} className="service-field-list">
                    <Service 
                    logo={service.logo}
                    name={service.name}
                    price={service.price}
                    types={types}
                    bonuses={bonuses}
                    discount={service.discount}
                    onAddClick={onAddClick}
                    /> // TODO добавить остальные параметры и реализовать их
                </li>
            ))}
        </div>
    );
}