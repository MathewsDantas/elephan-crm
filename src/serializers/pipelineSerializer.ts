import { IPloomesPipeline } from '../apis/ploomes/interfaces';

export const listPipelinesSerializer = (pipeline: IPloomesPipeline) => {
  return {
    id: pipeline.Id,
    name: pipeline.Name,
  };
};
