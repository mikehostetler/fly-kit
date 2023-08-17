import { FlyKitSdkCli } from "../../";
import { FlyAppsMove, FlyAppsMoveProps } from "../move"; // Replace with the correct path

jest.mock("../../", () => {
  return {
    FlyKitSdkCli: {
      run: jest.fn(),
    },
  };
});

describe("FlyAppsMove", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should call FlyKitSdkCli.run with the correct default arguments", async () => {
    const props: FlyAppsMoveProps = {
      appName: "testApp",
    };

    await FlyAppsMove(props);
    expect(FlyKitSdkCli.run).toHaveBeenCalledWith("apps", ["move", "testApp"]);
  });

  it("should include --org if org is provided", async () => {
    const props: FlyAppsMoveProps = {
      appName: "testApp",
      org: "testOrg",
    };

    await FlyAppsMove(props);
    expect(FlyKitSdkCli.run).toHaveBeenCalledWith("apps", [
      "move",
      "testApp",
      "--org=testOrg",
    ]);
  });

  it("should include --skip-health-checks if skipHealthChecks is true", async () => {
    const props: FlyAppsMoveProps = {
      appName: "testApp",
      skipHealthChecks: true,
    };

    await FlyAppsMove(props);
    expect(FlyKitSdkCli.run).toHaveBeenCalledWith("apps", [
      "move",
      "testApp",
      "--skip-health-checks",
    ]);
  });

  it("should include --yes if yes is true", async () => {
    const props: FlyAppsMoveProps = {
      appName: "testApp",
      yes: true,
    };

    await FlyAppsMove(props);
    expect(FlyKitSdkCli.run).toHaveBeenCalledWith("apps", [
      "move",
      "testApp",
      "--yes",
    ]);
  });

  it("should handle errors gracefully", async () => {
    (FlyKitSdkCli.run as jest.Mock).mockRejectedValueOnce(
      new Error("Test error")
    );

    console.error = jest.fn();

    await FlyAppsMove({ appName: "testApp" });
    expect(console.error).toHaveBeenCalledWith(new Error("Test error"));
  });
});
