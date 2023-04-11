import { Message } from '../types.js';

type Model = 'fast' | 'smart';

/**
 * Generates a Message object with the given content and role based on the model.
 *
 * @param content The content of the message.
 * @param model The model used for chat, either 'fast' or 'smart'. Defaults to 'fast'.
 * @returns A Message object with the appropriate role and content.
 */

export function generateSystemMessage(content: string, model?: Model): Message {
	const role = model === 'smart' ? 'system' : 'user';
	const message: Message = {
		role: role,
		content: content,
	};

	return message;
}