import { writeFile } from 'fs/promises';
import { join } from 'path';

export class FileSaver {
  public name = 'file_saver';
  public description = 'Save content to a file';

  async execute({ path, content }: { path: string; content: string }): Promise<string> {
    try {
      const fullPath = join(process.cwd(), path);
      await writeFile(fullPath, content);
      return `File saved successfully at ${fullPath}`;
    } catch (error) {
      return `Error saving file: ${error.message}`;
    }
  }
}