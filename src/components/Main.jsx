import IngredientsList from "./IngredientsList";
import "./Main.css";
import { useState } from "react";
import ClaudeRecipe from "./ClaudeRecipe";
import {getRecipeFromMistral} from "../ai.js";


export default function Main() {
    const [ingredients, setIngredients] = useState([]);
    const [recipe, setRecipe] = useState("");
    const ingredientsListItems = ingredients.map((ingredient, index) => (
        <li key={index}>{ingredient}</li>
    ))

    async function getRecipe() {
        const recipeMarkdown = await getRecipeFromMistral(ingredients);
        setRecipe(recipeMarkdown);        
    }
    function addIngredient(formData){
        const newIngredient = formData.get("ingredient");
        setIngredients(prevIngredients => [...prevIngredients, newIngredient]);
    }

    return (
        <main>
            <form action={addIngredient}className="add-ingredient-form">
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
                    recipeReady={getRecipe}
                />
                }
                {recipe && <ClaudeRecipe 
                    recipe={recipe}
                />}
            
        </main>
    );
}