import { FlyKitApp } from "./App";

export interface IFlyStack {
  app: FlyKitApp;
}

export type FlyStackOptions = {
  app: FlyKitApp;
};

export abstract class FlyStack implements IFlyStack {
  app: FlyKitApp;

  constructor(options: FlyStackOptions) {
    this.app = options.app;
  }
  async hydrate(): Promise<void> {}
  async launch(): Promise<void> {}
  async destroy(): Promise<void> {}
}
