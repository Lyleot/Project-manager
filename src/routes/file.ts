import { Router } from 'express';
import FileController from '../controllers/File';
import { jwtValidator } from '../middlewarres/validators/validJwt';

const router: Router = Router();

/**
 * request for file creation
 */
router.post('/:idTask', jwtValidator, FileController.create);
/**
 * request for all files
 */
router.get('/all', jwtValidator, FileController.getAll);
/**
 * request for download file
 */
router.get('/:id', jwtValidator, FileController.download);
/**
 * request for get file
 */
router.get('/task/:idTask', jwtValidator, FileController.getByIdTask);
/**
 * request for deleting file
 */
router.delete('/:id', jwtValidator, FileController.delete);


export default router;