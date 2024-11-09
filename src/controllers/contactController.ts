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
            console.log(email);
            const contact = await this.crmService.getContacts(email as string);
            res.json(contact);
        } catch (error) {
            res.json({ error: (error as Error).message });
        }
    }

    getDealsByContactId = async (req: Request, res: Response): Promise<void> => {
        try {
            const { contactId } = req.params;
            const deals = await this.crmService.getDealsByContactId(contactId);
            res.json(deals);
        } catch (error) {
            res.json({ error: (error as Error).message });
        }
    }

}

export default ContactController;