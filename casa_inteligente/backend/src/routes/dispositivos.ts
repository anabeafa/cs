import { Router } from 'express';
import {
    listDevices,
    createDevice,
    updateDeviceState,
    deleteDevice
} from '../controllers/deviceController';

const router = Router();

// Rota para CRIAR um novo dispositivo
router.post('/', createDevice);

// Rota para LISTAR todos os dispositivos
router.get('/', listDevices);

// Rota para LIGAR/DESLIGAR um dispositivo
router.put('/:id/estado', updateDeviceState);

// Rota para DELETAR um dispositivo
router.delete('/:id', deleteDevice);

export default router;