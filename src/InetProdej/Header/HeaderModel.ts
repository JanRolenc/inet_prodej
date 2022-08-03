import { createModel } from "@rematch/core";
import type { RootModel } from "../RootModel";

export const HeaderModel = createModel<RootModel>()({
  state: {
    scanner: localStorage.scanner || null,
    touched: localStorage.touched || null,
  },
  reducers: {
    changeScanner(state, scanner) {
      localStorage.scanner = scanner;

      return { ...state, scanner }; //return { ...state, scanner: scanner} - stejne;
    },
    toggleTouched(state) {
      if (state.touched === "false") {
        localStorage.touched = "true";
      } else {
        localStorage.touched = "false";
      }

      return { ...state, touched: localStorage.touched };
    },
  },
  // effects: (dispatch) => ({
  //     async incrementAsync(payload: number, state) {
  //       console.log('This is current root state', state)
  //       await new Promise((resolve) => setTimeout(resolve, 1000))
  //       dispatch.count.increment(payload)
  //     },
  //   }),
});
