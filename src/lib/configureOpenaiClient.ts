import { Configuration, OpenAIApi } from 'openai';
import { API_KEY } from '../config.js';

// Configure the OpenAI API client
export const openaiApiKey = API_KEY;
const configuration = new Configuration({ apiKey: openaiApiKey });
export const openai = new OpenAIApi(configuration);
