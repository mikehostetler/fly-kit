import { FlyKitApp, FlyKitSdkCli } from "@fly-kit-sdk/core";

export enum FlyKitIpType {
  IPv4 = "IPv4",
  IPv6 = "IPv6",
}

export class FlyKitIp {
  app: FlyKitApp;
  type!: FlyKitIpType;
  shared: boolean = false;

  constructor(app: FlyKitApp) {
    this.app = app;
  }

  async allocate() {
    if (this.type === FlyKitIpType.IPv4) {
      return await FlyKitSdkCli.runJSON("ip", ["allocate-v4", this.app.name]);
    } else {
      return await FlyKitSdkCli.runJSON("ip", ["allocate-v6", this.app.name]);
    }
  }

  async release() {
    return await FlyKitSdkCli.runJSON("ip", ["release", this.app.name]);
  }

  static async list() {
    return await FlyKitSdkCli.runJSON("ip", ["list"]);
  }
}
