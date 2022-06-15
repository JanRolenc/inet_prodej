import DummyServer from './DummyServer'
import { IItem } from '../interfaces'

export class ServerResult<T> {
  private data: T | null
  private error: string | null
  private person: string | null

  constructor(data: T | null, error: string | null, person: string | null) {
    this.data = data
    this.error = error
    this.person = person
  }

  getData(): T | null {
    return this.data
  }

  isOk(): boolean {
    return this.error === null
  }
  getError(): string | null {
    return this.error
  }
  getPerson(): string | null {
    return this.person
  }
}

export interface ServerAPI {
  loadItems(): Promise<ServerResult<IItem[]>>
  sell(): ServerResult<string>
  findPerson(input: string): ServerResult<string>
}

const Server: ServerAPI = new DummyServer()

export default Server
