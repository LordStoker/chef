import IngredientsList from "./IngredientsList";
import "./Main.css";
import { useState } from "react";
import ClaudeRecipe from "./ClaudeRecipe";
import {getRecipeFromMistral} from "../ai.js";
import {useRef} from "react";
import { useEffect } from "react";


export default function Main() {
    const [ingredients, setIngredients] = useState([]);
    const [recipe, setRecipe] = useState("");
    const recipeSection = useRef(null);
    const ingredientsListItems = ingredients.map((ingredient, index) => (
        <li key={index}>{ingredient}</li>
    ))
    // Scroll to the recipe section when the recipe is ready
    useEffect(() => {
        if (recipeSection.current && recipe) {
            recipeSection.current.scrollIntoView({behavior: "smooth"});
        }
    }, [recipe]);

    // Get the recipe from Mistral when the user is ready
    async function getRecipe() {
        const recipeMarkdown = await getRecipeFromMistral(ingredients);
        setRecipe(recipeMarkdown);        
    }
    // Add an ingredient to the list
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
                    ref={recipeSection}
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