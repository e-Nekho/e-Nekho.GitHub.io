  import { useState } from "react";

export default function PickedServices() {
    const [picked, setPicked] = useState([]);

    // Универсальная функция для поиска элемента
    const findServiceIndex = (services, service) => {
    return services.findIndex(item =>
      item.id === service.id &&
      item.type === service.type &&
      item.bonus === service.bonus
    );
  };

  // Добавление или обновление сервиса
  const addService = (service) => {
    setPicked(prev => {
      const existingIndex = findServiceIndex(prev, service);

      if (existingIndex !== -1) {
        // Обновляем существующий
        const updated = [...prev];
        updated[existingIndex] = {
          ...updated[existingIndex],
          count: updated[existingIndex].count + service.count
        };
        return updated;
      } else {
        // Добавляем новый
        return [...prev, service];
      }
    });
  };
  // Удаление сервиса по всем критериям
  const removeService = (service) => {
    setPicked(prev => prev.filter(item =>
      !(item.id === service.id &&
        item.type === service.type &&
        item.bonus === service.bonus)
    ));
  };
  // Удаление по ID (если нужно именно так)
  const removeServiceById = (id) => {
    setPicked(prev => prev.filter(service => service.id !== id));
  };
  // Обновление сервиса (замена, а не добавление count)
  const updateService = (service) => {
    setPicked(prev => {
      const existingIndex = findServiceIndex(prev, service);

      if (existingIndex !== -1) {
        // Заменяем полностью
        const updated = [...prev];
        updated[existingIndex] = service;
        return updated;
      } else {
        // Если не нашли, оставляем массив без изменений или добавляем (на выбор)
        return prev; // или return [...prev, service] если нужно добавить
      }
    });
  };
  // Полное очищение
  const clearServices = () => {
    setPicked([]);
  };
  // Получение сервиса по критериям
  const getService = (service) => {
    return picked.find(item =>
      item.id === service.id &&
      item.type === service.type &&
      item.bonus === service.bonus
    );
  };
    return {
    picked,           // текущий массив
    addService,       // методы для работы с массивом
    removeService,
    removeServiceById,
    updateService,
    clearServices,
    getService
  };
  }