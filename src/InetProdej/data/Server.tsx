import DummyServer from "./DummyServer";
import { IItem } from "../interfaces";

export class ServerResult<T> {
  private data: T | null;
  private error: string | null;

  constructor(data: T | null, error: string | null) {
    this.data = data;
    this.error = error;
  }

  getData(): T | null {
    return this.data;
  }

  isOk(): boolean {
    return this.error === null;
  }
  getError(): string | null {
    return this.error;
  }
}

export interface ServerAPI {
  loadItems(): Promise<ServerResult<IItem[]>>;
  sell(): ServerResult<string>;
}

const Server: ServerAPI = new DummyServer();

export default Server;
