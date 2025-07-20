import { Router } from 'express';
import validationRequest from '../../middlewares/validationRequest';
import { classValidationSchema } from './class.validation';
import { classController } from './class.controller';
import auth from '../../middlewares/auth';
import { User_Role } from '../auth/auth.constant';

const router = Router();

router.post(
  '/',
  auth(User_Role.admin),
  validationRequest(classValidationSchema.createClassValidationSchema),
  classController.createClass,
);

router.get('/date/:date', classController.getClassDate);

router.get('/:id', classController.getClassById);

router.put('/:id', auth(User_Role.admin), classController.updateClass);

router.delete('/:id', auth(User_Role.admin), classController.deleteClass);

export const classRouter = router;
