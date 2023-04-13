import { Message, ModelName } from './types.js';
import { updateAndGetMessageHistory } from './lib/manageMessageHistory.js';
import { createContextFromStrings } from './lib/createContextMessage.js';
import { createSystemMessage } from './lib/createSystemMessage.js';
import { sendMessage } from './lib/sendMessage.js';

export async function chat(
	userMessage: Message,
	contexts?: string[],
	systemMessageContent?: string,
	modelName?: ModelName
): Promise<Message> {
	// Get message history
	const history = await updateAndGetMessageHistory();
	let chatLog = history.history;

	// Add contexts to the chat log
	const contextMessage = createContextFromStrings(contexts);
	if (contextMessage.content) {
		chatLog.push(contextMessage);
	}

	// Add system message to the chat log
	if (systemMessageContent) {
		const systemMessage = createSystemMessage(systemMessageContent, modelName);
		chatLog.push(systemMessage);
	}

	// Add user message to the chat log
	chatLog.push(userMessage);

	// Send message and get response
	const response = await sendMessage(chatLog);

	updateAndGetMessageHistory([userMessage, response]);

	return response;
}
