import { FlyKitApp, FlyKitAppProps } from "@fly-kit-sdk/core";
import { FlyKitMinio } from "@fly-kit/minio";

export type MyMinioStackProps = {
  name: string;
  org: string;
  primary_region: string;
  minio_version: string;
  volume_name: string;
  path: string;
};

export class MyMinioStack {
  minio: FlyKitMinio | null;
  props: MyMinioStackProps;

  constructor(props: MyMinioStackProps) {
    console.log("MyStack initialized with paths: ", props);
    this.props = props;

    const app_props: FlyKitAppProps = {
      name: props.name,
      org: props.org,
      primary_region: props.primary_region,
      path: props.path,
    };
    const app = new FlyKitApp(app_props);
    this.minio = new FlyKitMinio({
      app,
      opts: {
        minio_version: props.minio_version,
        volume_name: props.volume_name,
      },
    });
  }

  async launch() {
    if (this.minio === null) throw new Error("Minio not initialized");
    this.minio.launch();
  }
  async destroy() {
    if (this.minio === null) throw new Error("Minio not initialized");
    this.minio.destroy();
  }
}
