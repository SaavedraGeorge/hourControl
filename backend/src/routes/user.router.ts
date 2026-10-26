import { Router } from 'express';
import { UserController } from '../controllers/user.controller';

const router = Router();

// Registro de nuevo usuario
router.post('/', UserController.register);

// Login de usuario
router.post('/login', UserController.login);

export default router;
