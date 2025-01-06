import "./App.css";
import { Routes, Route } from "react-router";
import {
  HomePage,
  SignInPage,
  SignUpPage,
  WorkspacePage,
  NotePage,
  AboutPage,
} from "./pages";
import { AuthProvider } from "./context/authProvider";
import { NotesList } from "./components/todoList/NotesList";

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<HomePage />}>
          <Route path="signUp" element={<SignUpPage />} />
          <Route path="signIn" element={<SignInPage />} />
          <Route path="/" element={<NotesList />} />
          <Route path="/:id" element={<NotePage />} />
          <Route path="/about" element={<AboutPage />} />
        </Route>
      </Routes>
    </AuthProvider>
  );
}

export default App;
