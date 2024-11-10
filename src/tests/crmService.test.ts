import crmAPI from '../services/axios';
import CrmService from '../services/crmService';
import config from '../config/config';

jest.mock('../services/axios');
const mockedAxios = crmAPI as jest.Mocked<typeof crmAPI>;

describe('crmService', () => {
  const crmService = CrmService.getInstance();
  crmService.setApiKey(config.CRM_API_KEY as string);

  describe('getContacts', () => {
    it('Deve retornar o contato', async () => {
      const mockEmail = 'test@example.com';

      const contacts = [
        {
          Id: '1',
          Name: 'John Doe',
          Email: 'test@example.com',
          CPF: '12345678901',
          Birthday: '1990-01-01',
          AvatarUrl: 'http://example.com/avatar.jpg',
          CreateDate: '2021-01-01',
          LastUpdateDate: '2021-01-01',
        },
      ];

      mockedAxios.get.mockResolvedValueOnce({ data: { value: contacts } });

      const result = await crmService.getContacts(mockEmail);
      expect(result).toEqual(contacts);
    });

    it('Deve retornar um array vazio se não encontrar', async () => {
      const mockEmail = 'naoencontrado@notfound.com';

      mockedAxios.get.mockResolvedValueOnce({ data: { value: [] } });

      const result = await crmService.getContacts(mockEmail);

      expect(result).toEqual([]);
    });

    it('Deve retornar erro se a API retornar erro', async () => {
      const mockEmail = 'test@erro.com';

      mockedAxios.get.mockRejectedValueOnce(new Error('Erro na API'));

      await expect(crmService.getContacts(mockEmail)).rejects.toThrow(
        'Erro na API'
      );
    });
  });

  describe('getAllPipelines', () => {
    it('Deve retornar os pipelines', async () => {
      const pipelines = [
        {
          Id: '1',
          Name: 'Pipeline 1',
          CreateDate: '2021-01-01',
          LastUpdateDate: '2021-01-01',
        },
        {
          Id: '2',
          Name: 'Pipeline 2',
          CreateDate: '2021-01-01',
          LastUpdateDate: '2021-01-01',
        },
      ];

      mockedAxios.get.mockResolvedValueOnce({ data: { value: pipelines } });

      const result = await crmService.getAllPipelines();
      expect(result).toEqual(pipelines);
    });

    it('Deve retornar erro se a API retornar erro', async () => {
      mockedAxios.get.mockRejectedValueOnce(new Error('Erro na API'));

      await expect(crmService.getAllPipelines()).rejects.toThrow('Erro na API');
    });
  });
});
