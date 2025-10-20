import { useState } from "react";

/*
RawService = {id: number, logo: string-url, name: string, price: number, possibleTypes[]:object[], possibleBonuses[]: object[], discount: number}
CookedService = {category: {id: number, name: string}, id === raw.id, logo === raw.logo, name === raw.name, pickedType: possibleTypes[id], totalPrice: number, discount === raw.discount, subServices[]: object[]}
subService = {pickedBonuses[]: possibleBonuses[startId : endId], count: number, price: number}
*/

export const useServicePicker = () => {
    const [picked, setPicked] = useState([]);

    // Поиск основного сервиса
    const findMainService = (services, service) => {
        return services.findIndex(item =>
            item.category.id === service.category.id &&
            item.id === service.id &&
            item.pickedType.id === service.pickedType.id
        );
    };

    // Поиск суб-сервиса в основном сервисе
    const findSubService = (subServices, subService) => {
        return subServices.findIndex(item =>
            JSON.stringify(item.pickedBonuses) === JSON.stringify(subService.pickedBonuses)
        );
    };

    // Добавление сервиса
    const addService = (service) => {
        setPicked(prev => {
            const updated = [...prev];
            const mainIndex = findMainService(updated, service);

            if (mainIndex !== -1) {
                // Основной сервис существует, работаем с суб-сервисами
                const mainService = updated[mainIndex];
                const subServiceToAdd = service.subServices[0]; // Берем первый суб-сервис из добавляемого
                
                const subIndex = findSubService(mainService.subServices, subServiceToAdd);

                if (subIndex !== -1) {
                    // Суб-сервис существует, увеличиваем количество
                    mainService.subServices[subIndex].count += subServiceToAdd.count;
                } else {
                    // Суб-сервис не существует, добавляем новый
                    mainService.subServices.push(subServiceToAdd);
                }

                // Пересчитываем общую цену основного сервиса
                mainService.totalPrice = mainService.subServices.reduce(
                    (total, sub) => total + (sub.price * sub.count), 
                    0
                );
            } else {
                // Основного сервиса не существует, добавляем полностью новый
                updated.push(service);
            }

            return updated;
        });
    };

    // Обновление количества суб-сервиса
    const updateSubServiceCount = (mainService, subService, newCount) => {
        setPicked(prev => {
            const updated = [...prev];
            const mainIndex = findMainService(updated, mainService);

            if (mainIndex !== -1) {
                const mainServiceObj = updated[mainIndex];
                const subIndex = findSubService(mainServiceObj.subServices, subService);

                if (subIndex !== -1) {
                    mainServiceObj.subServices[subIndex].count = newCount;
                    
                    // Пересчитываем общую цену
                    mainServiceObj.totalPrice = mainServiceObj.subServices.reduce(
                        (total, sub) => total + (sub.price * sub.count), 
                        0
                    );
                }
            }

            return updated;
        });
    };

    // Удаление основного сервиса (со всеми суб-сервисами)
    const removeService = (service) => {
        setPicked(prev => prev.filter(item =>
            !(item.category.id === service.category.id &&
              item.id === service.id &&
              item.pickedType.id === service.pickedType.id)
        ));
    };

    // Удаление суб-сервиса
    const removeSubService = (mainService, subService) => {
        setPicked(prev => {
            const updated = [...prev];
            const mainIndex = findMainService(updated, mainService);

            if (mainIndex !== -1) {
                const mainServiceObj = updated[mainIndex];
                const subIndex = findSubService(mainServiceObj.subServices, subService);

                if (subIndex !== -1) {
                    // Удаляем суб-сервис
                    mainServiceObj.subServices.splice(subIndex, 1);
                    
                    // Если не осталось суб-сервисов, удаляем основной сервис
                    if (mainServiceObj.subServices.length === 0) {
                        updated.splice(mainIndex, 1);
                    } else {
                        // Пересчитываем общую цену
                        mainServiceObj.totalPrice = mainServiceObj.subServices.reduce(
                            (total, sub) => total + (sub.price * sub.count), 
                            0
                        );
                    }
                }
            }

            return updated;
        });
    };

    // Удаление по ID основного сервиса
    const removeServiceById = (id) => {
        setPicked(prev => prev.filter(service => service.id !== id));
    };

    // Обновление основного сервиса (полная замена)
    const updateService = (service) => {
        setPicked(prev => {
            const updated = [...prev];
            const existingIndex = findMainService(updated, service);

            if (existingIndex !== -1) {
                updated[existingIndex] = service;
                return updated;
            }
            
            return prev;
        });
    };

    // Полное очищение
    const clearServices = () => {
        setPicked([]);
    };

    // Получение основного сервиса
    const getService = (service) => {
        return picked.find(item =>
            item.category.id === service.category.id &&
            item.id === service.id &&
            item.pickedType.id === service.pickedType.id
        );
    };

    // Получение суб-сервиса
    const getSubService = (mainService, subService) => {
        const main = getService(mainService);
        if (main) {
            return main.subServices.find(item =>
                JSON.stringify(item.pickedBonuses) === JSON.stringify(subService.pickedBonuses)
            );
        }
        return null;
    };

    // Получение общего количества всех услуг
    const getTotalCount = () => {
        return picked.reduce((total, service) => {
            return total + service.subServices.reduce((subTotal, sub) => subTotal + sub.count, 0);
        }, 0);
    };

    // Получение общей стоимости
    const getTotalPrice = () => {
        return picked.reduce((total, service) => total + service.totalPrice, 0);
    };

    return {
        picked,                   // текущий массив CookedService
        addService,               // добавление сервиса
        removeService,            // удаление основного сервиса по category, id, type
        removeSubService,         // удаление суб-сервиса по bonuses
        removeServiceById,        // удаление по ID основного сервиса
        updateService,            // обновление основного сервиса
        updateSubServiceCount,    // обновление количества суб-сервиса
        clearServices,            // очищение всего списка
        getService,               // получение основного сервиса
        getSubService,            // получение суб-сервиса
        getTotalCount,            // общее количество всех услуг
        getTotalPrice             // общая стоимость
    };
};