import { WebContainer } from '@webcontainer/api';

export class TerminalManager {
  private static instance: TerminalManager;
  private webcontainer: WebContainer | null = null;

  private constructor() {}

  static getInstance(): TerminalManager {
    if (!TerminalManager.instance) {
      TerminalManager.instance = new TerminalManager();
    }
    return TerminalManager.instance;
  }

  setWebContainer(container: WebContainer) {
    this.webcontainer = container;
  }

  async spawnShell(cols: number, rows: number) {
    if (!this.webcontainer) {
      throw new Error('WebContainer not initialized');
    }

    return this.webcontainer.spawn('jsh', {
      terminal: {
        cols,
        rows
      }
    });
  }

  async executeCommand(command: string, args: string[] = []) {
    if (!this.webcontainer) {
      throw new Error('WebContainer not initialized');
    }

    const process = await this.webcontainer.spawn(command, args);
    const exitCode = await process.exit;
    
    return {
      exitCode,
      output: await this.getProcessOutput(process)
    };
  }

  private async getProcessOutput(process: any): Promise<string> {
    const output: string[] = [];
    await process.output.pipeTo(
      new WritableStream({
        write(data) {
          output.push(data);
        }
      })
    );
    return output.join('');
  }
}