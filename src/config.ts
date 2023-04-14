import { ChatConfiguration, ModelName } from './types.js';
import { configureOpenaiClient } from './lib/configureOpenaiClient.js';

let chatConfig: ChatConfiguration = {
	apiKey: '',
	modelSelection: ModelName.GPT_3_5_TURBO,
	historyLength: 3,
	historySummarizationModel: ModelName.GPT_3_5_TURBO,
	messageHistory: [],
	openaiOptions: {},
};

/**
 * Configures the chat settings.
 *
 * @param {ChatConfiguration} config - The chat configuration object.
 */
export function configureChat(config: ChatConfiguration) {
	chatConfig.apiKey = config.apiKey;
	configureOpenaiClient(config.apiKey);
	chatConfig.modelSelection = config.modelSelection;
	chatConfig.historyLength = config.historyLength;
	chatConfig.historySummarizationModel = config.historySummarizationModel;
	chatConfig.messageHistory = config.messageHistory || [];
	chatConfig.openaiOptions = config.openaiOptions || {};
}

/**
 * Retrieves the chat configuration.
 *
 * @returns {ChatConfiguration} The chat configuration object.
 */
export function getChatConfig() {
	return chatConfig;
}
