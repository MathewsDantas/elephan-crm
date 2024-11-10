import { AxiosResponse } from 'axios';
import config from '../config';
import crmAPI from './axios';
import {
  IPloomesContact,
  IPloomesContactResponse,
  IPloomesDeal,
  IPloomesDealResponse,
  IPloomesPipeline,
  IPloomesPipelineResponse,
} from '../apis/ploomes/interfaces';

class CrmService {
  private authHeaders: { 'User-Key': string } = {
    'User-Key': '',
  };
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

  async authenticate(apiKey: string): Promise<void> {
    await crmAPI.get('/Self', {
      headers: {
        'User-Key': apiKey,
      },
    });
  }

  async getContacts(email?: string): Promise<IPloomesContact[]> {
    let filter;

    if (email) {
      filter = `Email eq '${email}'`;
    }
    const response: AxiosResponse<IPloomesContactResponse> = await crmAPI.get(
      '/Contacts',
      {
        headers: this.authHeaders,
        params: {
          $filter: filter,
        },
      }
    );

    return response.data.value;
  }

  async getAllPipelines(): Promise<IPloomesPipeline[]> {
    const response: AxiosResponse<IPloomesPipelineResponse> = await crmAPI.get(
      '/Deals@Pipelines',
      { headers: this.authHeaders }
    );
    return response.data.value;
  }

  async getDealsByPipeline(
    pipelineId: string,
    statusId?: string
  ): Promise<IPloomesDeal[]> {
    let filter = `PipelineId eq ${pipelineId}`;

    if (statusId) {
      filter += ` and StatusId eq ${statusId}`;
    }
    const response: AxiosResponse<IPloomesDealResponse> = await crmAPI.get(
      '/Deals',
      {
        headers: this.authHeaders,
        params: {
          $filter: filter,
          $expand: 'Status',
        },
      }
    );

    return response.data.value;
  }

  async getDealsByContactId(contactId: string): Promise<IPloomesDeal[]> {
    let filter = `ContactId eq ${contactId}`;
    const response: AxiosResponse<IPloomesDealResponse> = await crmAPI.get(
      `/Deals`,
      {
        headers: this.authHeaders,
        params: {
          $filter: filter,
          $expand: 'Status',
        },
      }
    );
    return response.data.value;
  }
}

export default CrmService;
