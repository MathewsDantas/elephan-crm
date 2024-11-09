import { Router } from 'express';

import PipelineController from '../controllers/pipelineController';

const pipelineRoutes = Router();

pipelineRoutes.get('/pipelines', new PipelineController().getAllPipelines);
pipelineRoutes.get('/pipelines/:pipelineId/deals', new PipelineController().getDealsByPipeline);

export default pipelineRoutes;
