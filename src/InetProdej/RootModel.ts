// @filename: models.ts
import { Models } from '@rematch/core'
import { ShopModel } from './Shop/ShopModel'
import { CartModel } from './Cart/CartModel'
import { HeaderModel } from './Header/HeaderModel'
import { PersonModel } from './Person/PersonModel'
import { ModalModel } from './Modal/ModalModel'

export interface RootModel extends Models<RootModel> {
  ShopModel: typeof ShopModel
  CartModel: typeof CartModel
  HeaderModel: typeof HeaderModel
  PersonModel: typeof PersonModel
  ModalModel: typeof ModalModel
}

export const models: RootModel = {
  ShopModel,
  CartModel,
  HeaderModel,
  PersonModel,
  ModalModel,
}
