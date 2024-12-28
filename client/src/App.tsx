import "./App.css";
import { Routes, Route } from "react-router";
import { HomePage, SignInPage, SignUpPage } from "./pages";
import { AuthProvider } from "./context/authProvider";

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<HomePage />}>
          <Route path="signUp" element={<SignUpPage />} />
          <Route path="signIn" element={<SignInPage />} />
        </Route>
      </Routes>
    </AuthProvider>
  );
}

export default App;
