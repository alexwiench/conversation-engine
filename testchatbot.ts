import { configureChat, chat, ModelName, Message } from './src/index.js';

import readline from 'readline';

// Configure the chat
configureChat({
	apiKey: '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',
	modelSelection: ModelName.GPT_3_5_TURBO,
	historyLength: 3,
});

const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout,
});

console.log('Welcome to the AI chatbot! Type your message below and press Enter to send.');

rl.prompt();
rl.on('line', async (input) => {
	const userMessage: Message = { role: 'user', content: input };
	// const context = [
	// 	'Exercise can reduce your risk of heart diseases',
	// 	'Exercise can improve your mental health and mood. ',
	// ];
	// const systemMessageContent = 'You are an AI health expert.';

	const response = await chat(userMessage);
	console.log(response);
	console.log(`AI: ${response.content}`);
	rl.prompt();
});

rl.on('close', () => {
	console.log('Goodbye!');
	process.exit(0);
});

//{
// 	role: 'assistant',
// 	content: '1. Enhanced Physical Fitness: Exercise helps improve various aspects of physical fitness, including cardiovascular endurance, muscular strength, flexibility, and balance. These improvements contribute to overall health, reduced risk of chronic diseases, and better quality of life.\n' +
// 	  '\n' +
// 	  '2. Mental Health Boost: Regular exercise is associated with improved mental health and mood. It assists in reducing stress, anxiety, and symptoms of depression, while also promoting better sleep and overall emotional well-being.'
//   }

/*
// The response object
{
	role: 'assistant',
	content: "Why couldn't the bicycle stand up by itself? Because it was two tired!"
}
*/
