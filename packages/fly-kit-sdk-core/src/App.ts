import {
  FlyAppsCreate,
  FlyAppsCreateProps,
  FlyAppsDestroy,
  FlyAppsDestroyProps,
  FlyAppsList,
  FlyAppsMove,
  FlyAppsMoveProps,
  FlyAppsRestart,
  FlyAppsRestartProps,
} from "./apps";

export interface IFlyKitApp {
  name: string;
  org: string;
  network: string;
  primary_region: string;
  path: string;
}

export type FlyKitAppProps = {
  name?: string;
  org?: string;
  network?: string;
  primary_region?: string;
  path: string;
};

export type FlyKitAppListProps = {
  org?: string;
};

export class FlyKitApp implements IFlyKitApp {
  name: string;
  org: string;
  network: string;
  primary_region: string;
  path: string;

  constructor(props: FlyKitAppProps) {
    this.name = props.name || "";
    this.org = props.org || "personal";
    this.network = props.network || "";
    this.primary_region = props.primary_region || "";
    this.path = props.path;
  }

  static async list(props: FlyKitAppListProps) {
    return await FlyAppsList(props);
  }

  async create(props: FlyAppsCreateProps) {
    return await FlyAppsCreate({ ...props, APPNAME: this.name });
  }

  async destroy(props: FlyAppsDestroyProps): Promise<void> {
    return await FlyAppsDestroy({ ...props, appName: this.name });
  }

  async move(props: FlyAppsMoveProps): Promise<void> {
    return await FlyAppsMove({ ...props, appName: this.name });
  }

  async restart(props: FlyAppsRestartProps): Promise<void> {
    return await FlyAppsRestart({ ...props, appName: this.name });
  }
}
