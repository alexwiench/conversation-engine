# Conversation Engine

A library for non-persistent conversations with OpenAi's ChatGPT apis.

Give it a user's message and context and it will handle the rest.

> **Who is this for?**
> Any project that needs a "disposable" conversation bot. So a project documentation chat bot, wiki chatbot or more.

## Features

- Chat history
- Automatic history summarization
- Context injection
- Strong system messages

## Usage

Don't use this yet. It's not done.

```typescript
import { configureChat, chat } from 'conversationEngine';

const chatConfig = {
	apiKey: 'key',
	modelSelection: 'gpt-4',
	historyLength: 6,
	historySummarizationModel: 'turbo',
	streamResponse: false,
	messageHistory: ['array of messages'],
};

configureChat(chatConfig);

let systemMessage = 'system message';
let contexts = ['thing 1', 'thing 2'];
let userMessage = 'this is the message';

//actual function use
let chatResponse = chat(userMessage, contexts, systemMessage);

//returns this object
chatResponse.response = 'response object';
chatResponse.chatState = 'entire array of messages currently in chat';
```
