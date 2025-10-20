import './CookedService.css'

export default function CookedService({
    category={},
    id=-1,
    logo='',
    name='null',
    type={},
    discount=0,
    total=0,
    discountTotal=0,
    bonusSubServices={},
    onRemoveClick,
    oncountChange
}) {
    const cookedService = {
        category: category,
        id: id,
        logo: logo,
        name: name,
        pickedType: type,
        totalPrice: total,
        discount: discount,
        subServices: bonusSubServices ?? []
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
                    <label className='cooked-service-type'>{type}</label>
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
                    
                </div>
            </div>
        </div>
    )
}