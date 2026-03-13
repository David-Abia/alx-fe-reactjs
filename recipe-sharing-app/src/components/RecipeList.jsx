import { Link } from "react-router-dom";
import { useRecipeStore } from "../store/recipeStore";

function RecipeList() {
  const recipes = useRecipeStore((state) => state.recipes);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Recipe List</h1>

      {recipes.map((recipe) => (
        <div key={recipe.id} style={{ marginBottom: "10px" }}>
          <Link to={`/recipe/${recipe.id}`}>
            {recipe.title}
          </Link>
        </div>
      ))}
    </div>
  );
}

export default RecipeList;