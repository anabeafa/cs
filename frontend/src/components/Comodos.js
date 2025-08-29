import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './comodos.css';

export default function Comodos() {
  const [comodos, setComodos] = useState([]);
  const [erro, setErro] = useState('');
  const [novoNome, setNovoNome] = useState('');
  const [editandoId, setEditandoId] = useState(null);
  const [editandoNome, setEditandoNome] = useState('');

  useEffect(() => {
    carregarComodos();
  }, []);

  const carregarComodos = async () => {
    try {
      const res = await axios.get('http://localhost:3000/api/comodos');
      setComodos(res.data);
      setErro('');
    } catch {
      setErro('Erro ao buscar cômodos.');
    }
  };

  const adicionarComodo = async () => {
    if (!novoNome.trim()) {
      alert('Por favor, digite o nome do cômodo');
      return;
    }
    try {
      await axios.post('http://localhost:3000/api/comodos', { nome: novoNome });
      setNovoNome('');
      carregarComodos();
    } catch {
      alert('Erro ao adicionar cômodo');
    }
  };


  const iniciarEdicao = (id, nome) => {
    setEditandoId(id);
    setEditandoNome(nome);
  };

  const cancelarEdicao = () => {
    setEditandoId(null);
    setEditandoNome('');
  };

  const salvarEdicao = async () => {
    if (!editandoNome.trim()) {
      alert('O nome não pode ficar vazio');
      return;
    }
    try {
      await axios.put(`http://localhost:3000/api/comodos/${editandoId}`, { nome: editandoNome });
      setEditandoId(null);
      setEditandoNome('');
      carregarComodos();
    } catch {
      alert('Erro ao salvar edição');
    }
  };

  const removerComodo = async (id) => {
    if (!window.confirm('Tem certeza que quer remover esse cômodo?')) return;
    try {
      await axios.delete(`http://localhost:3000/api/comodos/${id}`);
      carregarComodos();
    } catch {
      alert('Erro ao remover cômodo');
    }
  };

  return (
    <div className="page comodos">
      <h2>Cômodos</h2>
      {erro && <p className="error">{erro}</p>}

      <ul className="list">
        {comodos.map(c => (
          <li key={c.id} className="comodo-item">
            {editandoId === c.id ? (
              <>
                <input
                  type="text"
                  value={editandoNome}
                  onChange={e => setEditandoNome(e.target.value)}
                  autoFocus
                />
                <button onClick={salvarEdicao}>Salvar</button>
                <button onClick={cancelarEdicao}>Cancelar</button>
              </>
            ) : (
              <>
                <span>{c.nome}</span>
                <button onClick={() => iniciarEdicao(c.id, c.nome)}>Editar</button>
                <button onClick={() => removerComodo(c.id)}>Remover</button>
              </>
            )}
          </li>
        ))}
      </ul>

      <div className="novo-comodo">
        <input
          type="text"
          placeholder="Novo cômodo"
          value={novoNome}
          onChange={e => setNovoNome(e.target.value)}
        />
        <button onClick={adicionarComodo}>Adicionar</button>
      </div>
    </div>
  );
}
