// messageHistory.ts
import { Message } from '../types.js';
import { summarizeMessages } from './summarizeMessages.js';
import { countTokens } from './tokenCounter.js';

// The messageHistoryArray stores the message history across function calls
const messageHistoryArray: Message[] = [];

/**
 * Updates the message history with a new message and returns a combined chat history with the total token count.
 * The chat history consists of a summary of older messages and the recent messages within the cutoff.
 *
 * @param newMessage The new message to add to the history.
 * @param cutoff The number of recent messages to include without summarization.
 * @param maxTokens The maximum number of tokens allowed for the summarized history.
 * @returns A Promise that resolves to an object containing the combined history (summary and recent messages) and the total token count.
 * @example
 * // Example of the returned object
 * {
 *   "history": [
 *     { "role": "user", "content": "Previously summarized content..." },
 *     { "role": "assistant", "content": "Recent message 1" },
 *     { "role": "user", "content": "Recent message 2" }
 *   ],
 *   "totalTokens": 42
 * }
 */
export async function messageHistory(newMessage: Message, cutoff?: number, maxTokens?: number) {
	// Set default values for optional parameters
	cutoff = cutoff ?? 6;
	maxTokens = maxTokens ?? 500;

	// Update the message history with the new message
	messageHistoryArray.push(newMessage);

	// Separate older messages (to be summarized) and recent messages (within the cutoff)
	const olderMessages = messageHistoryArray.slice(0, -cutoff);
	const recentMessages = messageHistoryArray.slice(-cutoff);

	let summary;
	let combinedHistory: Message[];

	// Summarize the older messages if there are any
	if (olderMessages.length > 0) {
		summary = await summarizeMessages(olderMessages);
		combinedHistory = [summary.message, ...recentMessages];
	} else {
		combinedHistory = recentMessages;
	}

	let totalTokens = countTokens(combinedHistory, 'fast'); // Use 'fast' or 'smart' based on your preference

	return {
		history: combinedHistory,
		totalTokens: totalTokens,
	};
}
