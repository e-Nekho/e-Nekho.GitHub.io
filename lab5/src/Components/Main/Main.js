import { useState } from 'react';
import CategoriesList from '../CategoriesList/CategoriesList';
import ServicesField from '../ServicesField/ServicesField';
import './Main.css';


export default function Main({categories={}, rawServices = {}, pickedServices = {}, totalServices = {}}) {
    const [pickedCategory, PickCategory] = useState(1);

    const onCategoryPicked = (category) => {
        PickCategory(category.target.value);
    }

    return (
        <div className="Main">
            <CategoriesList categories={categories} onCategoryPicked={onCategoryPicked}/>
            <ServicesField category={pickedCategory} services={rawServices[pickedCategory-1] || []}/>
        </div>
    );
}