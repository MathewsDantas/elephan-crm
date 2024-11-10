import { Request, Response } from 'express';

import CrmService from '../services/crmService';
import { cacheMiddleware } from '../middlewares/cache';

class PipelineController {
  private crmService: CrmService;

  constructor() {
    this.crmService = CrmService.getInstance();
  }

  getAllPipelines = async (req: Request, res: Response): Promise<void> => {
    const pipeline = await this.crmService.getAllPipelines();

    cacheMiddleware('pipelines')(req, res, async () => {
      const pipelineFormatted = pipeline.map((pipe) => {
        return {
          id: pipe.Id,
          name: pipe.Name,
        };
      });

      res.json(pipelineFormatted);
    });
  };

  getDealsByPipeline = async (req: Request, res: Response): Promise<void> => {
    const { statusId } = req.query;
    const { pipelineId } = req.params;

    await cacheMiddleware(`deals?pipelineId=${pipelineId}`)(req, res, async () => {
      const deals = await this.crmService.getDealsByPipeline(
        pipelineId,
        statusId as string
      );

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
    });
  };
}

export default PipelineController;
