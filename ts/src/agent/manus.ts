import { ToolCallAgent } from './toolcall';
import { NEXT_STEP_PROMPT, SYSTEM_PROMPT } from '../prompt/manus';
import { Terminate, ToolCollection } from '../tool';
import { BrowserUseTool } from '../tool/browser-use-tool';
import { FileSaver } from '../tool/file-saver';
import { GoogleSearch } from '../tool/google-search';
import { PythonExecute } from '../tool/python-execute';

export class Manus extends ToolCallAgent {
  public name = 'Manus';
  public description = 'A versatile agent that can solve various tasks using multiple tools';

  protected systemPrompt = SYSTEM_PROMPT;
  protected nextStepPrompt = NEXT_STEP_PROMPT;

  protected availableTools: ToolCollection = new ToolCollection([
    new PythonExecute(),
    new GoogleSearch(),
    new BrowserUseTool(),
    new FileSaver(),
    new Terminate()
  ]);
}