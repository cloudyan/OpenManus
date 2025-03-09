export class Message {
  constructor(
    public role: 'system' | 'user' | 'assistant' | 'tool',
    public content: string,
    public name?: string,
    public toolCalls?: any[]
  ) {}

  static systemMessage(content: string): Message {
    return new Message('system', content);
  }

  static userMessage(content: string): Message {
    return new Message('user', content);
  }

  static assistantMessage(content: string): Message {
    return new Message('assistant', content);
  }

  static toolMessage(content: string, toolCallId: string, name: string): Message {
    return new Message('tool', content, name);
  }
}