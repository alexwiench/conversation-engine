import { Message, ModelName } from '../types.js';
import { sendMessage } from './sendMessage.js';

/**
 * Summarizes the input messages using the AI model and returns a single message object with the summary.
 * Optionally, includes the previous summary in the summarization process.
 *
 * @param {Message[]} messages - The array of messages to be summarized.
 * @param {Message} [previousSummary] - Optional. A previous summary to include in the summarization process.
 * @param {ModelName} [modelName] - Optional. The AI model to use for summarization. Default is determined by chat configuration.
 * @returns {Promise<Message>} - A Promise that resolves to the summary message.
 */

export async function summarizeChatMessages(
	messages: Message[],
	previousSummary?: Message,
	modelName?: ModelName
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
	const response = await sendMessage([{ role: 'user', content: `${command}` }], modelName);

	// Create the summary message object
	const summary: Message = {
		role: 'user',
		content: `CHAT HISTORY SUMMARY: ${response.content}`,
	};

	return summary;
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
