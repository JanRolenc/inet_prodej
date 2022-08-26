import DummyServer from "./DummyServer";
import { IItem, IPerson, IScanner, ISale, ISellRequest } from "../interfaces";

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
  getUser(): Promise<ServerResult<IPerson>>;
  loadScanners(): Promise<ServerResult<IScanner[]>>;
  getShopName(shopId: number): Promise<ServerResult<string>>;
  loadItems(shopId: number): Promise<ServerResult<IItem[]>>;
  loadLastSales(shopId: number): Promise<ServerResult<ISale[]>>;
  // sell(
  //   personId: number,
  //   userId: number,
  //   shopId: number,
  // ): Promise<ServerResult<string>>
  sell(sellRequest: ISellRequest): Promise<ServerResult<string>>;
  findPerson(input: string): Promise<ServerResult<IPerson>>;
}

const Server: ServerAPI = new DummyServer();

export default Server;
