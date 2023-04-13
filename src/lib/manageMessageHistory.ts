// messageHistory.ts
import { Message, ModelName } from '../types.js';
import { summarizeChatMessages } from './summarizeChatMessages.js';
import { countTokensInMessages } from './countTokensInMessages.js';

// The messageHistoryArray stores the message history across function calls
const messageHistoryArray: Message[] = [];
// The previousSummary stores the last summarized message
let previousSummary: Message = { role: 'user', content: '' };

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

export async function updateAndGetMessageHistory(
	newMessages?: Message[],
	cutoff: number = 6,
	maxTokens: number = 500
) {
	let isNewMessage = false;

	// Update the message history with the new message, if provided
	if (newMessages) {
		messageHistoryArray.push(...newMessages);
		isNewMessage = true;
	}

	// Separate older messages (to be summarized) and recent messages (within the cutoff)
	const olderMessages = messageHistoryArray.slice(0, -cutoff);
	const recentMessages = messageHistoryArray.slice(-cutoff);

	let summary;
	let combinedHistory: Message[];

	// Summarize the older messages if there are any
	if (olderMessages.length > 0 && isNewMessage) {
		const newestOldMessage = olderMessages[olderMessages.length - 1];
		summary = await summarizeChatMessages([newestOldMessage], previousSummary);
		previousSummary = summary.message; // Store the new summary
		combinedHistory = [summary.message, ...recentMessages];
	} else {
		combinedHistory = [previousSummary, ...recentMessages];
	}

	let totalTokens = countTokensInMessages(combinedHistory, ModelName.GPT_3_5_TURBO);

	return {
		history: combinedHistory,
		totalTokens: totalTokens,
	};
}
