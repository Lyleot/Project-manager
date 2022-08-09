import { Router } from 'express';
import ReturnController from '../controllers/return';
import { jwtValidator } from '../middlewarres/validators/validJwt';

const router: Router = Router();

/**
 * request for return creation
 */
router.post('/:id', jwtValidator, ReturnController.create);
/**
 * request for all returns
 */
router.get('/all', jwtValidator, ReturnController.getAll);
/**
 * request for single return
 */
router.get('/:id', jwtValidator, ReturnController.get);
/**
 * request for single return by idSprint
 */
router.get('/sprint/:idSprint', jwtValidator, ReturnController.getByIdSprint);
/**
 * request for single return by idUser
 */
router.get('/user/:idUser', jwtValidator, ReturnController.getByIdUser);
/**
 * request for single return by idProject
 */
router.get('/project/:idProject', jwtValidator, ReturnController.getByIdProject);
/**
 * request for single return by idTask
 */
router.get('/task/:idTask', jwtValidator, ReturnController.getByIdTask);
/**
 * request for deleting return
 */
router.delete('/:id', jwtValidator, ReturnController.delete);

export default router;