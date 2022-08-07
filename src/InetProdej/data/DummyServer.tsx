import { ServerAPI, ServerResult } from './Server'

import items from './data.json'
import scanners from './scanners.json'
import { IItem, IPerson, IScanner } from '../interfaces'

export default class DummyServer implements ServerAPI {
  async loadScanners(): Promise<ServerResult<IScanner[]>> {
    return new Promise((resolve) => {
      setTimeout(() => resolve(new ServerResult(null, scanners, null)), 500) //tomuto eroru nemohu prijit na kloub
    })
  }

  async loadItems(): Promise<ServerResult<IItem[]>> {
    return new Promise((resolve) => {
      setTimeout(() => resolve(new ServerResult(items, null, null)), 500)
    })
  }

  sell(): ServerResult<string> {
    return new ServerResult('OK', null, null)
  }

  async findPerson(input: string): Promise<ServerResult<IPerson>> {
    return new Promise((resolve) => {
      setTimeout(() => {
        if (input === '3890' || input === 'standard') {
          resolve(
            new ServerResult(
              {
                id: 3890,
                fullname: 'Mgr. Zdeněk Machač',
                money: 150,
                ctecka: 'standard',
              },
              null,
              null,
            ),
          )
        } else {
          resolve(new ServerResult<IPerson>(null, null, 'nenalezeno'))
          alert('ID nenalezeno')
        }
      }, 500)
    })
  }
}
