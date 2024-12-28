import "./App.css";
import { Routes, Route } from "react-router";
import { HomePage, SignUpPage } from "./pages";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />}>
        <Route path="signUp" element={<SignUpPage />} />
      </Route>
    </Routes>
  );
}

export default App;
