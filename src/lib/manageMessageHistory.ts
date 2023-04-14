import { Message, ModelName } from '../types.js';
import { summarizeChatMessages } from './summarizeChatMessages.js';

// The messageHistoryArray stores the message history across function calls
const messageHistoryArray: Message[] = [];
// The previousSummary stores the last summarized message
let previousSummary: Message = { role: 'user', content: '' };

/**
 * Updates the message history with new messages and returns the combined chat history.
 * The chat history consists of a summary of older messages and the recent messages within the cutoff.
 *
 * @param {Message[]|undefined} newMessages - The new messages to add to the history.
 * @param {number} cutoff - Optional. The number of recent messages to include without summarization. Default is 6.
 * @param {ModelName} historySummarizationModel - Optional. The AI model to use for history summarization. Default is ModelName.GPT_3_5_TURBO.
 * @returns {Promise<Message[]>} - A Promise that resolves to the combined history (summary and recent messages).
 */

export async function updateAndGetMessageHistory(
	newMessages?: Message[],
	cutoff: number = 6,
	historySummarizationModel: ModelName = ModelName.GPT_3_5_TURBO
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
		summary = await summarizeChatMessages(
			[newestOldMessage],
			previousSummary,
			historySummarizationModel
		);
		previousSummary = summary; // Store the new summary
		combinedHistory = [summary, ...recentMessages];
	} else {
		combinedHistory = [previousSummary, ...recentMessages];
	}

	return combinedHistory;
}
