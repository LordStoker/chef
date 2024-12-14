import "./Main.css";
import { useState } from "react";
export default function Main() {
    const [ingredients, setIngredients] = useState(["Chicken", "Salt", "Pepper", "Olive Oil"]);
    
    const ingredientsListItems = ingredients.map((ingredient, index) => (
        <li key={index}>{ingredient}</li>
    ))
    
    function addIngredient(formData){
        const newIngredient = formData.get("ingredient");
        setIngredients(prevIngredients => [...prevIngredients, newIngredient]);
    }

    return (
        <main>
            <form action ={addIngredient}className="add-ingredient-form">
                <input 
                    type="text"
                    placeholder="e.g. oregano"
                    aria-label="Add ingredient"
                    name = "ingredient"
                    autoFocus = {true}
                />
                <button>Add ingredient</button>
                </form>
                <ul>
                    {ingredientsListItems}
                </ul>
            
        </main>
    );
}