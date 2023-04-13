import { encoding_for_model, TiktokenModel } from '@dqbd/tiktoken';
import { Message, ModelName } from '../types.js';
/**
 * Counts the number of tokens in a given text string using the specified AI model's tokenizer.
 *
 * @param text The text string to count tokens for.
 * @param modelName The name of the AI model to use for tokenization (e.g., "gpt-3.5-turbo").
 * @returns The number of tokens in the text.
 */

export function countTokensInMessages(messages: Message[], modelName: ModelName): number {
	const encoder = encoding_for_model(modelName);

	const tokenCount = messages.reduce((acc, message) => {
		const tokens = encoder.encode(message.content);
		return acc + tokens.length;
	}, 0);

	// Free the encoder resources after use
	encoder.free();

	return tokenCount;
}
