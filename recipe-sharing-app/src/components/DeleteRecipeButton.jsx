import { useRecipeStore } from "../store/recipeStore";

function DeleteRecipeButton({ recipeId }) {
  const deleteRecipe = useRecipeStore((state) => state.deleteRecipe);

  const handleDelete = () => {
    deleteRecipe(recipeId);
    alert("Recipe deleted");
  };

  return (
    <button
      onClick={handleDelete}
      style={{
        marginTop: "15px",
        backgroundColor: "red",
        color: "white",
        padding: "8px",
        border: "none",
      }}
    >
      Delete Recipe
    </button>
  );
}

export default DeleteRecipeButton;