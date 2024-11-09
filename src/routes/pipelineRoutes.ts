import { Router } from 'express';
import PipelineController from '../controllers/pipelineController';

const pipelineRoutes = Router();
const pipelineController = new PipelineController();

pipelineRoutes.get('/pipelines', pipelineController.getAllPipelines);
pipelineRoutes.get('/pipelines/:pipelineId/deals', pipelineController.getDealsByPipeline);

export default pipelineRoutes;
