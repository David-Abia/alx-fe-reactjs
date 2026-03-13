import { useRecipeStore } from "../store/recipeStore";

function FavoritesList() {

  const recipes = useRecipeStore((state) => state.recipes);

  const favorites = useRecipeStore((state) => state.favorites);

  const favoriteRecipes = favorites.map((id) =>
    recipes.find((recipe) => recipe.id === id)
  );

  return (
    <div style={{ marginTop: "20px" }}>

      <h2>My Favorites</h2>

      {favoriteRecipes.map((recipe) => (
        <div key={recipe.id}>
          <h3>{recipe.title}</h3>
          <p>{recipe.description}</p>
        </div>
      ))}

    </div>
  );
}

export default FavoritesList;