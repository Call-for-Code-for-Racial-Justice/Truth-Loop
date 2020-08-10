import React, {useState} from 'react';
import PolicyRoutes from "../components/organisms/PolicyRoutes/PolicyRoutes"

const cBank = require("../policyBank/PolicyBank");

const policyCategories = cBank["categories"];

const CategoryRoutesContext = () => {
    const [categories, setCategories] = useState(policyCategories);

    return (
        <div>
            {categories.map(category => (
                <PolicyRoutes categoryId ={category.id} category={category.name}/>
            ))}
        </div>

    )

}

export default CategoryRoutesContext;