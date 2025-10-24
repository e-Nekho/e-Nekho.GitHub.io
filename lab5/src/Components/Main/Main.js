import { useState, useEffect, useCallback } from 'react';
import CategoriesList from '../CategoriesList/CategoriesList';
import ServiceField from '../ServiceField/ServiceField';
import ShoppingCart from '../ShoppingCart/ShoppingCart';
import './Main.css';
import '../../Adaptive.css';


export default function Main({
    categories=[{id: 0, name: 'Секрет'}],
    rawServices = [],
    typesMarmalade = [],
    typesChocolate = [],
    bonuses = [],
    servicePicker={},
    pickedServices = [],
    onAddClick,
    onRemoveClick,
    onSubRemoveClick
}) {
    const [pickedCategory, PickCategory] = useState(categories[0]);

    const onCategoryPicked = useCallback((category) => {
        PickCategory(prev => prev?.id !== category.id ? category : prev);
    }, []);

    const [pickedTypes, setPickedTypes] = useState([]);

    useEffect(() => {
        if (pickedCategory?.id === 1) {
            setPickedTypes(typesMarmalade);
        } else if (pickedCategory?.id === 2) {
            setPickedTypes(typesChocolate);
        } else {
            setPickedTypes([]);
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
            key={`${pickedCategory?.name}-${pickedCategory?.id}`}
            categoryId={pickedCategory?.id}
            categoryName={pickedCategory?.name}
            services={rawServices[pickedCategory?.id] || []}
            types={pickedTypes || []}
            bonuses={pickedCategory?.id !== 0 && pickedCategory?.id !== 1 ? bonuses : []}
            onAddClick={onAddClick} // TODO поменять на ссылку на объект
            />
            
            </div>
            <div className="main-right-container">
            <ShoppingCart
                        servicePicker={servicePicker}
                        />
            </div>
        </div>
    );
}