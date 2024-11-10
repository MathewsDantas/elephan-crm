import { Request, Response } from 'express';

import CrmService from '../services/crmService';
import { BadRequestError } from '../helpers/api-erros';

class AuthController {
  private crmService: CrmService;

  constructor() {
    this.crmService = CrmService.getInstance();
  }

  connectCRM = async (req: Request, res: Response) => {
    const { apiKey } = req.query;

    if (!apiKey) {
      throw new BadRequestError('API Key não informada');
    }

    await this.crmService.authenticate(apiKey as string);

    this.crmService.setApiKey(apiKey as string);

    res.json({ message: 'Conexão realizada com sucesso' });
  };
}

export default AuthController;
