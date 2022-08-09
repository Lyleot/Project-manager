import { Router } from 'express';
import AuthController from '../controllers/authorization';

const router: Router = Router();

router.post('/login', AuthController.login);

export default router;
