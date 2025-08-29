import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './components/Home';
import Comodos from './components/Comodos';
import Dispositivos from './components/Dispositivos';
import Cenas from './components/Cenas';


function App() {
  return (
    <Router>
      <nav>
        <Link to="/">Home</Link> |{' '}
        <Link to="/comodos">Cômodos</Link> |{' '}
        <Link to="/dispositivos">Dispositivos</Link> |{' '}
        <Link to="/cenas">Cenas</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/comodos" element={<Comodos />} />
        <Route path="/dispositivos" element={<Dispositivos />} />
        <Route path="/cenas" element={<Cenas />} />
      </Routes>
    </Router>
  );
}

export default App;
