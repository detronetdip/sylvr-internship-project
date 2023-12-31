import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import AuthPage from "./pages/Auth";
import Auth from "./components/Auth/Auth";
import Update from "./pages/Update";

function App() {
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <Auth>
              <Home />
            </Auth>
          }
        />
        <Route
          path="/update"
          element={
            <Auth>
              <Update />
            </Auth>
          }
        />
        <Route path="/auth" element={<AuthPage />} />
      </Routes>
    </>
  );
}

export default App;
