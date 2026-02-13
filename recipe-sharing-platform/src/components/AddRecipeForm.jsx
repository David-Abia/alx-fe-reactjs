import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AddRecipeForm() {
  const navigate = useNavigate();
  
  // Form state
  const [title, setTitle] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [instructions, setInstructions] = useState("");
  
  // Validation state
  const [errors, setErrors] = useState({});

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Simple front-end validation
    const newErrors = {};
    if (!title.trim()) newErrors.title = "Title is required";
    if (!ingredients.trim() || ingredients.split(",").length < 2)
      newErrors.ingredients = "Enter at least two ingredients, separated by commas";
    if (!instructions.trim())
      newErrors.instructions = "Preparation steps are required";

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      // Here you would normally send data to backend or update state
      const newRecipe = {
        id: Date.now(), // simple unique ID
        title,
        summary: instructions.split("\n")[0] || "",
        image: "https://via.placeholder.com/300", // placeholder image
        ingredients: ingredients.split(",").map((ing) => ing.trim()),
        instructions: instructions.split("\n").map((step) => step.trim()),
      };

      console.log("New Recipe Submitted:", newRecipe);

      // Reset form
      setTitle("");
      setIngredients("");
      setInstructions("");

      // Optional: navigate back to home page
      navigate("/");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-lg rounded-xl shadow-md p-6">
        <h1 className="text-2xl font-bold mb-4 text-center">Add New Recipe</h1>
        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Recipe Title */}
          <div>
            <label className="block text-gray-700 font-semibold mb-1">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className={`w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400 ${
                errors.title ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Recipe title"
            />
            {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
          </div>

          {/* Ingredients */}
          <div>
            <label className="block text-gray-700 font-semibold mb-1">Ingredients (comma separated)</label>
            <textarea
              value={ingredients}
              onChange={(e) => setIngredients(e.target.value)}
              className={`w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400 ${
                errors.ingredients ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="e.g. 200g spaghetti, 100g pancetta, 2 eggs"
              rows={3}
            />
            {errors.ingredients && <p className="text-red-500 text-sm mt-1">{errors.ingredients}</p>}
          </div>

          {/* Instructions */}
          <div>
            <label className="block text-gray-700 font-semibold mb-1">Preparation Steps (one per line)</label>
            <textarea
              value={instructions}
              onChange={(e) => setInstructions(e.target.value)}
              className={`w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400 ${
                errors.instructions ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Step 1: ...\nStep 2: ..."
              rows={5}
            />
            {errors.instructions && <p className="text-red-500 text-sm mt-1">{errors.instructions}</p>}
          </div>

          {/* Submit Button */}
          <div className="text-center">
            <button
              type="submit"
              className="bg-blue-500 text-white font-semibold px-6 py-2 rounded-md hover:bg-blue-600 transition"
            >
              Add Recipe
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
