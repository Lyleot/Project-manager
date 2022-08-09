import { Router } from 'express';
import PositionUserController from '../controllers/positionUser';
import { jwtValidator } from '../middlewarres/validators/validJwt';

const router: Router = Router();

/**
 * request for positionUser creation
 */
router.post('/', jwtValidator, PositionUserController.create);
/**
 * request for all positionUsers
 */
router.get('/all', jwtValidator, PositionUserController.getAll);
/**
 * request for single positionUser
 */
router.get('/:id', jwtValidator, PositionUserController.get);
/**
 * request for singlepositionUser
 */
router.get('/user/:idUser', jwtValidator, PositionUserController.getByIdUser);
/**
 * request for positionUser update
 */
router.patch('/:id', jwtValidator, PositionUserController.update);
/**
 * request for deleting positionUser
 */
router.delete('/:id', jwtValidator, PositionUserController.delete);

export default router;