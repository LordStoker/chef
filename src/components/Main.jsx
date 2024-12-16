import IngredientsList from "./IngredientsList";
import "./Main.css";
import { useState } from "react";
import ClaudeRecipe from "./ClaudeRecipe";

export default function Main() {
    const [ingredients, setIngredients] = useState(["all the main spices", "tomato paste", "pasta", "ground beef", ]);
    const [recipeShown, setRecipeShown] = useState(false);
    
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
                {ingredientsListItems.length > 0 &&
                    <IngredientsList 
                    ingredients={ingredientsListItems}
                    recipeReady={setRecipeShown}
                />
                }
                {recipeShown && <ClaudeRecipe />}

            
        </main>
    );
}