import { Message } from '../schema';
import { LLM } from '../llm';
import { ToolCollection } from '../tool';

export abstract class ToolCallAgent {
  protected name: string = 'toolcall';
  protected description: string = 'an agent that can execute tool calls.';

  protected systemPrompt: string = '';
  protected nextStepPrompt: string = '';

  protected availableTools: ToolCollection = new ToolCollection();
  protected toolChoices: 'none' | 'auto' | 'required' = 'auto';
  protected specialToolNames: string[] = ['terminate'];

  protected messages: Message[] = [];
  protected llm: LLM;
  protected maxSteps: number = 30;

  constructor(llm: LLM) {
    this.llm = llm;
  }

  public async think(): Promise<boolean> {
    if (this.nextStepPrompt) {
      const userMsg = Message.userMessage(this.nextStepPrompt);
      this.messages.push(userMsg);
    }

    const response = await this.llm.askTool({
      messages: this.messages,
      systemMsgs: this.systemPrompt ? [Message.systemMessage(this.systemPrompt)] : undefined,
      tools: this.availableTools.toParams(),
      toolChoice: this.toolChoices,
    });

    // 处理响应和工具调用
    return this.handleResponse(response);
  }

  protected async handleResponse(response: any): Promise<boolean> {
    // 实现响应处理逻辑
    return true;
  }
}