import { Request, Response } from 'express';

import CrmService from "../services/crmService";

class AuthController {

    connectCRM = (req: Request, res: Response): void => {
        const { apiKey } = req.query;
   
        if (!apiKey) {
            res.status(400).send('apiKey é obrigatório');
            return;
        }

        const crmService = CrmService.getInstance();
        crmService.setApiKey(apiKey as string);
        res.json({ message: 'Conectado com sucesso' });
    }
}

export default AuthController;
