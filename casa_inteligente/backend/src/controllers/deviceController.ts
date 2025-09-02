import { Request, Response } from 'express';

let mockDevices = [
  { id: 1, nome: "Lâmpada Sala", estado: true, comodoId: 1 },
  { id: 2, nome: "Ventilador Quarto", estado: false, comodoId: 2 }
];

export const listDevices = (req: Request, res: Response) => {
  res.status(200).json(mockDevices);
};

export const createDevice = (req: Request, res: Response) => {
  const { nome, comodoId } = req.body;
  const newDevice = {
    id: mockDevices.length + 1,
    nome,
    comodoId,
    estado: false
  };
  mockDevices.push(newDevice);
  res.status(201).json({ message: 'Dispositivo criado com sucesso!', data: newDevice });
};

export const updateDeviceState = (req: Request, res: Response) => {
  const { id } = req.params;
  const { estado } = req.body;

  const index = mockDevices.findIndex(d => d.id === parseInt(id));
  if (index === -1) {
    return res.status(404).json({ message: 'Dispositivo não encontrado.' });
  }

  mockDevices[index].estado = estado;
  res.status(200).json({ message: `Estado alterado para ${estado}` });
};

export const deleteDevice = (req: Request, res: Response) => {
  const { id } = req.params;
  mockDevices = mockDevices.filter(d => d.id !== parseInt(id));
  res.status(204).send();
};
