import { ServerAPI, ServerResult } from './Server'

import items from './data.json'
import scanners from './scanners.json'
import sales1 from './sales1.json'
import { IItem, IPerson, IScanner, ISale } from '../interfaces'

export default class DummyServer implements ServerAPI {
  async loadScanners(): Promise<ServerResult<IScanner[]>> {
    return new Promise((resolve) => {
      setTimeout(
        () => resolve(new ServerResult(null, scanners, null, null)),
        500,
      )
    })
  }

  async loadItems(): Promise<ServerResult<IItem[]>> {
    return new Promise((resolve) => {
      setTimeout(() => resolve(new ServerResult(items, null, null, null)), 500)
    })
  }

  async loadSales(): Promise<ServerResult<ISale[]>> {
    return new Promise((resolve) => {
      setTimeout(() => resolve(new ServerResult(null, null, sales1, null)), 500)
    })
  }

  sell(): ServerResult<string> {
    return new ServerResult('OK', null, null, null)
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
              null,
            ),
          )
        } else {
          resolve(new ServerResult<IPerson>(null, null, null, 'nenalezeno'))
          alert('ID nenalezeno')
        }
      }, 500)
    })
  }
}
