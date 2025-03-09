import axios from 'axios';
import { Message } from './schema';
import { Config } from './config';

export class LLM {
  private config: any;
  private model: string;
  private baseUrl: string;
  private apiKey: string;
  private maxTokens: number;
  private temperature: number;

  constructor() {
    const config = Config.getInstance();
    const llmConfig = config.llm.default;
    
    this.model = llmConfig.model;
    this.baseUrl = llmConfig.baseUrl;
    this.apiKey = llmConfig.apiKey;
    this.maxTokens = llmConfig.maxTokens;
    this.temperature = llmConfig.temperature;
  }

  async askTool({
    messages,
    systemMsgs,
    tools,
    toolChoice = 'auto',
    temperature,
    timeout = 60000
  }: {
    messages: Message[];
    systemMsgs?: Message[];
    tools?: any[];
    toolChoice?: 'none' | 'auto' | 'required';
    temperature?: number;
    timeout?: number;
  }) {
    try {
      const formattedMessages = this.formatMessages(
        systemMsgs ? [...systemMsgs, ...messages] : messages
      );

      const response = await axios.post(
        `${this.baseUrl}/chat/completions`,
        {
          model: this.model,
          messages: formattedMessages,
          temperature: temperature ?? this.temperature,
          max_tokens: this.maxTokens,
          tools,
          tool_choice: toolChoice,
        },
        {
          headers: {
            'Authorization': `Bearer ${this.apiKey}`,
            'Content-Type': 'application/json',
          },
          timeout,
        }
      );

      return response.data.choices[0].message;
    } catch (error) {
      console.error('LLM request failed:', error);
      throw error;
    }
  }

  private formatMessages(messages: Message[]): any[] {
    return messages.map(msg => ({
      role: msg.role,
      content: msg.content,
      ...(msg.name && { name: msg.name }),
      ...(msg.toolCalls && { tool_calls: msg.toolCalls }),
    }));
  }
}