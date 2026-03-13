import { useState } from "react";
import { useRecipeStore } from "../store/recipeStore";

function EditRecipeForm({ recipe }) {
  const updateRecipe = useRecipeStore((state) => state.updateRecipe);

  const [title, setTitle] = useState(recipe.title);
  const [description, setDescription] = useState(recipe.description);

  const handleSubmit = (e) => {
    e.preventDefault();

    updateRecipe({
      id: recipe.id,
      title,
      description,
    });

    alert("Recipe updated!");
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginTop: "20px" }}>
      <h3>Edit Recipe</h3>

      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Recipe title"
        style={{ display: "block", margin: "10px 0" }}
      />

      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Recipe description"
        style={{ display: "block", margin: "10px 0" }}
      />

      <button type="submit">Update Recipe</button>
    </form>
  );
}

export default EditRecipeForm;