import { Request, Response } from 'express';

import CrmService from "../services/crmService";

class PipelineController {
    private crmService: CrmService;

    constructor() {
        this.crmService = CrmService.getInstance();
    }

    getAllPipelines = async (req: Request, res: Response): Promise<void> => {
        try {
            const pipeline = await this.crmService.getAllPipelines();
            res.json(pipeline);
        } catch (error) {
            res.json({ error: (error as Error).message });
        }
    }

    getDealsByPipeline = async (req: Request, res: Response): Promise<void> => {
        try {
            const { statusId } = req.query;
            const { pipelineId } = req.params;
            const deals = await this.crmService.getDealsByPipeline(pipelineId, statusId as string);
            res.json(deals);
        } catch (error) {
            res.json({ error: (error as Error).message });
        }
    }
}

export default PipelineController;
