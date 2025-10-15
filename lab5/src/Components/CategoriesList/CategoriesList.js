
export default function CategoriesList({categories, onCategoryPicked}) {
    return (
        <div className="CategoriesList">
            {categories.map((id, name) => {
                <div className="category-list-item">
                    <input
                    type="radio"
                    name="radio-category-1"
                    id={"radio-service-" + String.toString({id})}
                    onSelect={() => onCategoryPicked({id, name})}
                    >{name}
                    </input>
                </div>
            })}
        </div>
    );
}