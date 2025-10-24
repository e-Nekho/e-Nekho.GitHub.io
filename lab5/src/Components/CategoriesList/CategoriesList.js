import './CategoriesList.css'

export default function CategoriesList({categories, onCategoryPicked, selectedCategoryId}) {
    // Если не передано значение по умолчанию, используем первую категорию
    const defaultSelected = selectedCategoryId ?? (categories[0]?.id || 0);
    
    return (
        <div className="CategoriesList">
            {categories.map((category) => (
                <div key={category.id} className="category-list-item">
                    <input
                        type="radio"
                        name="radio-category"
                        id={`radio-category-${category.id}`}
                        checked={defaultSelected === category.id}
                        onChange={() => onCategoryPicked(category)}
                    />
                    <label htmlFor={`radio-category-${category.id}`}>
                        {category.name}
                    </label>
                </div>
            ))}
        </div>
    );
}