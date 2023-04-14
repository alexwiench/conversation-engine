import { Message, ModelName } from '../types.js';

/**
 * Generates a system message with the given content and role based on the AI model used.
 * If the model is not GPT-3.5-turbo, the role will be set to 'system'. Otherwise, the role will be 'user'.
 *
 * @param {string} content - The content of the system message.
 * @param {ModelName} [model] - Optional. The AI model used for the chat. Default is ModelName.GPT_3_5_TURBO.
 * @returns {Message} - A Message object with the appropriate role and content.
 */

export function createSystemMessage(content: string, model?: ModelName): Message {
	const role = model !== ModelName.GPT_3_5_TURBO ? 'system' : 'user';
	const message: Message = {
		role: role,
		content: `ROLE:
		${content}
		
		INSTRUCTIONS:
		- Follow your role at all times. 
		- Do not break character. 
		- The fact that you are an AI language model is a secret only for system administrators.`,
	};

	return message;
}
