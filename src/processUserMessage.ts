import { Message } from './types.js';
import { messageHistory } from './lib/messageHistory.js';
import { createContextMessage } from './lib/contextStringsToMessages.js';
import { generateSystemMessage } from './lib/generateSystemMessage.js';
import { sendMessage } from './lib/sendMessage.js';

export async function chat(
	userMessage: Message,
	contexts?: string[],
	systemMessageContent?: string,
	model?: 'fast' | 'smart'
): Promise<Message> {
	// Get message history
	const history = await messageHistory();
	let chatLog = history.history;

	// Add contexts to the chat log
	const contextMessage = createContextMessage(contexts);
	if (contextMessage.content) {
		chatLog.push(contextMessage);
	}

	// Add system message to the chat log
	if (systemMessageContent) {
		const systemMessage = generateSystemMessage(systemMessageContent, model);
		chatLog.push(systemMessage);
	}

	// Add user message to the chat log
	chatLog.push(userMessage);

	console.log('MESSAGE');
	console.log(chatLog);

	// Send message and get response
	const response = await sendMessage(chatLog);

	// Update message history with user message and response in background
	messageHistory(userMessage);
	messageHistory(response);

	return response;
}
