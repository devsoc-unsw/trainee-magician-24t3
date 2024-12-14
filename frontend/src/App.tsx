import { Route, Routes } from "react-router-dom";
import { Login } from "./pages/Login";
// import { Register } from "./pages/Register";
import { Catalogue } from "./pages/Catalogue";
import { Tip } from "./pages/Tip";
import GridCard from "./components/GridCard";
import { ThemeProvider } from "./contexts/ThemeContext";
import { Toaster } from "react-hot-toast";
import { ProfilePage } from "./pages/ProfilePage";
import { CreateTip } from "./pages/CreateTip";

function App() {
  return (
    <ThemeProvider>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: "#333",
            color: "#fff",
          },
          success: {
            style: {
              background: "#63C779",
            },
          },
          error: {
            style: {
              background: "#F52A2A",
            },
          },
        }}
      />
      <Routes>
        <Route path="/" element={<Catalogue />} />
        <Route path="/login" element={<Login />} />
        <Route path="/create-tip" element={<CreateTip />} />
        <Route path="/tip/:tipId" element={<Tip />} />
        <Route
          path="/grid-card"
          element={
            <GridCard
              title="Example Title Example Title Example Title "
              tags={["ipsum", "lorem"]}
              rating={3.5}
              description="Study shows that everyone who drinks water everyday dies in the end."
            />
          }
        />
        <Route path="/profile" element={<ProfilePage />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
