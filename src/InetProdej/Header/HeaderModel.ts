import { createModel } from '@rematch/core'
import type { RootModel } from '../RootModel'
// import { IScanner } from '../interfaces'
import { IScanner, IHeaderSettings } from '../interfaces'
import Server from '../data/Server'

export const HeaderModel = createModel<RootModel>()({
  state: {
    touched: localStorage.touched || null,
    scanner: localStorage.scanner || null,
    scanners: [],
  } as IHeaderSettings,
  reducers: {
    setScanners(state, scanners: IScanner[]) {
      console.log('state v setScanners', state)
      return { ...state, scanners: scanners }
    },
    changeScanner(state, scanner: string) {
      localStorage.scanner = scanner

      return { ...state, scanner } //shodne s: return { ...state, scanner: scanner}
    },
    toggleTouched(state) {
      if (state.touched === 'false') {
        localStorage.touched = 'true'
      } else {
        localStorage.touched = 'false'
      }
      console.log('state.touched', state.touched)
      console.log('localStorage.touched', localStorage.touched)
      return { ...state, touched: localStorage.touched }
    },
  },
  effects: (dispatch) => ({
    async loadHeaderSettings() {
      const result = await Server.loadScanners()
      dispatch.HeaderModel.setScanners(
        result.getScanners() || ({} as IScanner[]),
      )
    },
  }),
})
