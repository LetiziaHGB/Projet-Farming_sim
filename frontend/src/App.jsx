import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Champs from './pages/Champs';
import Machines from './pages/Machines';
import Stockage from './pages/Stockage';
import Usines from './pages/Usines';

function App() {
  return (
    <BrowserRouter>
      <h1>Simulateur Agricole 🧑‍🌾</h1>
      <Routes>
        <Route path="/champs" element={<Champs />} />
        <Route path="/machines" element={<Machines />} />
        <Route path="/stockage" element={<Stockage />} />
        <Route path="/usines" element={<Usines />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
