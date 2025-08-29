import React from 'react';
import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header className="header">
      <h1>Casa Inteligente</h1>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/comodos">Cômodos</Link>
        <Link to="/dispositivos">Dispositivos</Link>
        <Link to="/cenas">Cenas</Link>
      </nav>
    </header>
  );
}
