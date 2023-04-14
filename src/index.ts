/**
 * Conversation Engine
 * A wrapper on the OpenAI API providing additional features.
 */

export { configureChat } from './config.js';
export { chat } from './lib/processUserMessage.js';

// Export types
export type { Message, ChatConfiguration } from './types.js';
export { ModelName } from './types.js';
