import { Router } from 'express';
import SprintController from '../controllers/sprint';
import { jwtValidator } from '../middlewarres/validators/validJwt';

const router: Router = Router();

/**
 * request for sprint creation
 */
router.post('/', jwtValidator, SprintController.create);
/**
 * request for all sprints
 */
router.get('/all', jwtValidator, SprintController.getAll);
/**
 * request for single sprint
 */
router.get('/:id', jwtValidator, SprintController.get);
/**
 * request for single sprint
 */
router.get('/project/:idProject', jwtValidator, SprintController.getByIdProjecrt);
/**
 * request for sprint update
 */
router.patch('/:id', jwtValidator, SprintController.update);
/**
 * request for deleting user
 */
router.delete('/:id', jwtValidator, SprintController.delete);

export default router;