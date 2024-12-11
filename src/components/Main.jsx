import "./Main.css";
import { useState } from "react";
export default function Main() {
    const [ingredients, setIngredients] = useState(["Chicken", "Salt", "Pepper", "Olive Oil"]);
    
    const ingredientsListItems = ingredients.map((ingredient, index) => (
        <li key={index}>{ingredient}</li>
    ))
    
    function handleSubmit(e){
        e.preventDefault();
        console.log("Form Submitted")
        const formData = new FormData(e.currentTarget);
        const newIngredient = formData.get("ingredient");
        console.log(newIngredient);
        setIngredients([...ingredients, newIngredient]);
    }

    return (
        <main>
            <form onSubmit ={handleSubmit}className="add-ingredient-form">
                <input 
                    type="text"
                    placeholder="e.g. oregano"
                    aria-label="Add ingredient"
                    name = "ingredient"
                />
                <button>Add ingredient</button>
                </form>
                <ul>
                    {ingredientsListItems}
                </ul>
            
        </main>
    );
}