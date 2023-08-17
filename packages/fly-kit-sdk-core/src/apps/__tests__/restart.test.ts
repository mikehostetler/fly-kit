import { FlyKitSdkCli } from "../../";
import { FlyAppsRestart, FlyAppsRestartProps } from "../restart"; // Replace with the correct path

jest.mock("../../", () => {
  return {
    FlyKitSdkCli: {
      run: jest.fn(),
    },
  };
});

describe("FlyAppsRestart", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should call FlyKitSdkCli.run with the correct default arguments", async () => {
    await FlyAppsRestart({});
    expect(FlyKitSdkCli.run).toHaveBeenCalledWith("apps", ["restart"]);
  });

  it("should include appName if provided", async () => {
    const props: FlyAppsRestartProps = {
      appName: "testApp",
    };

    await FlyAppsRestart(props);
    expect(FlyKitSdkCli.run).toHaveBeenCalledWith("apps", [
      "restart",
      "testApp",
    ]);
  });

  it("should include --force-stop if forceStop is true", async () => {
    const props: FlyAppsRestartProps = {
      forceStop: true,
    };

    await FlyAppsRestart(props);
    expect(FlyKitSdkCli.run).toHaveBeenCalledWith("apps", [
      "restart",
      "--force-stop",
    ]);
  });

  it("should include --skip-health-checks if skipHealthChecks is true", async () => {
    const props: FlyAppsRestartProps = {
      skipHealthChecks: true,
    };

    await FlyAppsRestart(props);
    expect(FlyKitSdkCli.run).toHaveBeenCalledWith("apps", [
      "restart",
      "--skip-health-checks",
    ]);
  });

  it("should handle errors gracefully", async () => {
    (FlyKitSdkCli.run as jest.Mock).mockRejectedValueOnce(
      new Error("Test error")
    );

    console.error = jest.fn();

    await FlyAppsRestart({});
    expect(console.error).toHaveBeenCalledWith(new Error("Test error"));
  });
});
