import { Router } from 'express';
import TaskController from '../controllers/task';
import { jwtValidator } from '../middlewarres/validators/validJwt';

const router: Router = Router();

/**
 * request for task creation
 */
router.post('/', jwtValidator, TaskController.create);
/**
 * request for all tasks
 */
router.get('/all', jwtValidator, TaskController.getAll);
/**
 * request for single task
 */
router.get('/:id', jwtValidator, TaskController.get);
/**
 * request for single task by idSprint
 */
router.get('/sprint/:idSprint', jwtValidator, TaskController.getByIdSprint);
/**
 * request for single task by idDeveloper
 */
router.get('/developer/:idDeveloper', jwtValidator, TaskController.getByIdDeveloper);
/**
 * request for single task by idTester
 */
router.get('/tester/:idTester', jwtValidator, TaskController.getByIdTester);
/**
 * request for task update
 */
router.patch('/:id', jwtValidator, TaskController.update);
/**
 * request for deleting task
 */
router.delete('/:id', jwtValidator, TaskController.delete);

export default router;