import CookedService from "../CookedService/CookedService";
import './CookedServiceField.css';

export default function CookedServiceField({cookedServices={}, onRemoveClick}) {
    return (
        <div className='CookedServiceField'>
            <h1 className='cart-name'>Корзина</h1>
            {Array.isArray(cookedServices) && cookedServices?.map(service => (
                <li key={service.id} className="cooked-service-field">
                    <CookedService
                    logo={service.logo}
                    name={service.name}
                    type={service.type}
                    discount={service.discount}
                    total={service.total}
                    discountTotal={service.discountTotal}
                    bonusSubServices={service.subServices}
                    onRemoveClick={null}
                    onCountChange={null}
                    />// TODO Доделать методы
                </li>
            ))}
        </div>
    )
}