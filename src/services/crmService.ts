import axios from 'axios';

import config from '../config';

class CrmService {
  private authHeaders: { Authorization: string } = { Authorization: '' };
  private static instance: CrmService;

  static getInstance(): CrmService {
    if (!CrmService.instance) {
      CrmService.instance = new CrmService();
    }
    return CrmService.instance;
  }

  setApiKey(apiKey: string): void {
    this.authHeaders.Authorization = `Bearer ${apiKey}`;
  }

  async getContactByEmail(email: string): Promise<any> {
    const url = `${config.CRM_API_URL}/contacts`;
    const response = await axios.get(
        url, 
        { 
          headers: this.authHeaders, 
          params: { email }
        }
    );
    return response.data;
  }

  async getPipelines(): Promise<any> {
    const url = `${config.CRM_API_URL}/pipelines`;
    try {
      const response = await axios.get(url, { headers: this.authHeaders });
      return response.data;
    } catch (error) {
      throw new Error('Erro ao buscar pipelines');
    }
  }

  async getDealsByPipeline(pipelineId: string): Promise<any> {
    const url = `${config.CRM_API_URL}/deals`;
    const response = await axios.get(
        url, 
        { 
          headers: this.authHeaders, 
          params: { pipelineId }
        }
    );
    return response.data;
  }
}

export default CrmService;
