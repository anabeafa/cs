import { Router } from 'express';
import {
    listScenes,
    createScene,
    updateScene,
    deleteScene,
    executeScene
} from '../controllers/sceneController';

const router = Router();

router.post('/', createScene);        
router.get('/', listScenes);          
router.put('/:id', updateScene);        
router.delete('/:id', deleteScene);    
router.post('/:id/executar', executeScene); 

export default router;
