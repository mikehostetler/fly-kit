import { FlyKitApp, FlyKitAppProps } from "./App";

export interface IFlyKit {
  app: FlyKitApp | FlyKitAppProps;
  launch: () => Promise<void>;
  destroy: () => Promise<void>;
}

export type FlyKitOptions = {
  app: FlyKitApp | FlyKitAppProps;
};

export abstract class FlyKit implements IFlyKit {
  app!: FlyKitApp | FlyKitAppProps;

  constructor(options: FlyKitOptions) {
    if (options.app instanceof FlyKitApp) {
      this.app = options.app;
    } else {
      this.app = new FlyKitApp(options.app);
    }
  }
  async hydrate(): Promise<void> {}
  async launch(): Promise<void> {}
  async destroy(): Promise<void> {}
}
