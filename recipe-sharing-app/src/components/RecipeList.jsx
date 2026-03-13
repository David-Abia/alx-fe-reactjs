import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useRecipeStore } from "../store/recipeStore";
import SearchBar from "./SearchBar";

function RecipeList() {

  const recipes = useRecipeStore((state) => state.recipes);
  const filteredRecipes = useRecipeStore((state) => state.filteredRecipes);
  const filterRecipes = useRecipeStore((state) => state.filterRecipes);

  useEffect(() => {
    filterRecipes();
  }, [recipes, filterRecipes]);

  return (
    <div style={{ padding: "20px" }}>

      <h1>Recipe List</h1>

      <SearchBar />

      {filteredRecipes.map((recipe) => (
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