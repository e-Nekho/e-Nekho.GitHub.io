import { useState, useEffect, useCallback } from 'react';
import { useServicePicker } from '../../Hooks/PickServices';
import CategoriesList from '../CategoriesList/CategoriesList';
import ServiceField from '../ServiceField/ServiceField';
import CookedServiceField from '../CookedServiceField/CookedServiceField'
import './Main.css';


export default function Main({
    categories=[{id: 0, name: 'Секрет'}],
    rawServices = {},
    typesMarmalade = {},
    typesChocolate = {},
    bonuses = {},
    pickedServices = {},
    onAddClick,
    onRemoveClick,
    onSubRemoveClick
}) {
    const [pickedCategory, PickCategory] = useState(categories[0]);

    const onCategoryPicked = useCallback((category) => {
        PickCategory(prev => prev?.id !== category.id ? category : prev);
    }, []);

    const [pickedType, setPickedType] = useState([]);

    useEffect(() => {
        if (pickedCategory?.id === 1) {
            setPickedType(typesMarmalade);
        } else if (pickedCategory?.id === 2) {
            setPickedType(typesChocolate);
        } else {
            setPickedType([]);
        }
    }, [pickedCategory, typesMarmalade, typesChocolate]);

    return (
        <div className="Main">
            <div className="main-left-container">
            <CategoriesList
            categories={categories}
            onCategoryPicked={onCategoryPicked}
            selectedCategoryId={pickedCategory?.id}
            />
            <ServiceField
            categoryId={pickedCategory?.id}
            categoryName={pickedCategory?.name}
            services={rawServices[pickedCategory?.id] || []}
            types={pickedType}
            bonuses={pickedCategory?.id !== 0 && pickedCategory?.id !== 1 ? bonuses : []}
            onAddClick={onAddClick} // TODO поменять на ссылку на объект
            />
            <CookedServiceField
            />
            </div>
            <div className="main-right-container">

            </div>
        </div>
    );
}