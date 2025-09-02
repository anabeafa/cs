import { Router } from 'express';
import {
    listScenes,
    createScene,
    updateScene,
    deleteScene,
    executeScene
} from '../controllers/sceneController';

const router = Router();

router.post('/', createScene);          // Criar cena
router.get('/', listScenes);            // Listar cenas
router.put('/:id', updateScene);        // Atualizar cena
router.delete('/:id', deleteScene);     // Deletar cena
router.post('/:id/executar', executeScene); // Executar cena (POST, conforme seu código)

export default router;
