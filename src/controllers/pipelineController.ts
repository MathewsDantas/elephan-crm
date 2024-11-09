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

            const pipelineFormatted = pipeline.map((pipe) => {
                return {
                    id: pipe.Id,
                    name: pipe.Name,
                };
            });

            res.json(pipelineFormatted);
        } catch (error) {
            res.json({ error: (error as Error).message });
        }
    }

    getDealsByPipeline = async (req: Request, res: Response): Promise<void> => {
        try {
            const { statusId } = req.query;
            const { pipelineId } = req.params;
            const deals = await this.crmService.getDealsByPipeline(pipelineId, statusId as string);

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

export default PipelineController;
