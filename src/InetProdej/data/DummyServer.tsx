import { ServerAPI, ServerResult } from './Server'

import items from './data.json'
import { IItem, IPerson } from '../interfaces'

export default class DummyServer implements ServerAPI {
  async loadItems(): Promise<ServerResult<IItem[]>> {
    return new Promise((resolve) => {
      setTimeout(() => resolve(new ServerResult(items, null)), 500)
    })
  }

  sell(): ServerResult<string> {
    return new ServerResult('OK', null)
  }

  async findPerson(input: string): Promise<ServerResult<IPerson>> {
    return new Promise((resolve) => {
      setTimeout(() => {
        if (input === '3890') {
          resolve(
            new ServerResult(
              { id: 3890, fullname: 'Mgr. Zdeněk Machač', money: 150 },
              null,
            ),
          )
        } else {
          resolve(new ServerResult<IPerson>(null, 'nenalezeno'))
          alert('ID nenalezeno')
        }
      }, 500)
    })
  }
}
