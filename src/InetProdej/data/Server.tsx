import DummyServer from './DummyServer'
import { IItem, IPerson, IScanner } from '../interfaces'

export class ServerResult<T> {
  private data: T | null
  private scanners: T | null
  private error: string | null

  constructor(data: T | null, scanners: T | null, error: string | null) {
    this.data = data
    this.scanners = scanners
    this.error = error
  }

  getData(): T | null {
    return this.data
  }

  getScanners(): T | null {
    return this.scanners
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
  sell(): ServerResult<string>
  findPerson(input: string): Promise<ServerResult<IPerson>>
}

const Server: ServerAPI = new DummyServer()

export default Server
