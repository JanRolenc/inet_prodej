// @filename: models.ts
import { Models } from '@rematch/core'
import { ShopModel } from './Shop/ShopModel'
import { CartModel } from './Cart/CartModel'
import { HeaderModel } from './Header/HeaderModel'

export interface RootModel extends Models<RootModel> {
  ShopModel: typeof ShopModel
  CartModel: typeof CartModel
  HeaderModel: typeof HeaderModel
}

export const models: RootModel = {
  ShopModel: ShopModel,
  CartModel: CartModel,
  HeaderModel: HeaderModel,
}
