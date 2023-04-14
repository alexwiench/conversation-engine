import { Message } from '../types.js';
import { updateAndGetMessageHistory } from './manageMessageHistory.js';
import { createContextFromStrings } from './createContextMessage.js';
import { createSystemMessage } from './createSystemMessage.js';
import { sendMessage } from './sendMessage.js';
import { getChatConfig } from '../config.js';

/**
 * Processes a user message with the given context strings and optional system message content.
 * It retrieves the chat configuration, message history, adds context messages and system messages to the chat log,
 * sends the user message to the AI, and updates the message history with the user message and AI response.
 *
 * @param {Message} userMessage - The user message to be processed.
 * @param {string[]} contexts - Optional array of context strings to be included in the chat.
 * @param {string} systemMessageContent - Optional system message content to be included in the chat.
 * @returns {Promise<Message>} - A Promise that resolves to the AI-generated response message.
 */
export async function chat(
	userMessage: Message,
	contexts: string[] = [],
	systemMessageContent: string = ''
): Promise<Message> {
	const { modelSelection, historyLength, historySummarizationModel, openaiOptions } =
		getChatConfig();

	// Get message history
	const history = await updateAndGetMessageHistory(
		undefined,
		historyLength,
		historySummarizationModel
	);
	let chatLog = history;

	// Add contexts to the chat log
	const contextMessage = createContextFromStrings(contexts);
	if (contextMessage.content) {
		chatLog.push(contextMessage);
	}

	// Add system message to the chat log
	if (systemMessageContent) {
		const systemMessage = createSystemMessage(systemMessageContent, modelSelection);
		chatLog.push(systemMessage);
	}

	// Add user message to the chat log
	chatLog.push(userMessage);

	// Send message and get response
	const response = await sendMessage(chatLog, modelSelection, openaiOptions);

	// Update history in background
	updateAndGetMessageHistory([userMessage, response]);

	return response;
}
