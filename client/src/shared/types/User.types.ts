import { IProduct } from './Product.types'
import { IProfile } from './Profile.types'

export interface IGetUserResponse {
  profile: IProfile
  favorites: IProduct[]
  bag?: TBag
}

export interface IUserState {
  favorites: IProduct[]
  bag?: TBag
}

export interface IGetUserFavoritesResponse {
  error: boolean
  favorites: IProduct[]
}

export interface IFavoriteOperationResponse {
  success: boolean
  message: string
  product: IProduct
}

export type TBagItem = {
  product: IProduct
  quantity: number
  price: number
  size: string
  total: number
  _id: string
}

export type TBag = {
  _id: string
  items: TBagItem[]
  user: string
  createdAt: Date
  updatedAt: Date
  subTotal: number
}

export interface IGetBag {
  error: boolean
  bag: TBag | null
}

export interface IAddToBagRequest {
  productId: string
}

export interface IAddToBagResponse {
  error: boolean
  message: string
  bag: TBag
}

export interface IRemoveFromBagRequest {
  productId: string
}

export interface IRemoveFromBagResponse {
  error: boolean
  bag: TBag
  message: string
}

export interface IUpdateBagItemQuantityRequest {
  productId: string
  quantity: number
}

export interface IUpdateBagItemQuantityResponse {
  error: boolean
  bag: TBag
}

export interface IUpdateBagItemSizeRequest {
  productId: string
  newSize: string
}

export interface IUpdateBagItemSizeResponse {
  error: boolean
  bag: TBag
}
