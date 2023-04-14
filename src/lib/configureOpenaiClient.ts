import { Configuration, OpenAIApi } from 'openai';

let openai: OpenAIApi | null = null;

export function configureOpenaiClient(apiKey: string) {
	const configuration = new Configuration({ apiKey });
	openai = new OpenAIApi(configuration);
}

export function getOpenaiClient() {
	if (!openai) {
		throw new Error(
			'OpenAI client is not configured yet. Please call configureOpenaiClient(apiKey) first.'
		);
	}
	return openai;
}
