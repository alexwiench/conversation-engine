// summarizeMessages.ts

import { Message } from '../types.js';
import { sendMessage } from './sendMessage.js';
import { countTokens } from './tokenCounter.js';

/**
 * Summarizes the input messages using the AI model and returns a single message object with the summary and token count.
 *
 * @param messages The array of messages to be summarized.
 * @param maxTokens The maximum number of tokens allowed for the summary.
 * @returns A Promise that resolves to an object containing the summary message and the token count.
 * @example
 * // Example of the returned object
 * {
 *   "message": { "role": "user", "content": "Summarized content..." },
 *   "tokens": 25
 * }
 */
export async function summarizeMessages(messages: Message[], maxTokens?: number) {
	// Concatenate messages into a single string
	const concatenatedMessages = messages
		.map((message) => `${message.role}: ${message.content}`)
		.join('\n');

	// Send the summarization request to the AI model
	const command = `Please summarize the following conversation. Messages:\n\n${concatenatedMessages}`;
	const response = await sendMessage([{ role: 'user', content: `${command}` }], 'fast');

	// Create the summary message object
	const summary: Message = {
		role: 'user',
		content: `CHAT HISTORY SUMMARY: ${response.content}`,
	};

	// Calculate the token count
	const tokens = countTokens([summary], 'fast');

	return {
		message: summary,
		tokens: tokens,
	};
}
