// src/config.ts
import { ChatConfiguration } from './types.js';

let chatConfig: ChatConfiguration;

export function configureChat(config: ChatConfiguration) {
	chatConfig = config;
}

export function getChatConfig() {
	return chatConfig;
}
