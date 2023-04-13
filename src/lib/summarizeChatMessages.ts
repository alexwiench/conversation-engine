import { Message, ModelName } from '../types.js';
import { sendMessage } from './sendMessage.js';
import { countTokensInMessages } from './countTokensInMessages.js';

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
export async function summarizeChatMessages(
	messages: Message[],
	previousSummary?: Message,
	maxTokens?: number
) {
	// Concatenate messages into a single string
	const concatenatedMessages = messages
		.map((message) => `${roleToPronoun(message.role)}: ${message.content}`)
		.join('\n');

	// Include the previous summary if available
	const previousSummaryContent = previousSummary
		? `Previous summary:\n${previousSummary.content}\n\n`
		: '';

	// Send the summarization request to the AI model
	const command = `Succinctly summarize the following chat log. \n PREVIOUS SUMMARY: ${previousSummaryContent} NEW MESSAGE:\n\n${concatenatedMessages}`;
	const response = await sendMessage(
		[{ role: 'user', content: `${command}` }],
		ModelName.GPT_3_5_TURBO
	);

	// Create the summary message object
	const summary: Message = {
		role: 'user',
		content: `CHAT HISTORY SUMMARY: ${response.content}`,
	};

	// Calculate the token count
	const tokens = countTokensInMessages([summary], ModelName.GPT_3_5_TURBO);

	return {
		message: summary,
		tokens: tokens,
	};
}

function roleToPronoun(role: 'system' | 'user' | 'assistant'): string {
	switch (role) {
		case 'system':
			return 'ME';
		case 'user':
			return 'THEM';
		case 'assistant':
			return 'ME';
		default:
			return 'THEM';
	}
}
