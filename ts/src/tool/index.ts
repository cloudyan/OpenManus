export class ToolCollection {
  private tools: any[];

  constructor(tools: any[] = []) {
    this.tools = tools;
  }

  public add(tool: any): void {
    this.tools.push(tool);
  }

  public getTools(): any[] {
    return this.tools;
  }
}

export class Terminate {
  public name = 'terminate';
  public description = 'Terminates the current task execution';

  public async execute(): Promise<void> {
    // 实现终止逻辑
  }
}