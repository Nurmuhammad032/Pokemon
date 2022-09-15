import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Landing, Pokemon, Pokemons } from "./pages";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/pokemons" element={<Pokemons />} />
        <Route path="/pokemons/:name" element={<Pokemon />} />
      </Routes>
    </Router>
  );
}

export default App;
