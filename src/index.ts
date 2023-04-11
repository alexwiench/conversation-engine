import { Message } from './types.js';
import { chat } from './processUserMessage.js';
import readline from 'readline';

// const rl = readline.createInterface({
// 	input: process.stdin,
// 	output: process.stdout,
// });

// async function main() {
// 	console.log('Welcome to the CLI Chatbot! Type your message and press Enter to chat.');

// 	rl.setPrompt('> ');
// 	rl.prompt();

// 	rl.on('line', async (input) => {
// 		const userMessage: Message = { role: 'user', content: input };

// 		try {
// 			const response = await chat(userMessage, undefined, 'You are a good assistant');
// 			console.log('Assistant:', response.content);
// 		} catch (error) {
// 			console.error('Error:', error.message);
// 		}

// 		rl.prompt();
// 	});

// 	rl.on('close', () => {
// 		console.log('Goodbye!');
// 	});
// }

// main();

async function testChat() {
	const userMessage: Message = {
		role: 'user',
		content: 'Hello, how are you?',
	};

	const contexts = ['talk to me like a 1920s villain'];

	const systemMessageContent = 'The assistant is designed to help you with general questions.';

	const model = 'fast';

	try {
		let response = await chat(userMessage, contexts, systemMessageContent, model);
		response = await chat(userMessage, contexts, systemMessageContent, model);
		response = await chat(userMessage, contexts, systemMessageContent, model);
		response = await chat(userMessage, contexts, systemMessageContent, model);
		response = await chat(userMessage, contexts, systemMessageContent, model);
		response = await chat(userMessage, contexts, systemMessageContent, model);
		response = await chat(userMessage, contexts, systemMessageContent, model);
		response = await chat(userMessage, contexts, systemMessageContent, model);
		response = await chat(userMessage, contexts, systemMessageContent, model);

		console.log('Chatbot response:', response);
	} catch (error) {
		console.error('Error during testChat:', error);
	}
}

testChat();
