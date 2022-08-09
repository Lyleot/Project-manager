import { Router } from 'express';
import CommentController from '../controllers/comment';
import { jwtValidator } from '../middlewarres/validators/validJwt';

const router: Router = Router();

/**
 * request for comment creation
 */
router.post('/', jwtValidator, CommentController.create);
/**
 * request for all comments
 */
router.get('/all', jwtValidator, CommentController.getAll);
/**
 * request for single comment
 */
router.get('/:id', jwtValidator, CommentController.get);
/**
 * request for single comment by idSprint
 */
router.get('/sprint/:idSprint', jwtValidator, CommentController.getByIdSprint);
/**
 * request for single comment by idProject
 */
router.get('/project/:idProject', jwtValidator, CommentController.getByIdProject);
/**
 * request for single comment by idTask
 */
router.get('/task/:idTask', jwtValidator, CommentController.getByIdTask);
/**
 * request for single comment by idReturn
 */
router.get('/return/:idReturn', jwtValidator, CommentController.getByIdReturn);
/**
 * request for single comment by idWastedHour
 */
router.get('/wastedHour/:idWastedHour', jwtValidator, CommentController.getByIdWastedHour);
/**
 * request for comment update
 */
router.patch('/:id', jwtValidator, CommentController.update);
/**
 * request for deleting comment
 */
router.delete('/:id', jwtValidator, CommentController.delete);

export default router;