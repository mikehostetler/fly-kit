import Handlebars from "handlebars";
import {
  FlyKit,
  FlyKitApp,
  FlyKitAppProps,
  FlyKitSdkCli,
  IFlyKit,
} from "@fly-kit-sdk/core";
import path from "path";
import fs from "fs";

export type FlyKitMinioOptions = {
  app: FlyKitApp;
  opts: {
    minio_version: string;
    volume_name: string;
  };
};
export class FlyKitMinio extends FlyKit implements IFlyKit {
  app!: FlyKitApp | FlyKitAppProps;
  minio_version: string;
  volume_name: string;

  constructor(options: FlyKitMinioOptions) {
    super({ app: options.app });

    this.minio_version = options.opts.minio_version;
    this.volume_name = options.opts.volume_name;

    /**
     * Write TOML template to app directory
     */
    const template_path = path.resolve(
      __dirname,
      "..",
      "template",
      "fly.template.toml"
    );
    const app_path = path.resolve(this.app.path, "fly.toml");

    if (!fs.existsSync(app_path)) {
      const source = fs.readFileSync(template_path, "utf8");
      const template = Handlebars.compile(source);
      var result = template({
        minio_version: this.minio_version,
        volume_name: this.volume_name,
      });
      fs.writeFileSync(app_path, result);
    }
  }

  async launch() {
    console.log("Launching Minio");
    let launch_args = [
      "--copy-config",
      "--no-public-ips",
      "--no-deploy",
      "--ha=false",
      "--name",
      this.app.name || "fly-minio",
      "--region",
      this.app.primary_region || "ord",
    ];

    if (this.app.org) launch_args = launch_args.concat(["--org", this.app.org]);

    try {
      console.dir(launch_args);
      await FlyKitSdkCli.run("launch", launch_args, { cwd: this.app.path });

      const secrets: Record<string, string> = {
        MINIO_ROOT_USER: "minio",
        MINIO_ROOT_PASSWORD: "minio123",
      };

      const app_name = this.app.name || "fly-minio";
      FlyKitSdkCli.run(
        "secrets",
        [
          "set",
          "--app",
          app_name,
          "MINIO_ROOT_USER=minio",
          "MINIO_ROOT_PASSWORD=minio123",
        ],
        { cwd: this.app.path }
      );

      FlyKitSdkCli.run("deploy", ["--ha=false"], { cwd: this.app.path });
    } catch (error) {
      throw error;
    }
  }

  async destroy() {
    console.log("Destroying Minio");
    if (!this.app.name) throw new Error("App name not set");
    await FlyKitSdkCli.run("apps", ["destroy", this.app.name, "--yes"]);
  }
}
