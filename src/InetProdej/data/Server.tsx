import DummyServer from './DummyServer'
import { IItem, IPerson, IScanner, ISale } from '../interfaces'

export class ServerResult<T> {
  private data: T | null
  private scanners: T | null
  private sales: T | null
  private error: string | null

  constructor(
    data: T | null,
    scanners: T | null,
    sales: T | null,
    error: string | null,
  ) {
    this.data = data
    this.scanners = scanners
    this.sales = sales
    this.error = error
  }

  getData(): T | null {
    return this.data
  }

  getScanners(): T | null {
    return this.scanners
  }
  getSales(): T | null {
    return this.sales
  }

  isOk(): boolean {
    return this.error === null
  }
  getError(): string | null {
    return this.error
  }
}

export interface ServerAPI {
  loadScanners(): Promise<ServerResult<IScanner[]>>
  loadItems(): Promise<ServerResult<IItem[]>>
  loadSales(): Promise<ServerResult<ISale[]>>
  sell(): ServerResult<string>
  findPerson(input: string): Promise<ServerResult<IPerson>>
}

const Server: ServerAPI = new DummyServer()

export default Server
