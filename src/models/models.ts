// @filename: models.ts
import { Models } from "@rematch/core";
import { ShopModel } from "./ShopModel";
import { totalPrice } from "./totalPrice";

export interface RootModel extends Models<RootModel> {
  shop: typeof ShopModel;
  totalPrice: typeof totalPrice;
}

export const models: RootModel = { shop: ShopModel, totalPrice };
