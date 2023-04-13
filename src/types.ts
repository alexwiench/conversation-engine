export type Message = {
	role: 'system' | 'user' | 'assistant';
	content: string;
};

export enum ModelName {
	GPT_4 = 'gpt-4',
	GPT_4_32K = 'gpt-4-32k',
	GPT_3_5_TURBO = 'gpt-3.5-turbo',
}

export interface ChatConfiguration {
	apiKey: string;
	modelSelection: ModelName;
	historyLength: number;
	historySummarizationModel: ModelName;
	streamResponse: boolean;
	messageHistory: Message[];
}
