import { createModel } from '@rematch/core'
import type { RootModel } from '../RootModel'
import { IScanner, IHeaderSettings, IPerson } from '../interfaces'
import Server from '../data/Server'

function getShopIdFromURL(): number | null {
  return parseInt(window.location.pathname.replace(/^.*\/(\d+)$/, '$1'))
}

export const HeaderModel = createModel<RootModel>()({
  state: {
    shopId: getShopIdFromURL(),
    // shopId: 1,
    shopName: '',
    user: {} as IPerson,
    touched: localStorage.touched,
    scanner: localStorage.scanner,
    scanners: [],
  } as IHeaderSettings,

  reducers: {
    setScanners(state, scanners: IScanner[]) {
      return { ...state, scanners: scanners }
    },
    setShopName(state, shopName: string) {
      return { ...state, shopName: shopName }
    },
    changeScanner(state, scanner: string) {
      localStorage.scanner = scanner
      return { ...state, scanner }
    },
    setUser(state, user: IPerson) {
      return { ...state, user }
    },
    toggleTouched(state) {
      if (state.touched === 'false') {
        localStorage.touched = 'true'
      } else {
        localStorage.touched = 'false'
      }
      return { ...state, touched: localStorage.touched }
    },
  },
  effects: (dispatch) => ({
    async loadHeaderState(shopId: number) {
      const result1 = await Server.loadScanners()
      dispatch.HeaderModel.setScanners(result1.getData() || ({} as IScanner[]))
      const result2 = await Server.getShopName(shopId)
      dispatch.HeaderModel.setShopName(result2.getData() || '')
      const result3 = await Server.getUser()
      dispatch.HeaderModel.setUser(result3.getData() || ({} as IPerson))
    },
  }),
})
