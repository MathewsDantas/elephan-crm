import { Request, Response } from 'express';

import CrmService from '../services/crmService';
import { cacheData } from '../helpers/cache';
import config from '../config/config';

class PipelineController {
  private crmService: CrmService;

  constructor() {
    this.crmService = CrmService.getInstance();
  }

  getAllPipelines = async (req: Request, res: Response): Promise<void> => {
    const pipeline = await this.crmService.getAllPipelines();

    cacheData('pipelines', config.CACHE_EXPIRATION, res, async () => {
      const pipelineFormatted = pipeline.map((pipe) => {
        return {
          id: pipe.Id,
          name: pipe.Name,
        };
      });

      return pipelineFormatted;
    });
  };

  getDealsByPipeline = async (req: Request, res: Response): Promise<void> => {
    const { statusId } = req.query;
    const { pipelineId } = req.params;

    const cacheKey = statusId
      ? `deals?pipelineId=${pipelineId}&statusId=${statusId}`
      : `deals?pipelineId=${pipelineId}`;

    await cacheData(cacheKey, config.CACHE_EXPIRATION, res, async () => {
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

      return dealsFormatted;
    });
  };
}

export default PipelineController;
