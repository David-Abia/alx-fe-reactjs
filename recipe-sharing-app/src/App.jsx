import { BrowserRouter, Routes, Route } from "react-router-dom";

import RecipeList from "./components/RecipeList";
import RecipeDetails from "./components/RecipeDetails";
import FavoritesList from "./components/FavoritesList";
import RecommendationsList from "./components/RecommendationsList";
import AddRecipeForm from "./components/AddRecipeForm";

function App() {
  return (
    <BrowserRouter>

      <div style={{ padding: "20px" }}>

        <AddRecipeForm />

        <FavoritesList />

        <RecommendationsList />

        <Routes>

          <Route path="/" element={<RecipeList />} />

          <Route path="/recipe/:id" element={<RecipeDetails />} />

        </Routes>

      </div>

    </BrowserRouter>
  );
}

export default App;