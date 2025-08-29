import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function Cenas() {
  const [cenas, setCenas] = useState([]);
  const [erro, setErro] = useState('');

  useEffect(() => {
    axios.get('http://localhost:3000/api/cenas')
      .then(res => setCenas(res.data))
      .catch(() => setErro('Erro ao buscar cenas.'));
  }, []);

  return (
    <div className="page">
      <h2>Cenas</h2>
      {erro && <p className="error">{erro}</p>}
      <ul className="list">
        {cenas.map(c => (
          <li key={c.id}>
            <strong>{c.nome}</strong>
            <ul>
              {c.acoes.map((a, i) => (
                <li key={i}>
                  Dispositivo {a.dispositivoId}: {a.estado ? 'Ligado' : 'Desligado'} (Intervalo: {a.intervalo}s)
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
}
