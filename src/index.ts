import { Message } from './types.js';
import { messageHistory } from './lib/messageHistory.js';

// Sample messages
const message1: Message = { role: 'user', content: 'Hello, assistant!' };
const message2: Message = { role: 'assistant', content: 'Hello, how can I help you?' };
const message3: Message = { role: 'user', content: 'Tell me a joke.' };
const message4: Message = {
	role: 'assistant',
	content: 'Why did the chicken cross the road? To get to the other side!',
};
const message5: Message = { role: 'user', content: "That's an old one!" };
const message6: Message = {
	role: 'assistant',
	content: "I'll try to come up with something more original next time!",
};

// Test the messageHistory function with the sample messages
const result1 = await messageHistory(message1);
const result2 = await messageHistory(message2);
const result3 = await messageHistory(message3);
const result4 = await messageHistory(message4);
const result5 = await messageHistory(message5, 3); // Customize the cutoff value for this test
const result6 = await messageHistory(message6, 3); // Customize the cutoff and maxTokens values for this test

// Log the output
console.log(result1);
console.log(result2);
console.log(result3);
console.log(result4);
console.log(result5);
console.log(result6);
