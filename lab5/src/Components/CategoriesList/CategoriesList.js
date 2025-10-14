
export default function CategoriesList({categories, onCategoryPicked}) {
    return (
        <div className="CategoriesList">
            {categories.map((name, id )=> {
                <input
                type="radio"
                name="radio-category-1"
                id={"radio-service-" + String.toString({id})}
                onSelect={onCategoryPicked(id)}
                >{name}
                </input>
            })};
        </div>
    );
}