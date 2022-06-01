// @filename: models.ts
import { Models } from '@rematch/core'
import { ShopModel } from './Shop/ShopModel'
import { CartModel } from './Cart/CartModel'

export interface RootModel extends Models<RootModel> {
  ShopModel: typeof ShopModel
  CartModel: typeof CartModel
}

export const models: RootModel = { ShopModel: ShopModel, CartModel: CartModel }
