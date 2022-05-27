import { createModel, Models } from "@rematch/core";
import type { RootModel } from "./models";
import data from "../InetProdej/data.json";
import { IItem } from "../InetProdej/interfaces";

export const ShopModel = createModel<RootModel>()({
  state: data as IItem[], // initial state
  reducers: {
    // handle state changes with pure functions
    decrement(state, itemSelected: IItem) {
      const itemsCopy: IItem[] = [...state];
      for (let i = 0; i < itemsCopy.length; i++) {
        const item = itemsCopy[i];
        if (
          item.id === itemSelected.id &&
          (item.type === "standard" || item.type === "priceOptional")
        ) {
          itemsCopy[i] = {
            ...item,
            quantity: item.quantity - 1,
          };
        }
      }
      return itemsCopy;
    },
  },
  effects: (dispatch) => ({
    // handle state changes with impure functions.
    // use async/await for async actions
    async incrementAsync(payload: number, state) {
      console.log("This is current root state", state);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      dispatch.count.increment(payload);
    },
  }),
});
