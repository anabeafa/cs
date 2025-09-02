import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './cena.css';

export default function Cenas() {
  const [cenas, setCenas] = useState([]);
  const [comodos, setComodos] = useState([]);
  const [dispositivos, setDispositivos] = useState([]);
  const [selectedComodoId, setSelectedComodoId] = useState(null);
  const [acoes, setAcoes] = useState([]); 
  const [nomeCena, setNomeCena] = useState('');
  const [editId, setEditId] = useState(null); 
  const [erro, setErro] = useState('');

  useEffect(() => {
    carregarCenas();
    carregarComodos();
  }, []);

  useEffect(() => {
    if (selectedComodoId) {
      carregarDispositivos(selectedComodoId);
    } else {
      setDispositivos([]);
      setAcoes([]);
    }
  }, [selectedComodoId]);

  const carregarCenas = async () => {
    try {
      const res = await axios.get('http://localhost:3000/api/cenas');
      setCenas(res.data);
      setErro('');
    } catch {
      setErro('Erro ao buscar cenas.');
    }
  };

  const carregarComodos = async () => {
    try {
      const res = await axios.get('http://localhost:3000/api/comodos');
      setComodos(res.data);
    } catch {
      setErro('Erro ao buscar cômodos.');
    }
  };

  const carregarDispositivos = async (comodoId) => {
    try {
      const res = await axios.get('http://localhost:3000/api/dispositivos');
      const dispositivosDoComodo = res.data.filter(d => d.comodoId === comodoId);
      setDispositivos(dispositivosDoComodo);
      if (!editId) {
        setAcoes(dispositivosDoComodo.map(d => ({ dispositivoId: d.id, estado: false, intervalo: 0 })));
      }
    } catch {
      setErro('Erro ao buscar dispositivos.');
    }
  };

  const toggleEstado = (dispositivoId) => {
    setAcoes(prev =>
      prev.map(a =>
        a.dispositivoId === dispositivoId ? { ...a, estado: !a.estado } : a
      )
    );
  };

  const iniciarEdicao = (cena) => {
    setEditId(cena.id);
    setNomeCena(cena.nome);
    if (cena.acoes.length > 0) {
      const dispositivoIds = cena.acoes.map(a => a.dispositivoId);
      axios.get('http://localhost:3000/api/dispositivos')
        .then(res => {
          const disp = res.data;
          const primeiroDispositivo = disp.find(d => d.id === dispositivoIds[0]);
          if (primeiroDispositivo) {
            setSelectedComodoId(primeiroDispositivo.comodoId);
            setDispositivos(disp.filter(d => d.comodoId === primeiroDispositivo.comodoId));
            setAcoes(cena.acoes.map(a => ({
              dispositivoId: a.dispositivoId,
              estado: a.estado,
              intervalo: a.intervalo || 0
            })));
          }
        });
    } else {
      setSelectedComodoId(null);
      setDispositivos([]);
      setAcoes([]);
    }
  };

  const cancelarEdicao = () => {
    setEditId(null);
    setNomeCena('');
    setSelectedComodoId(null);
    setDispositivos([]);
    setAcoes([]);
  };

  const salvarCena = async () => {
    if (!nomeCena.trim()) {
      alert('Por favor, digite o nome da cena.');
      return;
    }
    if (!selectedComodoId) {
      alert('Selecione um cômodo.');
      return;
    }
    if (acoes.length === 0) {
      alert('Nenhum dispositivo selecionado.');
      return;
    }

    try {
      if (editId) {
        await axios.put(`http://localhost:3000/api/cenas/${editId}`, {
          nome: nomeCena,
          acoes: acoes.filter(a => dispositivos.some(d => d.id === a.dispositivoId))
        });
        alert('Cena editada com sucesso!');
      } else {
        await axios.post('http://localhost:3000/api/cenas', {
          nome: nomeCena,
          acoes: acoes.filter(a => dispositivos.some(d => d.id === a.dispositivoId))
        });
        alert('Cena criada com sucesso!');
      }
      cancelarEdicao();
      carregarCenas();
    } catch {
      alert('Erro ao salvar cena.');
    }
  };

  const excluirCena = async (id) => {
    if (!window.confirm('Tem certeza que deseja excluir esta cena?')) return;

    try {
      await axios.delete(`http://localhost:3000/api/cenas/${id}`);
      alert('Cena excluída!');
      if (editId === id) cancelarEdicao();
      carregarCenas();
    } catch {
      alert('Erro ao excluir cena.');
    }
  };

  const executarCena = async (id) => {
    try {
      await axios.post(`http://localhost:3000/api/cenas/${id}/executar`);
      alert('Cena executada!');
    } catch {
      alert('Erro ao executar cena.');
    }
  };

  return (
    <div className="page">
      <h2>Cenas</h2>
      {erro && <p className="error">{erro}</p>}

      {/* Lista das cenas */}
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
            <button onClick={() => iniciarEdicao(c)}>Editar</button>{' '}
            <button onClick={() => excluirCena(c.id)}>Excluir</button>{' '}
            <button onClick={() => executarCena(c.id)}>Executar</button>
          </li>
        ))}
      </ul>

      {/* Formulário para criar/editar cena */}
      <h3>{editId ? 'Editar cena' : 'Criar nova cena'}</h3>

      <div className="nova-cena">
        <input
          type="text"
          placeholder="Nome da cena"
          value={nomeCena}
          onChange={e => setNomeCena(e.target.value)}
        />

        <select
          value={selectedComodoId || ''}
          onChange={e => setSelectedComodoId(Number(e.target.value))}
          disabled={!!editId} 
        >
          <option value="">Selecione um cômodo</option>
          {comodos.map(c => (
            <option key={c.id} value={c.id}>{c.nome}</option>
          ))}
        </select>

        <button onClick={salvarCena}>
          {editId ? 'Salvar Alterações' : 'Adicionar Cena'}
        </button>

        {editId && <button onClick={cancelarEdicao}>Cancelar</button>}
      </div>

      {dispositivos.length > 0 && (
        <div>
          <h4>Dispositivos</h4>
          {dispositivos.map(d => {
            const acao = acoes.find(a => a.dispositivoId === d.id);
            return (
              <div key={d.id}>
                <label>
                  <input
                    type="checkbox"
                    checked={acao ? acao.estado : false}
                    onChange={() => toggleEstado(d.id)}
                  />
                  {d.nome}
                </label>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
