import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './comodos.css';

export default function Comodos() {
  const [comodos, setComodos] = useState([]);
  const [erro, setErro] = useState('');
  const [novoNome, setNovoNome] = useState('');
  const [editandoId, setEditandoId] = useState(null);
  const [editandoNome, setEditandoNome] = useState('');
  const [carregando, setCarregando] = useState(false);

  useEffect(() => {
    carregarComodos();
  }, []);

  const carregarComodos = async () => {
    setCarregando(true);
    try {
      const res = await axios.get('http://localhost:3000/api/comodos');
      setComodos(res.data);
      setErro('');
    } catch (error) {
      setErro('Erro ao buscar cômodos.');
    } finally {
      setCarregando(false);
    }
  };

  const adicionarComodo = async () => {
    if (!novoNome.trim()) {
      alert('Por favor, digite o nome do cômodo');
      return;
    }
    setCarregando(true);
    try {
      await axios.post('http://localhost:3000/api/comodos', { nome: novoNome.trim() });
      setNovoNome('');
      carregarComodos();
    } catch (error) {
      alert('Erro ao adicionar cômodo');
    } finally {
      setCarregando(false);
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
    setCarregando(true);
    try {
      await axios.put(`http://localhost:3000/api/comodos/${editandoId}`, { nome: editandoNome.trim() });
      setEditandoId(null);
      setEditandoNome('');
      carregarComodos();
    } catch (error) {
      alert('Erro ao salvar edição');
    } finally {
      setCarregando(false);
    }
  };

  const removerComodo = async (id) => {
    if (!window.confirm('Tem certeza que quer remover esse cômodo?')) return;
    setCarregando(true);
    try {
      await axios.delete(`http://localhost:3000/api/comodos/${id}`);
      carregarComodos();
    } catch (error) {
      alert('Erro ao remover cômodo');
    } finally {
      setCarregando(false);
    }
  };

  return (
    <div className="page comodos">
      <h2>Cômodos</h2>
      {erro && <p className="error">{erro}</p>}

      {carregando && <p>Carregando...</p>}

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
                  disabled={carregando}
                />
                <button onClick={salvarEdicao} disabled={carregando}>Salvar</button>
                <button onClick={cancelarEdicao} disabled={carregando}>Cancelar</button>
              </>
            ) : (
              <>
                <span>{c.nome}</span>
                <button onClick={() => iniciarEdicao(c.id, c.nome)} disabled={carregando}>Editar</button>
                <button onClick={() => removerComodo(c.id)} disabled={carregando}>Remover</button>
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
          disabled={carregando}
        />
        <button onClick={adicionarComodo} disabled={carregando}>Adicionar</button>
      </div>
    </div>
  );
}
