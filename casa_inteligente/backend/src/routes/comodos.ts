import { Router } from 'express';
import {
    listRooms,
    createRoom,
    updateRoom,
    deleteRoom
} from '../controllers/roomController'; 

const router = Router();

// Rota para CRIAR um novo cômodo
router.post('/', createRoom);

// Rota para LISTAR todos os cômodos
router.get('/', listRooms);

// Rota para ALTERAR um cômodo
router.put('/:id', updateRoom);

// Rota para DELETAR um cômodo
router.delete('/:id', deleteRoom);

export default router;