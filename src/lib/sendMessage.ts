// sendMessage.ts

import { openai } from './openaiClient.js';
import { Message } from '../types.js';

type Model = 'smart' | 'fast';

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
 * @param temperature The sampling temperature to use for generating the response. Must be between 0.0 and 2.0. Default is `0.0`.
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
	model?: Model,
	maxTokens?: number,
	temperature?: number,
	topP?: number
): Promise<Message> {
	let modelSelection: string;

	// Default model
	model = model ?? 'fast';

	if (model === 'smart') {
		modelSelection = 'gpt-4';
	} else if (model === 'fast') {
		modelSelection = 'gpt-3.5-turbo';
	} else {
		modelSelection = 'gpt-3.5-turbo';
	}

	// Set default values for optional parameters
	maxTokens = maxTokens ?? 500;
	temperature = temperature ?? 0.0;
	topP = topP ?? 1;

	const completion = await openai.createChatCompletion({
		model: modelSelection,
		messages: messagesArray,
		max_tokens: maxTokens,
		temperature: temperature,
		top_p: topP,
	});

	return completion.data.choices[0].message;
}
