import { Request, Response } from 'express';

export const listDevices = (req: Request, res: Response) => {
    // Lista de dispositivos simulada (futuramente virá do banco de dados)
    const mockDevices = [
        { id: 1, nome: "Lâmpada Sala", estado: true, comodoId: 1 },
        { id: 2, nome: "Ventilador Quarto", estado: false, comodoId: 2 }
    ];
    
    res.status(200).json(mockDevices);
};

export const createDevice = (req: Request, res: Response) => {
    // Lógica para criar um dispositivo com base no corpo da requisição
    const newDevice = { id: 3, ...req.body, estado: false };
    console.log('Novo dispositivo criado:', newDevice);
    res.status(201).json({ message: 'Dispositivo criado com sucesso!', data: newDevice });
};

export const updateDeviceState = (req: Request, res: Response) => {
    const { id } = req.params;
    const { estado } = req.body;
    console.log(`Alterando estado do dispositivo ${id} para ${estado}.`);
    res.status(200).json({ message: `Estado do dispositivo ${id} alterado com sucesso para ${estado}!` });
};

export const deleteDevice = (req: Request, res: Response) => {
    const { id } = req.params;
    console.log(`Deletando dispositivo com ID: ${id}.`);
    res.status(204).send(); // Sucesso, sem conteúdo na resposta
};