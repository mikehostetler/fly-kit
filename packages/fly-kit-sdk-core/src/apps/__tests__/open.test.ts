import { FlyKitSdkCli } from "../../";
import { FlyAppsOpen, FlyAppsOpenProps } from "../open"; // Replace with the correct path

jest.mock("../../", () => {
  return {
    FlyKitSdkCli: {
      run: jest.fn(),
    },
  };
});

describe("FlyAppsOpen", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should call FlyKitSdkCli.run with the correct default arguments", async () => {
    await FlyAppsOpen({});
    expect(FlyKitSdkCli.run).toHaveBeenCalledWith("apps", ["open"]);
  });

  it("should include --app if app is provided", async () => {
    const props: FlyAppsOpenProps = {
      app: "testApp",
    };

    await FlyAppsOpen(props);
    expect(FlyKitSdkCli.run).toHaveBeenCalledWith("apps", [
      "open",
      "--app=testApp",
    ]);
  });

  it("should include --config if config is provided", async () => {
    const props: FlyAppsOpenProps = {
      config: "testConfig",
    };

    await FlyAppsOpen(props);
    expect(FlyKitSdkCli.run).toHaveBeenCalledWith("apps", [
      "open",
      "--config=testConfig",
    ]);
  });

  it("should include relativeUri if provided", async () => {
    const props: FlyAppsOpenProps = {
      relativeUri: "testUri",
    };

    await FlyAppsOpen(props);
    expect(FlyKitSdkCli.run).toHaveBeenCalledWith("apps", ["open", "testUri"]);
  });

  it("should handle errors gracefully", async () => {
    (FlyKitSdkCli.run as jest.Mock).mockRejectedValueOnce(
      new Error("Test error")
    );

    console.error = jest.fn();

    await FlyAppsOpen({});
    expect(console.error).toHaveBeenCalledWith(new Error("Test error"));
  });
});
