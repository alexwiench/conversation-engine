import { Configuration, OpenAIApi } from 'openai';
import { getChatConfig } from '../config.js';

// Configure the OpenAI API client
const { apiKey } = getChatConfig();
const configuration = new Configuration({ apiKey: apiKey });
export const openai = new OpenAIApi(configuration);
