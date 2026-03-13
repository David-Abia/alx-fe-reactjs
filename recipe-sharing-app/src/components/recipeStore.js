import { create } from "zustand";

export const useRecipeStore = create((set, get) => ({

  recipes: [
    { id: 1, title: "Jollof Rice", description: "West African rice dish" },
    { id: 2, title: "Pancakes", description: "Soft breakfast pancakes" },
    { id: 3, title: "Fried Rice", description: "Rice cooked with vegetables" }
  ],

  favorites: [],

  recommendations: [],

  addFavorite: (recipeId) =>
    set((state) => ({
      favorites: [...state.favorites, recipeId]
    })),

  removeFavorite: (recipeId) =>
    set((state) => ({
      favorites: state.favorites.filter((id) => id !== recipeId)
    })),

  generateRecommendations: () => {
    const { recipes, favorites } = get();

    const recommended = recipes.filter(
      (recipe) => favorites.includes(recipe.id) && Math.random() > 0.5
    );

    set({ recommendations: recommended });
  }

}));