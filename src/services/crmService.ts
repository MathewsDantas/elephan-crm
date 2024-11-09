import config from '../config';
import crmAPI from './axios';

class CrmService {
  private authHeaders: { 'User-Key': string } = { 'User-Key': config.CRM_API_KEY || '' };
  private static instance: CrmService;

  static getInstance(): CrmService {
    if (!CrmService.instance) {
      CrmService.instance = new CrmService();
    }
    return CrmService.instance;
  }

  setApiKey(apiKey: string): void {
    this.authHeaders['User-Key'] = apiKey;
  }

  async getContacts(email?: string): Promise<any> {
    let filter

    if (email){
      filter = `Email eq '${email}'`;
    }

    const response = await crmAPI.get(
        '/Contacts', 
        { 
          headers: this.authHeaders, 
          params: { 
            $filter: filter
          }
        }
    );
    return response.data;
  }

  async getAllPipelines(): Promise<any> {
    try {
      const response = await crmAPI.get('/Deals@Pipelines', { headers: this.authHeaders });
      return response.data;
    } catch (error) {
      throw new Error('Erro ao buscar pipelines');
    }
  }

  async getDealsByPipeline(pipelineId: string, statusId?: string): Promise<any> {
    let filter = `PipelineId eq ${pipelineId}`;

    if (statusId) {
      filter += ` and StatusId eq ${statusId}`;
    }
    
    const response = await crmAPI.get(
        "/Deals", 
        { 
          headers: this.authHeaders, 
          params: { 
            $filter: filter
          }
        }
    );

    return response.data;
  }

  async getDealsByContactId(contactId: string): Promise<any> {
    let filter = `ContactId eq ${contactId}`;

    const response = await crmAPI.get(
        `/Deals`, 
        { 
          headers: this.authHeaders,
          params: { 
            $filter: filter
          }
        }
      );
    return response.data;
  }
}

export default CrmService;
