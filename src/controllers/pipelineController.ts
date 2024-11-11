import { Request, Response } from 'express';

import CrmService from '../services/crmService';
import { cacheData } from '../helpers/cache';
import config from '../config/config';
import { listDealsSerializer } from '../serializers/dealsSerializer';
import { listPipelinesSerializer } from '../serializers/pipelineSerializer';

class PipelineController {
  private crmService: CrmService;

  constructor() {
    this.crmService = CrmService.getInstance();
  }

  getAllPipelines = async (req: Request, res: Response): Promise<void> => {
    const pipeline = await this.crmService.getAllPipelines();

    cacheData('pipelines', res, async () => {
      const pipelineFormatted = pipeline.map(listPipelinesSerializer);

      return pipelineFormatted;
    });
  };

  getDealsByPipeline = async (req: Request, res: Response): Promise<void> => {
    const { statusId } = req.query;
    const { pipelineId } = req.params;

    const cacheKey = statusId
      ? `deals?pipelineId=${pipelineId}&statusId=${statusId}`
      : `deals?pipelineId=${pipelineId}`;

    await cacheData(cacheKey, res, async () => {
      const deals = await this.crmService.getDealsByPipeline(
        pipelineId,
        statusId as string
      );

      const dealsFormatted = deals.map(listDealsSerializer);

      return dealsFormatted;
    });
  };
}

export default PipelineController;
