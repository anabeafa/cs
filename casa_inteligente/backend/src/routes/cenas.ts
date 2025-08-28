import { Router } from 'express';
import {
    listScenes,
    createScene,
    updateScene,
    deleteScene,
    executeScene
} from '../controllers/sceneController' 
const router = Router();

// Rota para CRIAR uma nova cena
router.post('/', createScene);

// Rota para LISTAR todas as cenas
router.get('/', listScenes);

// Rota para ALTERAR uma cena
router.put('/:id', updateScene);

// Rota para DELETAR uma cena
router.delete('/:id', deleteScene);

// Rota para EXECUTAR uma cena
router.post('/:id/executar', executeScene);

export default router;