import { MarketDataType } from '@stoqey/client-graphql';
import EventEmitter from 'events';

export enum APPEVENTS {
  USER = 'user',
  AUTH = 'auth',
  CURRENCY = 'currency',
  TRADES = 'trades',
  ORDERS = 'orders',
  LOGOUT = 'logout'
}

export class AppEvents extends EventEmitter.EventEmitter {
  private cache = {};
  private static _instance: AppEvents;

  public currency: MarketDataType;

  public static get Instance() {
    return this._instance || (this._instance = new this());
  }

  private constructor() {
    super();
    this.setMaxListeners(0); // set a maximum of 50 event listners
  }

  /**
   * setCurrency
   */
  public setCurrency(currency: MarketDataType) {
    this.currency = currency;
  }

  /**
   * getCurrency
   */
  public getCurrency(): MarketDataType {
    return this.currency;
  }
}