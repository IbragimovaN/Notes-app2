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
import { AuthProvider } from "./context/AuthProvider";
import { NotesList } from "./pages/homePage/components";
import { PrivatRoute } from "./components";
import { useEffect } from "react";
import { createCollectionIndexedDB } from "./indexedDB/createDB";

function App() {
  useEffect(() => {
    createCollectionIndexedDB();
  }, []);
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<HomePage />}>
          <Route
            index
            element={
              <PrivatRoute>
                <NotesList />
              </PrivatRoute>
            }
          />
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
