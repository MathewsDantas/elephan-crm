import { Request, Response } from 'express';

import CrmService from "../services/crmService";

class ContactController {
    private crmService: CrmService;

    constructor() {
        this.crmService = CrmService.getInstance();
    }

    getContacts = async (req: Request, res: Response): Promise<void> => {
        try {
            const { email } = req.query;
            const contact = await this.crmService.getContacts(email as string);

            const contactFormatted = contact.map((contact) => {
                return {
                    id: contact.Id,
                    name: contact.Name,
                    email: contact.Email,
                    cpf: contact.CPF,
                    dataNascimento: contact.Birthday,
                    avatarUrl: contact.AvatarUrl,
                    createAt: contact.CreateDate,
                    updateAt: contact.LastUpdateDate,
                }
            });

            res.json(contactFormatted);
        } catch (error) {
            res.json({ error: (error as Error).message });
        }
    }

    getDealsByContactId = async (req: Request, res: Response): Promise<void> => {
        try {
            const { contactId } = req.params;
            const deals = await this.crmService.getDealsByContactId(contactId);

            const dealsFormatted = deals.map((deal) => {
                return {
                    id: deal.Id,
                    title: deal.Title,
                    amount: deal.Amount,
                    startDate: deal.StartDate,
                    status: deal.Status,
                };
            });

            res.json(dealsFormatted);
        } catch (error) {
            res.json({ error: (error as Error).message });
        }
    }

}

export default ContactController;