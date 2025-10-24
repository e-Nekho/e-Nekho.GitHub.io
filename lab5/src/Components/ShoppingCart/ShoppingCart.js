import { useState, useMemo } from "react";
import CookedService from "../CookedService/CookedService";
import "./ShoppingCart.css";
import '../../Adaptive.css';

export default function ShoppingCart({ servicePicker = {} }) {
  const [expanded, setExpanded] = useState({});

  // сортировка по категории и id
  const sortedServices = useMemo(() => {
    return [...(servicePicker.picked || [])].sort((a, b) => {
      if (a.category.id !== b.category.id)
        return a.category.id - b.category.id;
      return a.id - b.id;
    });
  }, [servicePicker.picked]);

  const toggleExpand = (key) => {
    setExpanded((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="cart glass">
      <div className="cart-header">
        <h2>🛒 Корзина</h2>
        <span className="cart-count">{servicePicker.getTotalCount()} поз.</span>
      </div>

      <div className="cart-list">
        {sortedServices.length === 0 ? (
          <p className="cart-empty">Пока пусто 😔</p>
        ) : (
          sortedServices.map((service) => {
            const key = `${service.category.id}-${service.id}-${service.type.id}`;
            const isOpen = expanded[key];
            return (
              <div key={key} className="cart-item-group">
                <div
                  className="cart-item-header"
                  onClick={() => toggleExpand(key)}
                >
                  <CookedService
                    key={`${service.category.id}-${service.id}-${service.type.id}`}
                    category={service.category}
                    id={service.id}
                    logo={service.logo}
                    name={service.name}
                    type={service.type}
                    discount={service.discount}
                    totalPrice={service.totalPrice}
                    rawTotalPrice={service.rawTotalPrice}
                    subServices={[]}
                    onRemoveClick={servicePicker.removeService}
                  />
                  <span className={`expand-toggle ${isOpen ? "open" : ""}`}>
                    {isOpen ? "▲" : "▼"}
                  </span>
                </div>

                {isOpen && (
                  <div className="cart-subservices">
                    {service.subServices.map((sub, i) => (
                      <div key={i} className="subservice-item">
                        <div className="subservice-left">
                          <ul>
                            {sub.pickedBonuses.length > 0 ? (
                              sub.pickedBonuses.map((b) => (
                                <li key={b.id}>{b.name}</li>
                              ))
                            ) : (
                              <li className="no-bonuses">без дополнений</li>
                            )}
                          </ul>
                        </div>
                        <div className="subservice-right">
                          <input
                            type="number"
                            min="1"
                            value={sub.count}
                            onChange={(e) =>
                              servicePicker.updateSubServiceCount(
                                service,
                                sub,
                                Number(e.target.value)
                              )
                            }
                          />
                          <span className="price">
                            {(sub.price * sub.count).toFixed(2)} ₽
                          </span>
                          <button
                            className="remove-sub"
                            onClick={() =>
                              servicePicker.removeSubService(service, sub)
                            }
                          >
                            ✕
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      <div className="cart-footer glass">
        <div className="cart-total">
          <span>Итого:</span>
          <strong>{servicePicker.getTotalPrice().toFixed(2)} ₽</strong>
        </div>
        <div className="cart-buttons">
          <button className="btn-buy">Купить</button>
          <button className="btn-clear" onClick={servicePicker.clearServices}>
            Очистить
          </button>
        </div>
      </div>
    </div>
  );
}
