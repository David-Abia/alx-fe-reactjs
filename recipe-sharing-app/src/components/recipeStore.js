import { create } from "zustand";

export const useRecipeStore = create((set, get) => ({

  recipes: [
    {
      id: 1,
      title: "Jollof Rice",
      description: "Delicious West African rice dish",
    },
    {
      id: 2,
      title: "Pancakes",
      description: "Soft breakfast pancakes",
    },
  ],

  searchTerm: "",

  filteredRecipes: [],

  setSearchTerm: (term) => {
    set({ searchTerm: term });
    get().filterRecipes();
  },

  filterRecipes: () => {
    const { recipes, searchTerm } = get();

    const filtered = recipes.filter((recipe) =>
      recipe.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    set({ filteredRecipes: filtered });
  },

  addRecipe: (recipe) =>
    set((state) => ({
      recipes: [...state.recipes, recipe],
    })),

  updateRecipe: (updatedRecipe) =>
    set((state) => ({
      recipes: state.recipes.map((recipe) =>
        recipe.id === updatedRecipe.id ? updatedRecipe : recipe
      ),
    })),

  deleteRecipe: (id) =>
    set((state) => ({
      recipes: state.recipes.filter((recipe) => recipe.id !== id),
    })),
}));