import { Request, Response } from 'express';

let mockScenes = [
    {
        id: 1,
        nome: "Modo Cinema",
        acoes: [
            { dispositivoId: 1, estado: false, intervalo: 2 },
            { dispositivoId: 2, estado: true, intervalo: 0 }
        ]
    }
];

export const listScenes = (req: Request, res: Response) => {
    res.status(200).json(mockScenes);
};

export const createScene = (req: Request, res: Response) => {
    const newScene = { id: mockScenes.length + 1, ...req.body };
    mockScenes.push(newScene);  // <=== adiciona na lista
    console.log('Nova cena criada:', newScene);
    res.status(201).json({ message: 'Cena criada com sucesso!', data: newScene });
};

export const updateScene = (req: Request, res: Response) => {
    const { id } = req.params;
    const { nome, acoes } = req.body;

    const index = mockScenes.findIndex(c => c.id === Number(id));
    if (index === -1) {
        return res.status(404).json({ message: 'Cena não encontrada' });
    }

    mockScenes[index] = { id: Number(id), nome, acoes };
    console.log(`Cena ${id} alterada para`, mockScenes[index]);
    res.status(200).json({ message: `Cena ${id} alterada com sucesso!`, data: mockScenes[index] });
};

export const deleteScene = (req: Request, res: Response) => {
    const { id } = req.params;
    mockScenes = mockScenes.filter(c => c.id !== Number(id));
    console.log(`Deletando cena com ID: ${id}`);
    res.status(204).send();
};

export const executeScene = (req: Request, res: Response) => {
    const { id } = req.params;
    console.log(`Executando cena com ID: ${id}`);
    res.status(200).json({ message: `Cena ${id} executada com sucesso!` });
};
