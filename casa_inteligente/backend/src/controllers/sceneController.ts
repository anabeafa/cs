import { Request, Response } from 'express';

// Exemplo de uma cena de mentira
const mockScenes = [
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
    console.log('Nova cena criada:', newScene);
    res.status(201).json({ message: 'Cena criada com sucesso!', data: newScene });
};

export const updateScene = (req: Request, res: Response) => {
    const { id } = req.params;
    console.log(`Alterando cena com ID: ${id}`);
    res.status(200).json({ message: `Cena ${id} alterada com sucesso!` });
};

export const deleteScene = (req: Request, res: Response) => {
    const { id } = req.params;
    console.log(`Deletando cena com ID: ${id}`);
    res.status(204).send();
};

export const executeScene = (req: Request, res: Response) => {
    const { id } = req.params;
    console.log(`Executando cena com ID: ${id}`);


    res.status(200).json({ message: `Cena ${id} executada com sucesso!` });
};