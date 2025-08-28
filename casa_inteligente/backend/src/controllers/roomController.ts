import { Request, Response } from 'express';

// Lista de cômodos de exemplo
const mockRooms = [
    { id: 1, nome: "Sala de Estar" },
    { id: 2, nome: "Cozinha" }
];

export const listRooms = (req: Request, res: Response) => {
    res.status(200).json(mockRooms);
};

export const createRoom = (req: Request, res: Response) => {
    const newRoom = { id: mockRooms.length + 1, ...req.body };
    console.log('Novo cômodo criado:', newRoom);
    res.status(201).json({ message: 'Cômodo criado com sucesso!', data: newRoom });
};

export const updateRoom = (req: Request, res: Response) => {
    const { id } = req.params;
    const { nome } = req.body;
    console.log(`Alterando o cômodo ${id} para o nome: ${nome}`);
    res.status(200).json({ message: `Cômodo ${id} alterado para ${nome}!` });
};

export const deleteRoom = (req: Request, res: Response) => {
    const { id } = req.params;
    console.log(`Deletando cômodo com ID: ${id}`);
    res.status(204).send();
};