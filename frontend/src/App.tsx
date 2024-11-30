import { Route, Routes } from "react-router-dom";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { Catalogue } from "./pages/Catalogue";
import { Tip } from "./pages/Tip";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Catalogue />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/tip" element={<Tip />} />
    </Routes>
  );
}

export default App;
