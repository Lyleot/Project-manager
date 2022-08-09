import { Router } from 'express';
import TimeTaskController from '../controllers/timeTask';
import { jwtValidator } from '../middlewarres/validators/validJwt';

const router: Router = Router();

/**
 * request for timeTask creation
 */
router.post('/', jwtValidator, TimeTaskController.create);
/**
 * request for all timeTasks
 */
router.get('/all', jwtValidator, TimeTaskController.getAll);
/**
 * request for single timeTask
 */
router.get('/:id', jwtValidator, TimeTaskController.get);
/**
 * request for single timeTask by idTask
 */
router.get('/task/:idTask', jwtValidator, TimeTaskController.getByIdTask);
/**
 * request for timeTask update
 */
router.patch('/:id', jwtValidator, TimeTaskController.update);
/**
 * request for deleting timeTask
 */
router.delete('/:id', jwtValidator, TimeTaskController.delete);

export default router;