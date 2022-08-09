import { Router } from 'express';
import UserProjectController from '../controllers/userProject';
import { jwtValidator } from '../middlewarres/validators/validJwt';

const router: Router = Router();

/**
 * request for userProject creation
 */
router.post('/', jwtValidator, UserProjectController.create);
/**
 * request for all userProjects
 */
router.get('/all', jwtValidator, UserProjectController.getAll);
/**
 * request for single userProject
 */
router.get('/:id', jwtValidator, UserProjectController.get);
/**
 * request for single userProject
 */
router.get('/user/:idUser', jwtValidator, UserProjectController.getByIdUser);
/**
 * request for single userProject
 */
router.get('/project/:idProject', jwtValidator, UserProjectController.getByIdProjecrt);
/**
 * request for deleting userProject
 */
router.delete('/:id', jwtValidator, UserProjectController.delete);

export default router;