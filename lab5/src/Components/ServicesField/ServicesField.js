import Service from '../Service/Service'

export default function ServiceField({category, services={}}) {
    return (
        <div className="ServiceField">
            <h1 className="service-field-category">{category}</h1>
            <li className="service-field-list">
                {services?.map(service => (
                    <Service 
                    logo={service.logo}
                    name={service.name}
                    price={service.price}
                    discount={service.discount}
                    /> // TODO добавить остальные параметры и реализовать их
                ))}
            </li>
        </div>
    );
}