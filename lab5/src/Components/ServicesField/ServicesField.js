import Service from '../Service/Service'

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
                    /> 
                </li>
            ))}
        </div>
    );
}