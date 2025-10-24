import { useState } from "react";

export const useServicePicker = () => {
    const [picked, setPicked] = useState([]);

    // Расчет цены с учетом бонусов и скидки
    const calculatePrice = (basePrice, bonuses, discount) => {
        // Суммируем бонусы (value в процентах)
        const bonusMultiplier = bonuses.reduce((total, bonus) => total + (bonus.value / 100), 0);
        const priceWithBonuses = basePrice * (1 + bonusMultiplier);
        
        // Применяем скидку
        return priceWithBonuses * (1 - discount / 100);
    };

    // Поиск основного сервиса
    const findMainService = (services, preCookedService) => {
        return services.findIndex(item =>
            item.category.id === preCookedService.category.id &&
            item.id === preCookedService.id &&
            item.type.id === preCookedService.type.id
        );
    };

    // Поиск суб-сервиса по бонусам
    const findSubService = (subServices, pickedBonuses) => {
        return subServices.findIndex(item =>
            item.pickedBonuses.length === pickedBonuses.length &&
            item.pickedBonuses.every(bonus => 
                pickedBonuses.some(pb => pb.id === bonus.id)
            )
        );
    };

    // Создание cookedService из preCookedService
    const createCookedService = (preCookedService, count) => {
        const pricePerUnit = calculatePrice(
            preCookedService.rawPrice, 
            preCookedService.pickedBonuses, 
            preCookedService.discount
        );
        
        const subService = {
            pickedBonuses: [...preCookedService.pickedBonuses],
            count: count,
            price: pricePerUnit
        };

        const rawTotalPrice = preCookedService.rawPrice * count;
        const totalPrice = pricePerUnit * count;

        return {
            category: { ...preCookedService.category },
            id: preCookedService.id,
            logo: preCookedService.logo,
            name: preCookedService.name,
            type: { ...preCookedService.type },
            rawPrice: preCookedService.rawPrice,
            rawTotalPrice: rawTotalPrice,
            totalPrice: totalPrice,
            discount: preCookedService.discount,
            subServices: [subService]
        };
    };

    // Добавление сервиса из preCookedService
    const addService = (preCookedService, count) => {
        if (count <= 0) return;

        setPicked(prev => {
            const updated = structuredClone(prev);
            const mainIndex = findMainService(updated, preCookedService);

            if (mainIndex !== -1) {
                const mainService = updated[mainIndex];
                const subIndex = findSubService(mainService.subServices, preCookedService.pickedBonuses);

                if (subIndex !== -1) {
                mainService.subServices[subIndex].count = 
                    mainService.subServices[subIndex].count + count;
                } else {
                mainService.subServices.push({
                    pickedBonuses: [...preCookedService.pickedBonuses],
                    count: count,
                    price: calculatePrice(
                    preCookedService.rawPrice,
                    preCookedService.pickedBonuses,
                    preCookedService.discount
                    )
                });
                }

                // пересчитать total
                mainService.rawTotalPrice = mainService.subServices.reduce(
                (sum, sub) => sum + (preCookedService.rawPrice * sub.count),
                0
                );
                mainService.totalPrice = mainService.subServices.reduce(
                (sum, sub) => sum + (sub.price * sub.count),
                0
                );

            } else {
                updated.push(createCookedService(preCookedService, count));
            }

            return updated;
        });
    };

    // Обновление количества суб-сервиса
    const updateSubServiceCount = (mainService, subService, newCount) => {
        if (newCount <= 0) {
            removeSubService(mainService, subService);
            return;
        }

        setPicked(prev => {
            const updated = [...prev];
            const mainIndex = findMainService(updated, mainService);

            if (mainIndex !== -1) {
                const mainServiceObj = updated[mainIndex];
                const subIndex = findSubService(mainServiceObj.subServices, subService.pickedBonuses);

                if (subIndex !== -1) {
                    mainServiceObj.subServices[subIndex].count = newCount;
                    
                    // Пересчитываем общие цены
                    mainServiceObj.rawTotalPrice = mainServiceObj.subServices.reduce(
                        (total, sub) => total + (mainServiceObj.rawPrice * sub.count), 
                        0
                    );
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
              item.type.id === service.type.id)
        ));
    };

    // Удаление суб-сервиса
    const removeSubService = (mainService, subService) => {
        setPicked(prev => {
            const updated = [...prev];
            const mainIndex = findMainService(updated, mainService);

            if (mainIndex !== -1) {
                const mainServiceObj = updated[mainIndex];
                const subIndex = findSubService(mainServiceObj.subServices, subService.pickedBonuses);

                if (subIndex !== -1) {
                    // Удаляем суб-сервис
                    mainServiceObj.subServices.splice(subIndex, 1);
                    
                    // Если не осталось суб-сервисов, удаляем основной сервис
                    if (mainServiceObj.subServices.length === 0) {
                        updated.splice(mainIndex, 1);
                    } else {
                        // Пересчитываем общие цены
                        mainServiceObj.rawTotalPrice = mainServiceObj.subServices.reduce(
                            (total, sub) => total + (mainServiceObj.rawPrice * sub.count), 
                            0
                        );
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

    // Полное очищение
    const clearServices = () => {
        setPicked([]);
    };

    // Получение основного сервиса
    const getService = (service) => {
        return picked.find(item =>
            item.category.id === service.category.id &&
            item.id === service.id &&
            item.type.id === service.type.id
        );
    };

    // Получение суб-сервиса
    const getSubService = (mainService, subService) => {
        const main = getService(mainService);
        if (main) {
            return main.subServices.find(item =>
                item.pickedBonuses.length === subService.pickedBonuses.length &&
                item.pickedBonuses.every(bonus => 
                    subService.pickedBonuses.some(pb => pb.id === bonus.id)
                )
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

    // Получение общей стоимости без скидки
    const getRawTotalPrice = () => {
        return picked.reduce((total, service) => total + service.rawTotalPrice, 0);
    };

    return {
        picked,                   // массив cookedService
        addService,               // добавление из preCookedService с количеством
        removeService,            // удаление основного сервиса
        removeSubService,         // удаление суб-сервиса
        removeServiceById,        // удаление по ID основного сервиса
        updateSubServiceCount,    // обновление количества суб-сервиса
        clearServices,            // очищение всего списка
        getService,               // получение основного сервиса
        getSubService,            // получение суб-сервиса
        getTotalCount,            // общее количество всех услуг
        getTotalPrice,            // общая стоимость со скидкой
        getRawTotalPrice          // общая стоимость без скидки
    };
};