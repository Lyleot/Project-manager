import { Router } from 'express';
import ImageController from '../controllers/image';
import { jwtValidator } from '../middlewarres/validators/validJwt';

const router: Router = Router();

/**
 * request for image creation
 */
router.post('/:idTask', jwtValidator, ImageController.create);
/**
 * request for all images
 */
router.get('/all', jwtValidator, ImageController.getAll);
/**
 * request for download image
 */
router.get('/:id', jwtValidator, ImageController.download);
/**
 * request for get image
 */
router.get('/task/:idTask', jwtValidator, ImageController.getByIdTask);
/**
 * request for deleting image
 */
router.delete('/:id', jwtValidator, ImageController.delete);


export default router;