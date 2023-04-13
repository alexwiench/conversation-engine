import { Message } from './types.js';
import { chat } from './processUserMessage.js';
import readline from 'readline';
import { updateAndGetMessageHistory } from './lib/manageMessageHistory.js';

const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout,
});

async function main() {
	console.log('Welcome to the CLI Chatbot! Type your message and press Enter to chat.');

	rl.setPrompt('> ');
	rl.prompt();

	rl.on('line', async (input) => {
		const userMessage: Message = { role: 'user', content: `'${input}'` };

		try {
			const response = await chat(userMessage, [''], 'You are a helpful AI Assistant.');
			console.log('Assistant:', response.content);
			// updateAndGetMessageHistory([userMessage, response]);
		} catch (error) {
			console.error('Error:', error.message);
		}

		rl.prompt();
	});

	rl.on('close', () => {
		console.log('Goodbye!');
	});
}

main();
