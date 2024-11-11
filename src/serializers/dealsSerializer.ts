import { IPloomesDeal } from '../apis/ploomes/interfaces';

export const listDealsSerializer = (deal: IPloomesDeal) => {
  return {
    id: deal.Id,
    title: deal.Title,
    amount: deal.Amount,
    startDate: deal.StartDate,
    status: deal.Status,
  };
};
