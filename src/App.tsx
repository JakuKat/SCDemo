import "./App.css";
import { HomeLayout } from "./layouts/HomeLayout";
import { Navigate, Route, Routes } from "react-router-dom";
import { BoardPage } from "./pages/BoardPage";
import { NotFoundPage } from "./pages/NotFound";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="board" />} />
      <Route path="*" element={<NotFoundPage />} />
      <Route element={<HomeLayout />}>
        <Route path="board" element={<BoardPage />} />
      </Route>
    </Routes>
  );
};

export default App;
