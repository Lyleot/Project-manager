import { Router } from 'express';
import UserController from '../controllers/user';
import { jwtValidator } from '../middlewarres/validators/validJwt';

const router: Router = Router();

/**
 * request for user creation
 */
router.post('/', /* jwtValidator,*/ UserController.create);
/**
 * request for all users
 */
router.get('/all', jwtValidator, UserController.getAll);
/**
 * request for single user
 */
router.get('/:id', jwtValidator, UserController.get);
/**
 * request for user update
 */
router.patch('/:id', jwtValidator, UserController.update);
/**
 * request for deleting user
 */
router.delete('/:id', jwtValidator, UserController.delete);

export default router;