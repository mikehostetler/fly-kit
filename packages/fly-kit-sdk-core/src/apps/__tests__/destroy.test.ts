import { FlyKitSdkCli } from "../../";
import { FlyAppsDestroy, FlyAppsDestroyProps } from "../destroy"; // Replace with the correct path

jest.mock("../../", () => {
  return {
    FlyKitSdkCli: {
      run: jest.fn(),
    },
  };
});

describe("FlyAppsDestroy", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should call FlyKitSdkCli.run with the correct default arguments", async () => {
    const props: FlyAppsDestroyProps = {
      appName: "testApp",
    };

    await FlyAppsDestroy(props);
    expect(FlyKitSdkCli.run).toHaveBeenCalledWith("apps", [
      "destroy",
      "testApp",
    ]);
  });

  it("should include --yes if yes is true", async () => {
    const props: FlyAppsDestroyProps = {
      appName: "testApp",
      yes: true,
    };

    await FlyAppsDestroy(props);
    expect(FlyKitSdkCli.run).toHaveBeenCalledWith("apps", [
      "destroy",
      "testApp",
      "--yes",
    ]);
  });

  it("should handle errors gracefully", async () => {
    (FlyKitSdkCli.run as jest.Mock).mockRejectedValueOnce(
      new Error("Test error")
    );

    console.error = jest.fn();

    const props: FlyAppsDestroyProps = {
      appName: "testApp",
    };

    await FlyAppsDestroy(props);
    expect(console.error).toHaveBeenCalledWith(new Error("Test error"));
  });
});
