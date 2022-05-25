// @filename: models.ts
import { Models } from '@rematch/core'
import { items } from './items'
export interface RootModel extends Models<RootModel> {
  items: typeof items
}
export const models: RootModel = { items }
