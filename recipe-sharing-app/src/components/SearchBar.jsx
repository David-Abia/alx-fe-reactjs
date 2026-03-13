import { useRecipeStore } from "../store/recipeStore";

function SearchBar() {

  const setSearchTerm = useRecipeStore((state) => state.setSearchTerm);

  return (
    <div style={{ marginBottom: "20px" }}>
      <input
        type="text"
        placeholder="Search recipes..."
        onChange={(event) => setSearchTerm(event.target.value)}
        style={{
          padding: "8px",
          width: "300px",
        }}
      />
    </div>
  );
}

export default SearchBar;