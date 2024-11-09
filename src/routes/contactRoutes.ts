import { Router } from 'express';
import ContactController from '../controllers/contactController';

const contactRoutes = Router();
const contactController = new ContactController();

contactRoutes.get('/contacts', contactController.getContacts);
contactRoutes.get('/contacts/:contactId/deals', contactController.getDealsByContactId);

export default contactRoutes;
