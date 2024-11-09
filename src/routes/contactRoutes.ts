import { Router } from 'express';
import ContactController from '../controllers/contactController';

const contactRoutes = Router();
const contactController = new ContactController();

/**
 * @swagger
 * /contacts:
 *   get:
 *     description: Retorna contatos
 *     parameters:
 *     - in: query
 *       name: email
 *       required: false
 *     responses:
 *       200:
 *         description: Retorna "Hello, world!"
 * */
contactRoutes.get('/contacts', contactController.getContacts);

/**
 * @swagger
 * /contacts/{contactId}/deals:
 *   get:
 *     description: Retorna deals por contato
 *     parameters:
 *       - in: path
 *         name: contactId
 *         required: true
 *     responses:
 *       200:
 *         description: Retorna "Hello, world!"
 * */
contactRoutes.get(
  '/contacts/:contactId/deals',
  contactController.getDealsByContactId
);

export default contactRoutes;
