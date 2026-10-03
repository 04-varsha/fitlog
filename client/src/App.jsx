import { Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import MotivationQuote from "./components/MotivationQuote";
import ExerciseList from "./pages/ExerciseList";
import ExerciseForm from "./pages/ExerciseForm";
import Stats from "./pages/Stats";

export default function App() {
  return (
    <>
      <NavBar />

      <div className="container py-4">
        <MotivationQuote />

        <Routes>
          <Route path="/" element={<ExerciseList />} />
          <Route path="/add" element={<ExerciseForm key="add" />} />
          <Route path="/edit/:id" element={<ExerciseForm key="edit" />} />
          <Route path="/stats" element={<Stats />} />
          <Route path="*" element={<h3>404: Page not found</h3>} />
        </Routes>
      </div>
    </>
  );
}