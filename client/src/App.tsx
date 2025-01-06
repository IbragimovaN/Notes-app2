import "./App.css";
import { Routes, Route } from "react-router";
import {
  HomePage,
  SignInPage,
  SignUpPage,
  NotFoundPage,
  NotePage,
  AboutPage,
} from "./pages";
import { AuthProvider } from "./context/authProvider";

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<HomePage />}>
          <Route path="signUp" element={<SignUpPage />} />
          <Route path="signIn" element={<SignInPage />} />
          <Route path=":id" element={<NotePage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="*" element={<NotFoundPage />} />
          <Route path="notFound" element={<NotFoundPage />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
