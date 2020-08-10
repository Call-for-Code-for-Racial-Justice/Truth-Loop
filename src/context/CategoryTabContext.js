import React, {useState} from 'react';
import CategoryTab from "../components/atoms/CategoryTab"

const cBank = require("../policyBank/PolicyBank");

const policyCategories = cBank["categories"];

const CategoryTabContext = () => {
    const [categories, setCategories] = useState(policyCategories);

    return (
        <div>
            {categories.map(category => (
                <CategoryTab categoryId ={category.id} category={category.name}/>
            ))}
        </div>

    )

}

export default CategoryTabContext;