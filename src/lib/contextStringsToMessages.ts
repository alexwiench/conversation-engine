import { Message } from '../types.js';

/**
 * Takes an array of context strings and formats them into a single Message object with the 'user' role.
 *
 * @param contexts An array of context strings.
 * @returns A Message object containing the concatenated context strings.
 */

export function createContextMessage(contexts?: string[]): Message {
	if (contexts) {
		const delimiter = '\n';
		const content = contexts.join(delimiter);
		return { role: 'user', content: content };
	}
}
