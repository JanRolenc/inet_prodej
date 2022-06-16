import DummyServer from "./DummyServer";
import { IItem, IPerson } from "../interfaces";

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
  findPerson(input: string): Promise<ServerResult<IPerson>>;
}

const Server: ServerAPI = new DummyServer();

export default Server;
