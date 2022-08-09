import { Router } from 'express';
import WastedHourController from '../controllers/wastedHour';
import { jwtValidator } from '../middlewarres/validators/validJwt';

const router: Router = Router();

/**
 * request for wastedHour creation
 */
router.post('/:id', jwtValidator, WastedHourController.create);
/**
 * request for all wastedHours
 */
router.get('/all', jwtValidator, WastedHourController.getAll);
/**
 * request for single wastedHour
 */
router.get('/:id', jwtValidator, WastedHourController.get);
/**
 * request for single wastedHour by idSprint
 */
router.get('/sprint/:idSprint', jwtValidator, WastedHourController.getByIdSprint);
/**
 * request for single wastedHour by idUser
 */
router.get('/user/:idUser', jwtValidator, WastedHourController.getByIdUser);
/**
 * request for single wastedHour by idProject
 */
router.get('/project/:idProject', jwtValidator, WastedHourController.getByIdProject);
/**
 * request for single wastedHour by idTask
 */
router.get('/task/:idTask', jwtValidator, WastedHourController.getByIdTask);
/**
 * request for deleting wastedHour
 */
router.delete('/:id', jwtValidator, WastedHourController.delete);

export default router;