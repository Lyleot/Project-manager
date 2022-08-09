import { Router } from 'express';
import ProjectController from '../controllers/project';
import { jwtValidator } from '../middlewarres/validators/validJwt';

const router: Router = Router();

/**
 * request for project creation
 */
router.post('/', jwtValidator, ProjectController.create);
/**
 * request for all projects
 */
router.get('/all', jwtValidator, ProjectController.getAll);
/**
 * request for single project
 */
router.get('/:id', jwtValidator, ProjectController.get);
/**
 * request for project update
 */
router.patch('/:id', jwtValidator, ProjectController.update);
/**
 * request for deleting project
 */
router.delete('/:id', jwtValidator, ProjectController.delete);

export default router;