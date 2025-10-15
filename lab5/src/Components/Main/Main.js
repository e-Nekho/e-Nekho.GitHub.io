import { useState, useEffect, useCallback } from 'react';
import CategoriesList from '../CategoriesList/CategoriesList';
import ServicesField from '../ServicesField/ServicesField';
import './Main.css';


export default function Main({categories=[{id: 0, name: 'Секрет'}], rawServices = {}, typesMarmalade = {}, typesChocolate = {}, bonuses = {}, pickedServices = {}, total = {}}) {
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
            <CategoriesList categories={categories} onCategoryPicked={onCategoryPicked}/>
            <ServicesField
            categoryId={pickedCategory?.id}
            categoryName={pickedCategory?.name}
            services={rawServices[pickedCategory?.id] || []}
            type={pickedType}
            bonus={pickedCategory?.id !== 0 && pickedCategory?.id !== 1 ? bonuses : []}
            onAddClick={pickedServices.addService}
            />
            </div>
            <div className="main-right-container">

            </div>
        </div>
    );
}