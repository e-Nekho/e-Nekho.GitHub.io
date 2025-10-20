import './SubService.css'

export default function SubService({
    mainService={},
    bonuses={},
    count=0,
    price=0,
    onSubRemoveClick,
    OnCountUpdate
}) {
    const subService = {
        pickedBonuses: bonuses ?? [],
        count: count,
        price: price
    }

    if (serviceCategoryId === -1 ||
        serviceId === -1 ||
        serviceTypeId === -1
    ) return (
        <div className='SubService'>
            <div className='null-error'>Error!</div>
        </div>
    )
    
    return (
        <div className='SubService'>
            <div className='sub-service-main-field'>
                <div className='sub-service-bonuses-list'>
                    <label className='sub-service-bonuses-name'>Дополнения:</label>
                    {bonuses?.map(bonus => (
                        <li key={bonus.id} className='sub-service-bonuses-item'>
                            {bonus.name}
                        </li>
                    )) || (
                        <label>отсутствуют</label>
                    )}
                </div>
                <div className='sub-service-info'>
                    <div className='sub-service-count'>
                        <input
                        type='number'
                        value={count}
                        placeholder='Кол-во'
                        min='0'
                        onChange={(e) => {
                            const value = parseInt(event.target.value) || 0
                            OnCountUpdate(mainService, subService, e.target.value)
                        }}
                        />
                    </div>
                    <div className='sub-service-price'>
                        {price}
                    </div>
                </div>
            </div>
            <div className='sub-service-sub-field'>
                <div className='sub-service-remove-button'>
                    <input
                    type='button'
                    value='X'
                    onClick={onSubRemoveClick(mainService, subService)}
                    />// TODO Поменять на изображение
                </div>
            </div>
        </div>
    )
}