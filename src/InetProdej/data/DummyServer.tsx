import { ServerAPI, ServerResult } from './Server'

import items from './items.json'
import scanners from './scanners.json'
import lastSales from './lastSales.json'
import { IItem, IPerson, IScanner, ISale, ISellRequest } from '../interfaces'

export default class DummyServer implements ServerAPI {
  async getUser(): Promise<ServerResult<IPerson>> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(
          new ServerResult(
            {
              id: 1111,
              fullname: 'Petr Prodavač',
              money: 0,
            },
            null,
          ),
        )
      }, 500)
    })
  }

  async loadScanners(): Promise<ServerResult<IScanner[]>> {
    return new Promise((resolve) => {
      setTimeout(() => resolve(new ServerResult(scanners, null)), 500)
    })
  }

  async getShopName(shopId: number): Promise<ServerResult<string>> {
    return new Promise((resolve) => {
      setTimeout(() => {
        if (shopId === 1) {
          resolve(new ServerResult('Prodejna CPS', null))
        } else {
          resolve(new ServerResult<string>('nenalezeno', null))
        }
      }, 100)
    })
  }

  async loadItems(shopId: number): Promise<ServerResult<IItem[]>> {
    return new Promise((resolve) => {
      setTimeout(() => {
        --items[6].quantity
        return resolve(new ServerResult(items, null))
      }, 1000)
    })
  }

  async loadLastSales(shopId: number): Promise<ServerResult<ISale[]>> {
    return new Promise((resolve) => {
      setTimeout(() => resolve(new ServerResult(lastSales, null)), 500)
    })
  }

  async sell(sellRequest: ISellRequest): Promise<ServerResult<string>> {
    return new Promise((resolve) => {
      setTimeout(() => resolve(new ServerResult('OK', null)), 2000)
    })
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
              },
              null,
            ),
          )
        } else {
          resolve(new ServerResult<IPerson>(null, 'nenalezeno'))
        }
      }, 500)
    })
  }
}
