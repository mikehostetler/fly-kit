import { FlyKitSdkCli } from "../../";
import { FlyAppsCreate, FlyAppsCreateProps } from "../create"; // Replace with the correct path

jest.mock("../../", () => {
  return {
    FlyKitSdkCli: {
      runJSON: jest.fn(),
    },
  };
});

describe("FlyAppsCreate", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should call FlyKitSdkCli.runJSON with the correct default arguments", async () => {
    await FlyAppsCreate({});
    expect(FlyKitSdkCli.runJSON).toHaveBeenCalledWith("apps", ["create"]);
  });

  it("should include APPNAME if provided", async () => {
    const props: FlyAppsCreateProps = {
      APPNAME: "testApp",
    };

    await FlyAppsCreate(props);
    expect(FlyKitSdkCli.runJSON).toHaveBeenCalledWith("apps", [
      "create",
      "testApp",
    ]);
  });

  it("should include --generate-name if generateName is true", async () => {
    const props: FlyAppsCreateProps = {
      generateName: true,
    };

    await FlyAppsCreate(props);
    expect(FlyKitSdkCli.runJSON).toHaveBeenCalledWith("apps", [
      "create",
      "--generate-name",
    ]);
  });

  it("should include --name if name is provided", async () => {
    const props: FlyAppsCreateProps = {
      name: "testName",
    };

    await FlyAppsCreate(props);
    expect(FlyKitSdkCli.runJSON).toHaveBeenCalledWith("apps", [
      "create",
      "--name=testName",
    ]);
  });

  it("should include --network if network is provided", async () => {
    const props: FlyAppsCreateProps = {
      network: "testNetwork",
    };

    await FlyAppsCreate(props);
    expect(FlyKitSdkCli.runJSON).toHaveBeenCalledWith("apps", [
      "create",
      "--network=testNetwork",
    ]);
  });

  it("should include --org if org is provided", async () => {
    const props: FlyAppsCreateProps = {
      org: "testOrg",
    };

    await FlyAppsCreate(props);
    expect(FlyKitSdkCli.runJSON).toHaveBeenCalledWith("apps", [
      "create",
      "--org=testOrg",
    ]);
  });

  it("should handle errors gracefully", async () => {
    (FlyKitSdkCli.runJSON as jest.Mock).mockRejectedValueOnce(
      new Error("Test error")
    );

    console.error = jest.fn();

    await FlyAppsCreate({});
    expect(console.error).toHaveBeenCalledWith(new Error("Test error"));
  });
});
