import { SimpleServer } from "./server";

export type DataItem = { id: string; value: number };

export class Executor {
  private server: SimpleServer | null = null;
  private readonly data: DataItem[] = Array.from(Array(3000).keys()).map((item) => ({
    id: crypto.randomUUID(),
    value: item,
  }));

  constructor(
    private readonly task: (data: DataItem[], deadline: number) => Promise<void>,
    serverPort: number = 3000,
  ) {
    this.server = new SimpleServer(serverPort);
  }

  public async start() {
    try {
      await this.server?.startServer();
      await this.runTaskWithTimeout(this.data);
    } catch (error) {
      if (error instanceof Error) {
        console.error(`❌ ${error.toString()}`);
      }
      console.error(error);
    } finally {
      this.server?.stopServer();
    }
  }

  private async runTaskWithTimeout(data: DataItem[]) {
    const deadline = Date.now() + 60_000;
    return this.task(data, deadline);
  }
}
