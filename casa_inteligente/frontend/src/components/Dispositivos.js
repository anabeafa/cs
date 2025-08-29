import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function Dispositivos() {
  const [dispositivos, setDispositivos] = useState([]);
  const [erro, setErro] = useState('');

  useEffect(() => {
    axios.get('http://localhost:3000/api/dispositivos')
      .then(res => setDispositivos(res.data))
      .catch(() => setErro('Erro ao buscar dispositivos.'));
  }, []);

  return (
    <div className="page">
      <h2>Dispositivos</h2>
      {erro && <p className="error">{erro}</p>}
      <ul className="list">
        {dispositivos.map(d => (
          <li key={d.id}>
            <strong>{d.nome}</strong> - {d.tipo}
          </li>
        ))}
      </ul>
    </div>
  );
}
