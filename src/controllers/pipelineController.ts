import { Request, Response } from 'express';

import CrmService from "../services/crmService";

class PipelineController {

    getPipeline = async (req: Request, res: Response): Promise<void> => {
        try {
            const crmService = CrmService.getInstance();
            const pipeline = await crmService.getPipelines();
            res.json(pipeline);
        } catch (error) {
            console.log((error as Error).stack);
            res.json({ error: (error as Error).message });
        }
    }

}

export default PipelineController;