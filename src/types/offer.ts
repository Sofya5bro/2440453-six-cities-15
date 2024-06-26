import { TLocation, TCity } from './city';
import { FAVORITES, OFFERS_LOADED_STATUS } from '../consts';

export type THost = {
  avatarUrl: string;
  id: number;
  isPro: boolean;
  name: string;
}

export type TOffer = {
  title: string;
  location: TLocation;
  id: string;
  isFavorite?: boolean;
  isPremium: boolean;
  previewImage: string;
  price: number;
  rating: number;
  type: string;
  city: TCity;
}

export type TOfferFull = TOffer & {
  bedrooms?: number;
  goods?: string[];
  host?: THost;
  images?: string[];
  maxAdults?: number;
  description?: string;
}

export type TOfferList = TOfferFull[];

export type TCardSizes = {
  width: string;
  height: string;
}

export type TFavorite = {
  id: string;
  status: typeof FAVORITES[number];
}

export type TOfferLoadStatus = typeof OFFERS_LOADED_STATUS[number];
