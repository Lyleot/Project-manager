import { Router } from 'express';
import PushTimeController from '../controllers/pushTime';
import { jwtValidator } from '../middlewarres/validators/validJwt';

const router: Router = Router();

/**
 * request for pushTime creation
 */
router.post('/', jwtValidator, PushTimeController.create);
/**
 * request for all pushTimes
 */
router.get('/all', jwtValidator, PushTimeController.getAll);
/**
 * request for single pushTime
 */
router.get('/:id', jwtValidator, PushTimeController.get);
/**
 * request for single pushTime by idUser
 */
router.get('/user/:idUser', jwtValidator, PushTimeController.getByIdUser);
/**
 * request for single pushTime by idTask
 */
router.get('/task/:idTask', jwtValidator, PushTimeController.getByIdTask);
/**
 * request for deleting pushTime
 */
router.delete('/:id', jwtValidator, PushTimeController.delete);

export default router;