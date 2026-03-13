import { Link } from "react-router-dom";
import { useRecipeStore } from "../store/recipeStore";

function RecipeList() {

  const recipes = useRecipeStore((state) => state.recipes);

  if (recipes.length === 0) {
    return <p>No recipes yet</p>;
  }

  return (
    <div>

      <h2>Recipes</h2>

      {recipes.map((recipe) => (
        <div key={recipe.id}>
          <Link to={`/recipe/${recipe.id}`}>
            {recipe.title}
          </Link>
        </div>
      ))}

    </div>
  );
}

export default RecipeList;