/**
 * A message object containing a role and content.
 * @typedef {Object} Message
 * @property {'system' | 'user' | 'assistant'} role - The role of the message sender.
 * @property {string} content - The content of the message.
 */
export type Message = {
	role: 'system' | 'user' | 'assistant';
	content: string;
};

/**
 * Enum for AI model names.
 * @enum {string}
 */
export enum ModelName {
	GPT_4 = 'gpt-4',
	GPT_4_32K = 'gpt-4-32k',
	GPT_3_5_TURBO = 'gpt-3.5-turbo',
}

/**
 * A chat configuration object containing various settings.
 * @typedef {Object} ChatConfiguration
 * @property {string} apiKey - The API key for accessing the AI service.
 * @property {ModelName} modelSelection - The AI model to use for chat.
 * @property {number} historyLength - The number of recent messages to include without summarization.
 * @property {ModelName} historySummarizationModel - The AI model to use for history summarization.
 * @property {Message[]} messageHistory - The array of message objects representing the chat history.
 * @property {Object} openaiOptions - Optional settings for the AI service.
 * @property {number} [openaiOptions.temperature] - The temperature for generating responses.
 * @property {number} [openaiOptions.topP] - The top_p value for nucleus sampling.
 * @property {number} [openaiOptions.n] - The number of responses to generate.
 * @property {boolean} [openaiOptions.stream] - Whether to use streaming mode.
 * @property {string | string[]} [openaiOptions.stop] - A string or array of strings to stop the response generation.
 * @property {number} [openaiOptions.maxTokens] - The maximum number of tokens for the generated response.
 * @property {number} [openaiOptions.presencePenalty] - The presence penalty for the generated response.
 * @property {number} [openaiOptions.frequencyPenalty] - The frequency penalty for the generated response.
 * @property {Object} [openaiOptions.logitBias] - An object of token strings and their biases.
 * @property {string} [openaiOptions.user] - A user identifier to associate with this chat completion.
 */
export interface ChatConfiguration {
	apiKey: string;
	modelSelection: ModelName;
	historyLength?: number;
	historySummarizationModel?: ModelName;
	messageHistory?: Message[];
	openaiOptions?: {
		temperature?: number;
		topP?: number;
		n?: number;
		stream?: boolean;
		stop?: string | string[];
		maxTokens?: number;
		presencePenalty?: number;
		frequencyPenalty?: number;
		logitBias?: { [token: string]: number };
		user?: string;
	};
}
