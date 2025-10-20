import './CookedService.css'

export default function CookedService({
    category={},
    id=-1,
    logo='',
    name='null',
    type={},
    discount=0,
    totalPrice=0,
    rawTotalPrice=0,
    subServices=[],
    onRemoveClick,
    onCountChange
}) {
    const cookedService = {
        category: category,
        id: id,
        logo: logo,
        name: name,
        type: type,
        totalPrice: totalPrice,
        rawTotalPrice: rawTotalPrice,
        discount: discount,
        subServices: subServices
    }

    return (
        <div className='CookedService'>
            <div className='cooked-service-container-top'>
                <div className='cooked-service-logo'>
                    {logo && (
                        <img
                        src={logo}
                        alt={name}
                        loading='lazy'
                        onError={(e) => {
                                // Fallback при ошибке загрузки
                                e.target.style.display = 'none';
                            }}
                        height={75}
                        />
                    )}
                </div>
                <div className='cooked-service-container-name'>
                    <label className='cooked-service-name'>{name}</label>
                    <label className='cooked-service-type'>{type.name}</label>
                </div>
                <div className='cooked-service-container-price'>
                    <div className='cooked-service-container-remove-button'>
                        <input
                        type='button'
                        value='X'
                        onClick={() => onRemoveClick(cookedService)}
                        />
                    </div>
                </div>
                <div className='cooked-service-container-bottom'>
                    // TODO не редактировалось и отсутствует управление
                    {subServices.map((subService, index) => (
                    <div key={index} className='cooked-service-subservice'>
                        <div className='subservice-bonuses'>
                            {subService.pickedBonuses.map(bonus => (
                                <span key={bonus.id} className='bonus-tag'>
                                    {bonus.name}
                                </span>
                            ))}
                        </div>
                        <div className='subservice-controls'>
                            <input
                                type="number"
                                value={subService.count}
                                onChange={(e) => onCountChange(
                                    cookedService, 
                                    subService, 
                                    Number(e.target.value)
                                )}
                                min="1"
                            />
                            <span className='subservice-price'>
                                {(subService.price * subService.count).toFixed(2)} руб.
                            </span>
                        </div>
                    </div>
                ))}
                </div>
            </div>
        </div>
    )
}