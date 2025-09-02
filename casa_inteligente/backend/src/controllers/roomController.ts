// src/controllers/roomController.ts
import { Request, Response } from 'express';

// Lista de cômodos em memória (mock)
let mockRooms = [
  { id: 1, nome: "Sala de Estar" },
  { id: 2, nome: "Cozinha" }
];

// GET /api/comodos
export const listRooms = (req: Request, res: Response) => {
  res.status(200).json(mockRooms);
};

// POST /api/comodos
export const createRoom = (req: Request, res: Response) => {
  const { nome } = req.body;

  if (!nome || !nome.trim()) {
    return res.status(400).json({ message: 'Nome do cômodo é obrigatório.' });
  }

  const newRoom = {
    id: mockRooms.length ? mockRooms[mockRooms.length - 1].id + 1 : 1,
    nome
  };

  mockRooms.push(newRoom);
  res.status(201).json(newRoom);
};

// PUT /api/comodos/:id
export const updateRoom = (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const { nome } = req.body;

  const roomIndex = mockRooms.findIndex(r => r.id === id);

  if (roomIndex === -1) {
    return res.status(404).json({ message: 'Cômodo não encontrado.' });
  }

  if (!nome || !nome.trim()) {
    return res.status(400).json({ message: 'Nome do cômodo é obrigatório.' });
  }

  mockRooms[roomIndex].nome = nome;
  res.status(200).json(mockRooms[roomIndex]);
};

// DELETE /api/comodos/:id
export const deleteRoom = (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const roomIndex = mockRooms.findIndex(r => r.id === id);

  if (roomIndex === -1) {
    return res.status(404).json({ message: 'Cômodo não encontrado.' });
  }

  mockRooms.splice(roomIndex, 1);
  res.status(204).send();
};
