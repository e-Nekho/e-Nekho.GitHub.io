import './CookedService.css';

export default function CookedService({
  category = {},
  id = -1,
  logo = '',
  name = 'null',
  type = {},
  discount = 0,
  totalPrice = 0,
  rawTotalPrice = 0,
  subServices = [],
  onRemoveClick,
  onCountChange
}) {
  const cookedService = {
    category,
    id,
    logo,
    name,
    type,
    totalPrice,
    rawTotalPrice,
    discount,
    subServices
  };

  // Сумма всех позиций внутри сервиса
  const totalCount = subServices.reduce((sum, s) => sum + s.count, 0);

  return (
    <div className="CookedService glass">
      <div className="cooked-service-header">
        <div className="cooked-service-info">
          <div className="cooked-service-name">{name}</div>
          <div className="cooked-service-type">{type?.name}</div>
        </div>

        <div className="cooked-service-summary">
          <span className="cooked-service-total">
            {totalPrice.toFixed(2)} ₽
          </span>
          <span className="cooked-service-count">x{totalCount}</span>
        </div>

        <div className="cooked-service-remove">
          <button onClick={() => onRemoveClick(cookedService)}>✕</button>
        </div>
      </div>

      <div className="cooked-service-body">
        {logo && (
          <div className="cooked-service-logo">
            <img
              src={logo}
              alt={name}
              loading="lazy"
              onError={(e) => (e.target.style.display = 'none')}
            />
          </div>
        )}

        <div className="cooked-service-subservices">
          {subServices.map((sub, i) => (
            <div key={i} className="subservice-row">
              <div className="subservice-bonuses">
                {sub.pickedBonuses.length > 0 ? (
                  sub.pickedBonuses.map((b) => (
                    <span key={b.id} className="bonus-tag">
                      {b.name}
                    </span>
                  ))
                ) : (
                  <span className="no-bonuses">без дополнений</span>
                )}
              </div>
              <div className="subservice-controls">
                <input
                  type="number"
                  value={sub.count}
                  min="1"
                  onChange={(e) =>
                    onCountChange(cookedService, sub, Number(e.target.value))
                  }
                />
                <span className="subservice-price">
                  {(sub.price * sub.count).toFixed(2)} ₽
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
