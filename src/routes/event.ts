import { Router } from 'express';
import EventController from '../controllers/event';
import { jwtValidator } from '../middlewarres/validators/validJwt';

const router: Router = Router();

/**
 * request for event creation
 */
router.post('/', jwtValidator, EventController.create);
/**
 * request for all events
 */
router.get('/all', jwtValidator, EventController.getAll);
/**
 * request for single event
 */
router.get('/:id', jwtValidator, EventController.get);
/**
 * request for event update
 */
router.patch('/:id', jwtValidator, EventController.update);
/**
 * request for deleting event
 */
router.delete('/:id', jwtValidator, EventController.delete);


export default router;