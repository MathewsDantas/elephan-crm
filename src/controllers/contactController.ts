import { Request, Response } from 'express';

import { BadRequestError } from '../helpers/api-erros';
import CrmService from '../services/crmService';
import { cacheData } from '../helpers/cache';
import config from '../config/config';
import { ListContactsSerializer } from '../serializers/contactSerializer';
import { listDealsSerializer } from '../serializers/dealsSerializer';

class ContactController {
  private crmService: CrmService;

  constructor() {
    this.crmService = CrmService.getInstance();
  }

  getContacts = async (req: Request, res: Response): Promise<void> => {
    const { email } = req.query;
    const cacheKey = email ? `contacts?email=${email}` : 'contacts';

    await cacheData(cacheKey, res, async () => {
      const contacts = await this.crmService.getContacts(email as string);

      if (email && contacts.length === 0) {
        throw new BadRequestError('Contato não encontrado');
      }

      const contactFormatted = contacts.map(ListContactsSerializer);

      return contactFormatted;
    });
  };

  getDealsByContactId = async (req: Request, res: Response): Promise<void> => {
    const { contactId } = req.params;
    const deals = await this.crmService.getDealsByContactId(contactId);

    await cacheData(`deals?contactId=${contactId}`, res, async () => {
      const dealsFormatted = deals.map(listDealsSerializer);

      return dealsFormatted;
    });
  };
}

export default ContactController;
