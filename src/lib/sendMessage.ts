// sendMessage.ts

import { openai } from './configureOpenaiClient.js';
import { Message, ModelName } from '../types.js';

/**
 * Handles sending messages with a specified model and returns the AI-generated response message.
 * This function takes in an array of messages and optional parameters for the OpenAI API.
 *
 * @param messagesArray An array of message objects containing role and content.
 * @example
 * // Example of messagesArray:
 * [
 * 	{ "role": "system", "content": "You are a helpful assistant." },
 * 	{ "role": "user", "content": "Hello there." }
 * ]
 * @param model The model to use for generating the response ('smart' or 'fast'). Default is 'fast'.
 * @param maxTokens The maximum number of tokens for the generated response. Default is `150`.
 * @param temperature The sampling temperature to use for generating the response. Must be between 0.0 and 2.0. Default is `0.7`.
 * @param topP The top_p value to use for nucleus sampling. Default is `1`.
 * @returns A Promise that resolves to the generated message object.
 * @example
 * // Example of the returned object
 * {
 *   "role": "assistant",
 *   "content": "Hello, how can I help you?"
 * }
 */
export async function sendMessage(
	messagesArray: Message[],
	modelName: ModelName = ModelName.GPT_3_5_TURBO,
	maxTokens: number = 500,
	temperature: number = 0.7,
	topP: number = 1
): Promise<Message> {
	const completion = await openai.createChatCompletion({
		model: modelName,
		messages: messagesArray,
		max_tokens: maxTokens,
		temperature: temperature,
		top_p: topP,
	});

	return completion.data.choices[0].message;
}
