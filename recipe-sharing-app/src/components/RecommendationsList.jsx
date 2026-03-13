import { useEffect } from "react";
import { useRecipeStore } from "../store/recipeStore";

function RecommendationsList() {

  const recommendations = useRecipeStore((state) => state.recommendations);

  const generateRecommendations = useRecipeStore(
    (state) => state.generateRecommendations
  );

  useEffect(() => {
    generateRecommendations();
  }, [generateRecommendations]);

  return (
    <div style={{ marginTop: "20px" }}>

      <h2>Recommended Recipes</h2>

      {recommendations.map((recipe) => (
        <div key={recipe.id}>
          <h3>{recipe.title}</h3>
          <p>{recipe.description}</p>
        </div>
      ))}

    </div>
  );
}

export default RecommendationsList;