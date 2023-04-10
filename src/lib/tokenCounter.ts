// tokenCounter.ts

import { encoding_for_model, TiktokenModel } from '@dqbd/tiktoken';
import { Message } from '../types.js';

/**
 * Counts the number of tokens in a given text string using the specified AI model's tokenizer.
 *
 * @param text The text string to count tokens for.
 * @param modelName The name of the AI model to use for tokenization (e.g., "gpt-3.5-turbo").
 * @returns The number of tokens in the text.
 */

type Model = 'smart' | 'fast';

export function countTokens(messages: Message[], modelName: Model): number {
	let modelSelection: TiktokenModel;

	if (modelName === 'smart') {
		modelSelection = 'gpt-4';
	} else if (modelName === 'fast') {
		modelSelection = 'gpt-3.5-turbo';
	} else {
		modelSelection = 'gpt-3.5-turbo';
	}

	const encoder = encoding_for_model(modelSelection);

	const tokenCount = messages.reduce((acc, message) => {
		const tokens = encoder.encode(message.content);
		return acc + tokens.length;
	}, 0);

	// Free the encoder resources after use
	encoder.free();

	return tokenCount;
}
