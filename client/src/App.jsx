import { Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import ExerciseList from "./pages/ExerciseList";
import ExerciseForm from "./pages/ExerciseForm";
import Stats from "./pages/Stats";

export default function App() {
  return (
    <>
      <NavBar />

      <div className="container py-4">
        <Routes>
          <Route path="/" element={<ExerciseList />} />
          <Route path="/add" element={<ExerciseForm key="add" />} />
          <Route path="/edit/:id" element={<ExerciseForm key="edit" />} />
          <Route path="/stats" element={<Stats />} />
        </Routes>
      </div>
    </>
  );
}