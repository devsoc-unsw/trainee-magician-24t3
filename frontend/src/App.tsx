import { Route, Routes } from "react-router-dom";
import { Login } from "./pages/Login";
// import { Register } from "./pages/Register";
import { Catalogue } from "./pages/Catalogue";
import { Tip } from "./pages/Tip";
import GridCard from './components/GridCard';
import { ThemeProvider } from './contexts/ThemeContext';

function App() {
  return (
    <ThemeProvider>
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
    </ThemeProvider>
  );
}

export default App;
