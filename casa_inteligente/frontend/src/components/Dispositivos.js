import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './dispositivos.css';


export default function Dispositivos() {
  const [dispositivos, setDispositivos] = useState([]);
  const [comodos, setComodos] = useState([]);
  const [novoNome, setNovoNome] = useState('');
  const [comodoSelecionado, setComodoSelecionado] = useState('');

  useEffect(() => {
    carregarDispositivos();
    carregarComodos();
  }, []);

  const carregarDispositivos = async () => {
    try {
      const res = await axios.get('http://localhost:3000/api/dispositivos');
      setDispositivos(res.data);
    } catch {
      alert('Erro ao buscar dispositivos.');
    }
  };

  const carregarComodos = async () => {
    try {
      const res = await axios.get('http://localhost:3000/api/comodos');
      setComodos(res.data);
    } catch {
      alert('Erro ao buscar cômodos.');
    }
  };

  const adicionarDispositivo = async () => {
    if (!novoNome.trim() || !comodoSelecionado) {
      alert('Preencha o nome e selecione um cômodo.');
      return;
    }

    try {
      await axios.post('http://localhost:3000/api/dispositivos', {
        nome: novoNome,
        comodoId: parseInt(comodoSelecionado)
      });
      setNovoNome('');
      setComodoSelecionado('');
      carregarDispositivos();
    } catch {
      alert('Erro ao adicionar dispositivo.');
    }
  };

  const alterarEstado = async (id, novoEstado) => {
    try {
      await axios.put(`http://localhost:3000/api/dispositivos/${id}`, {
        estado: novoEstado
      });
      carregarDispositivos();
    } catch {
      alert('Erro ao alterar estado.');
    }
  };

  const removerDispositivo = async (id) => {
    if (!window.confirm('Deseja realmente remover este dispositivo?')) return;
    try {
      await axios.delete(`http://localhost:3000/api/dispositivos/${id}`);
      carregarDispositivos();
    } catch {
      alert('Erro ao remover dispositivo.');
    }
  };

  const nomeComodo = (id) => {
    const comodo = comodos.find(c => c.id === id);
    return comodo ? comodo.nome : 'Desconhecido';
  };

  return (
    <div className="page">
      <h2>Dispositivos</h2>
      <ul className="list">
        {dispositivos.map(d => (
          <li key={d.id}>
            <strong>{d.nome}</strong> - {d.estado ? 'Ligado' : 'Desligado'} - Cômodo: {nomeComodo(d.comodoId)}
            <button onClick={() => alterarEstado(d.id, !d.estado)}>
              {d.estado ? 'Desligar' : 'Ligar'}
            </button>
            <button onClick={() => removerDispositivo(d.id)}>Remover</button>
          </li>
        ))}
      </ul>

      <div className="novo-dispositivo">
        <input
          type="text"
          placeholder="Nome do dispositivo"
          value={novoNome}
          onChange={e => setNovoNome(e.target.value)}
        />
        <select value={comodoSelecionado} onChange={e => setComodoSelecionado(e.target.value)}>
          <option value="">Selecione o cômodo</option>
          {comodos.map(c => (
            <option key={c.id} value={c.id}>{c.nome}</option>
          ))}
        </select>
        <button onClick={adicionarDispositivo}>Adicionar</button>
      </div>
    </div>
  );
}
