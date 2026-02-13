import { useEffect, useState } from "react";

function HomePage() {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    fetch("/src/data.json")
      .then((res) => res.json())
      .then((data) => setRecipes(data));
  }, []);

  return (
    <div className="p-6">

      <h1 className="text-3xl font-bold text-center mb-8">
        Recipe Sharing Platform
      </h1>

      {/* REQUIRED CONTAINER */}
      <div className="container mx-auto">

        {/* REQUIRED GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">

          {recipes.map((recipe) => (
            <div
              key={recipe.id}
              className="bg-white rounded-lg shadow-md hover:shadow-xl hover:scale-105 transition p-4"
            >
              <img
                src={recipe.image}
                alt={recipe.title}
                className="w-full h-40 object-cover rounded"
              />

              <h2 className="text-xl font-bold mt-3">
                {recipe.title}
              </h2>

              <p className="text-gray-600 text-sm mt-2">
                {recipe.summary}
              </p>

              <button className="text-blue-500 mt-3 hover:underline">
                View Recipe
              </button>
            </div>
          ))}

        </div>
      </div>
    </div>
  );
}

export default HomePage;
