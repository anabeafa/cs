import { Router } from 'express';
import {
  listDevices,
  createDevice,
  updateDeviceState,
  deleteDevice
} from '../controllers/deviceController';

const router = Router();

router.get('/', listDevices);
router.post('/', createDevice);
router.put('/:id', updateDeviceState);
router.delete('/:id', deleteDevice);

export default router;
