# Conversation Engine

A powerful wrapper around the OpenAI API, providing additional features and making it easier to interact with AI models. Seamlessly chat with your AI assistant, include context strings, and manage conversation history.

Give it a message and it will handle the rest.

## Features

- Easy-to-use API for chatting with AI models
- Automatically handle chat history and context injection
- Built-in support for summarizing long conversations
- Customizable system instructions for controlling AI behavior
- Works with OpenAI API, making it easy to integrate with existing projects
- Built with TypeScript, providing type safety and autocompletion

## Installation

Install conversation-engine with npm

```bash
npm install conversation-engine
```

## Usage

### Minimal Example

```javascript
import { configureChat, chat, ModelName } from 'conversation-engine';

// Configure the chat
configureChat({
	apiKey: 'your-openai-api-key',
	modelSelection: ModelName.GPT_3_5_TURBO,
});

// Send a message
async function yourChatBot() {
	const userMessage = { role: 'user', content: 'Tell me a joke!' };
	const response = await chat(userMessage);

	/*
	// The response object
	{
	    role: 'assistant',
	    content: "Why couldn't the bicycle stand up by itself? Because it was two tired!"
	}
	*/

	console.log(response.content);
}

yourChatBot();
```

### Advanced Example

```javascript
import { configureChat, chat, ModelName } from 'conversation-engine';

// Configure the chat with more options
configureChat({
	apiKey: 'your-openai-api-key',
	modelSelection: ModelName.GPT_4,
	historyLength: 6,
	historySummarizationModel: ModelName.GPT_3_5_TURBO,
	openaiOptions: {
		temperature: 0.8,
		maxTokens: 500,
		presencePenalty: 0,
		frequencyPenalty: 0,
	},
});

async function yourAdvancedChatBot() {
	const userMessage = { role: 'user', content: 'What are two benefits of exercise?' };
	const context = [
		'Exercise can reduce your risk of heart diseases',
		'Exercise can improve your mental health and mood. ',
	];
	const systemMessageContent = 'You are an AI health expert.';

	const response = await chat(userMessage, context, systemMessageContent);
	console.log(response.content);
}

yourAdvancedChatBot();
```

> **Note**
> You should use dotenv to provide your apiKey.

## API Reference

### Message

A message object containing a role and content.

| Property  | Type     | Description                                                       |
| :-------- | :------- | :---------------------------------------------------------------- |
| `role`    | `string` | The role of the message sender (`system`, `user`, or `assistant`) |
| `content` | `string` | The content of the message                                        |

### ModelName

Enum for AI model names.

| Value           | Description         |
| :-------------- | :------------------ |
| `GPT_4`         | GPT-4 Model         |
| `GPT_4_32K`     | GPT-4-32K Model     |
| `GPT_3_5_TURBO` | GPT-3.5-Turbo Model |

### ChatConfiguration

A chat configuration object containing various settings.

| Property                    | Type        | Description                                                    |
| :-------------------------- | :---------- | :------------------------------------------------------------- |
| `apiKey`                    | `string`    | The API key for accessing the AI service                       |
| `modelSelection`            | `ModelName` | The AI model to use for chat                                   |
| `historyLength`             | `number`    | The number of recent messages to include without summarization |
| `historySummarizationModel` | `ModelName` | The AI model to use for history summarization                  |
| `messageHistory`            | `Message[]` | The array of message objects representing the chat history     |

### OpenAIOptions

Optional settings for the OpenAI API. [Check out their documentation.](https://platform.openai.com/docs/api-reference/chat/create)

| Property           | Type                          | Description                                                            |
| :----------------- | :---------------------------- | :--------------------------------------------------------------------- |
| `temperature`      | `number`                      | The temperature for generating responses                               |
| `topP`             | `number`                      | The top_p value for nucleus sampling                                   |
| `n`                | `number`                      | The number of responses to generate                                    |
| `stream (broken)`  | `boolean`                     | Whether to use streaming mode. **(Streaming does not work currently)** |
| `stop`             | `string \| string[]`          | A string or array of strings to stop the response generation           |
| `maxTokens`        | `number`                      | The maximum number of tokens for the generated response                |
| `presencePenalty`  | `number`                      | The presence penalty for the generated response                        |
| `frequencyPenalty` | `number`                      | The frequency penalty for the generated response                       |
| `logitBias`        | `{ [token: string]: number }` | An object of token strings and their biases                            |
| `user`             | `string`                      | A user identifier to associate with this chat completion               |

## FAQ

### Q: Which AI Models Can I Use with This Module?

A: You can use any of the models available in the OpenAI API, such as GPT-4, GPT-4-32K, and GPT-3.5-Turbo. You can refer to the ModelName enum for a complete list of supported models.

### Q: How Do I Provide Context for the Conversation?

A: You can provide context by passing an array of context strings to the chat() function. This will include the context messages in the conversation, making it easier for the AI to understand the context.

### Q: How Does Message History Summarization Work?

A: The message history summarization feature helps to condense long conversations into a shorter, summarized form. This allows the AI to focus on the most relevant information and provide better responses. The summarization is done using the AI model specified in the ChatConfiguration object.

## Future Features

- Working streaming responses
- Import past history
- Add tests
