import { create } from "zustand";

export const useRecipeStore = create((set) => ({
  recipes: [
    {
      id: 1,
      title: "Jollof Rice",
      description: "A delicious West African rice dish",
    },
    {
      id: 2,
      title: "Pancakes",
      description: "Soft breakfast pancakes",
    },
  ],

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