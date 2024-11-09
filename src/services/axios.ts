import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const crmAPI = axios.create({
  baseURL: process.env.CRM_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default crmAPI;
