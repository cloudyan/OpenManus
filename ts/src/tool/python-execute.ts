import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

export class PythonExecute {
  public name = 'python_execute';
  public description = 'Execute Python code';

  async execute(code: string): Promise<string> {
    try {
      const { stdout, stderr } = await execAsync(`python -c "${code}"`);
      return stdout || stderr;
    } catch (error) {
      return `Error: ${error.message}`;
    }
  }
}