import { Router } from 'express';

import PipelineController from '../controllers/pipelineController';

const pipelineRoutes = Router();

pipelineRoutes.get('/pipelines', new PipelineController().getPipeline);

export default pipelineRoutes;
