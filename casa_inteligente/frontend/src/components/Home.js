import React from 'react';
import './styles.css';
import CasaCanvas from './CasaCanvas';

export default function Home() {
  return (
    <div className="page home">
      <CasaCanvas />
      <h2>Bem-vindo à Casa Inteligente</h2>
      <p>Controle seus cômodos, dispositivos e cenas com facilidade.</p>
    </div>
  );
}
