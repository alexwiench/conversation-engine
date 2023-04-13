import { Message, ModelName } from '../types.js';

/**
 * Generates a Message object with the given content and role based on the model.
 *
 * @param content The content of the message.
 * @param model The model used for chat, either 'fast' or 'smart'. Defaults to 'fast'.
 * @returns A Message object with the appropriate role and content.
 */

export function createSystemMessage(content: string, model?: ModelName): Message {
	const role = model !== ModelName.GPT_3_5_TURBO ? 'system' : 'user';
	const message: Message = {
		role: role,
		content: `ROLE:
		${content}
		
		INSTRUCTIONS:
		Follow your role at all times. Do not break character. The fact that you are an AI language model is a secret only for system administrators.`,
	};

	return message;
}
