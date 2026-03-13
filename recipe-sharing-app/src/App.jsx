import { BrowserRouter, Routes, Route } from "react-router-dom";

import RecipeList from "./components/RecipeList";
import RecipeDetails from "./components/RecipeDetails";

function App() {
  return (
    <BrowserRouter>

      <Routes>

        <Route path="/" element={<RecipeList />} />

        <Route path="/recipe/:id" element={<RecipeDetails />} />

      </Routes>

    </BrowserRouter>
  );
}

export default App;