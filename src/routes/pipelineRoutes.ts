import { Router } from 'express';
import PipelineController from '../controllers/pipelineController';

const pipelineRoutes = Router();
const pipelineController = new PipelineController();

/**
 * @swagger
 * /pipelines:
 *   get:
 *     description: Retorna pipelines
 *     responses:
 *       200:
 *         description: Retorna "Hello, world!"
 * */
pipelineRoutes.get('/pipelines', pipelineController.getAllPipelines);

/**
 * @swagger
 * /pipelines/{pipelineId}/deals:
 *   get:
 *     description: Retorna deals por pipeline
 *     parameters:
 *       - in: path
 *         name: pipelineId
 *         required: true
 *       - in: query
 *         name: statusId
 *         required: false
 *     responses:
 *       200:
 *         description: Retorna "Hello, world!"
 * */
pipelineRoutes.get(
  '/pipelines/:pipelineId/deals',
  pipelineController.getDealsByPipeline
);

export default pipelineRoutes;
