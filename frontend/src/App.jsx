import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Champs from './pages/champs';
import Stockage from './pages/stockage';
import Usines from './pages/usines';

function App() {
  return (
    <BrowserRouter>
      <h1> Simulateur Agricole</h1>
      <nav>
        <Link to="/champs">Champs</Link> |  | 
        <Link to="/stockage">Stockage</Link> | 
        <Link to="/usines">Usines</Link>
      </nav>
      <Routes>
        <Route path="/champs" element={<Champs />} />
        <Route path="/stockage" element={<Stockage />} />
        <Route path="/usines" element={<Usines />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

