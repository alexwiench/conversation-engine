import { getOpenaiClient } from './configureOpenaiClient.js';
import { Message, ModelName } from '../types.js';

/**
 * Handles sending messages with a specified model and returns the AI-generated response message.
 * This function takes in an array of messages and optional parameters for the OpenAI API.
 *
 * @param {Message[]} messagesArray - An array of message objects containing role and content.
 * @param {ModelName} modelName - Optional. The model to use for generating the response. Default is ModelName.GPT_3_5_TURBO.
 * @param {Object} openaiOptions - Optional. Additional options for the OpenAI API request.
 * @param {number} openaiOptions.temperature - The sampling temperature to use for generating the response. Must be between 0.0 and 2.0. Default is determined by chat configuration.
 * @param {number} openaiOptions.topP - The top_p value to use for nucleus sampling. Default is determined by chat configuration.
 * @param {number} openaiOptions.n - How many chat completion choices to generate for each input message. Default is determined by chat configuration.
 * @param {boolean} openaiOptions.stream - If set, partial message deltas will be sent. Default is determined by chat configuration.
 * @param {string|string[]} openaiOptions.stop - Up to 4 sequences where the API will stop generating further tokens. Default is determined by chat configuration.
 * @param {number} openaiOptions.maxTokens - The maximum number of tokens to generate in the chat completion. Default is determined by chat configuration.
 * @param {number} openaiOptions.presencePenalty
 * @param {number} openaiOptions.frequencyPenalty - How much to penalize new tokens based on their frequency in the training set. Default is determined by chat configuration.
 * @param {Object} openaiOptions.logitBias - An object of token strings and their biases. Default is determined by chat configuration.
 * @param {string} openaiOptions.user - A user identifier to associate with this chat completion. Default is determined by chat configuration.
 * @returns {Promise<Message>} - A Promise that resolves to the generated message object.
 */

export async function sendMessage(
	messagesArray: Message[],
	modelName: ModelName = ModelName.GPT_3_5_TURBO,
	openaiOptions: {
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
	} = {}
): Promise<Message> {
	const client = getOpenaiClient();
	const completion = await client.createChatCompletion({
		model: modelName,
		messages: messagesArray,
		...openaiOptions,
	});

	return completion.data.choices[0].message;
}
