import { useRecipeStore } from "../store/recipeStore";
import { Link } from "react-router-dom";

function RecipeList() {

  const recipes = useRecipeStore((state) => state.recipes);

  const addFavorite = useRecipeStore((state) => state.addFavorite);

  return (
    <div>

      <h1>Recipe List</h1>

      {recipes.map((recipe) => (

        <div key={recipe.id} style={{ marginBottom: "15px" }}>

          <Link to={`/recipe/${recipe.id}`}>
            <h3>{recipe.title}</h3>
          </Link>

          <p>{recipe.description}</p>

          <button onClick={() => addFavorite(recipe.id)}>
            Add to Favorites
          </button>

        </div>

      ))}

    </div>
  );
}

export default RecipeList;