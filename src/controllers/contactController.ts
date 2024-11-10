import { Request, Response } from 'express';

import { BadRequestError } from '../helpers/api-erros';
import CrmService from '../services/crmService';
import { cacheData } from '../helpers/cache';
import config from '../config/config';

class ContactController {
  private crmService: CrmService;

  constructor() {
    this.crmService = CrmService.getInstance();
  }

  getContacts = async (req: Request, res: Response): Promise<void> => {
    const { email } = req.query;
    const cacheKey = email ? `contacts?email=${email}` : 'contacts';

    await cacheData(cacheKey, config.CACHE_EXPIRATION, res, async () => {
      const contacts = await this.crmService.getContacts(email as string);

      if (email && contacts.length === 0) {
        throw new BadRequestError('Contato não encontrado');
      }

      const contactFormatted = contacts.map((contact) => {
        return {
          id: contact.Id,
          name: contact.Name,
          email: contact.Email,
          cpf: contact.CPF,
          dataNascimento: contact.Birthday,
          avatarUrl: contact.AvatarUrl,
          createAt: contact.CreateDate,
          updateAt: contact.LastUpdateDate,
        };
      });

      return contactFormatted;
    });
  };

  getDealsByContactId = async (req: Request, res: Response): Promise<void> => {
    const { contactId } = req.params;
    const deals = await this.crmService.getDealsByContactId(contactId);

    await cacheData(
      `deals?contactId=${contactId}`,
      config.CACHE_EXPIRATION,
      res,
      async () => {
        const dealsFormatted = deals.map((deal) => {
          return {
            id: deal.Id,
            title: deal.Title,
            amount: deal.Amount,
            startDate: deal.StartDate,
            status: deal.Status,
          };
        });

        return dealsFormatted;
      }
    );
  };
}

export default ContactController;
