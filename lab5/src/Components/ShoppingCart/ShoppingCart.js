import CookedService from "../CookedService/CookedService"

export default function ShoppingCart({servicePicker = {}}) {
    // Добавить автоматическое открытие при добавлении покупки
    // Добавить отображение Total при закрытии корзины в правом-нижнем углу
    return (
        <div className="cart">
            <h2>Корзина ({servicePicker.getTotalCount()} услуг)</h2>
            <h3>Итого: {servicePicker.getTotalPrice().toFixed(2)} руб.</h3>
            
            {servicePicker.picked.map(service => (
                <CookedService
                    key={`${service.id}-${service.type.id}`}
                    category={service.category}
                    id={service.id}
                    logo={service.logo}
                    name={service.name}
                    type={service.type}
                    discount={service.discount}
                    totalPrice={service.totalPrice}
                    rawTotalPrice={service.rawTotalPrice}
                    subServices={service.subServices}
                    onRemoveClick={servicePicker.removeService}
                    onCountChange={servicePicker.updateSubServiceCount}
                />
            ))}

            <button onClick={servicePicker.clearServices}>
                Очистить корзину
            </button>
        </div>
    )
}