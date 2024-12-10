import { Route, Routes } from "react-router-dom";
import { Login } from "./pages/Login";
// import { Register } from "./pages/Register";
import { Catalogue } from "./pages/Catalogue";
import { Tip } from "./pages/Tip";
import GridCard from './components/GridCard';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Catalogue />} />
      <Route path="/login" element={<Login />} />
      {/* <Route path="/register" element={<Register />} /> */}
      <Route path="/tip" element={<Tip />} />
      <Route path="/grid-card" element={<GridCard 
        title="Example Title Example Title Example Title " 
        tags={["ipsum", "lorem"]} 
        rating={3.5} 
        description="Study shows that everyone who drinks water everyday dies in the end." 
      />} />

    </Routes>
  );
}

export default App;
