import { useRecipeStore } from "../store/recipeStore";

function DeleteRecipeButton({ recipeId }) {
  const deleteRecipe = useRecipeStore((state) => state.deleteRecipe);

  const handleDelete = () => {
    deleteRecipe(recipeId);
  };

  return (
    <button
      onClick={handleDelete}
      style={{
        marginTop: "15px",
        padding: "8px",
        backgroundColor: "red",
        color: "white",
        border: "none",
      }}
    >
      Delete Recipe
    </button>
  );
}

export default DeleteRecipeButton;