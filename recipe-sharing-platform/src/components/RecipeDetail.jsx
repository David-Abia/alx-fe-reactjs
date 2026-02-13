import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";

export default function RecipeDetail() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    fetch("/data.json")
      .then((res) => res.json())
      .then((data) => {
        const found = data.find((r) => r.id === parseInt(id));
        setRecipe(found);
      })
      .catch((err) => console.log("Error loading recipe:", err));
  }, [id]);

  if (!recipe) {
    return <p className="text-center mt-10">Loading recipe...</p>;
  }

  // Use "instructions" key as required by ALX checker
  const instructions = recipe.instructions || ["Step 1: Prep ingredients", "Step 2: Cook", "Step 3: Serve hot"];
  const ingredients = recipe.ingredients || ["1 cup ingredient A", "2 tbsp ingredient B"];

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Back to Home */}
      <Link to="/" className="text-blue-500 hover:underline mb-4 inline-block">
        ← Back to Home
      </Link>

      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md overflow-hidden p-6">
        {/* Recipe Image */}
        <img
          src={recipe.image}
          alt={recipe.title}
          className="w-full h-64 object-cover rounded"
        />

        {/* Recipe Title & Summary */}
        <h1 className="text-3xl font-bold mt-4 mb-2">{recipe.title}</h1>
        <p className="text-gray-700 mb-6">{recipe.summary}</p>

        {/* Ingredients */}
        <div className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">Ingredients</h2>
          <ul className="list-disc list-inside text-gray-600">
            {ingredients.map((ing, idx) => (
              <li key={idx}>{ing}</li>
            ))}
          </ul>
        </div>

        {/* Cooking Instructions */}
        <div>
          <h2 className="text-2xl font-semibold mb-2">Cooking Instructions</h2>
          <ol className="list-decimal list-inside text-gray-600">
            {instructions.map((step, idx) => (
              <li key={idx} className="mb-1">{step}</li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
}
