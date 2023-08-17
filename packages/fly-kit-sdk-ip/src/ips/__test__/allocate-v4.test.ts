import { FlyKitSdkCli } from "@fly-kit-sdk/core";
import { FlyIpsAllocateV4, FlyIpsAllocateV4Props } from "../allocate-v4"; // Replace with the correct path

jest.mock("@fly-kit-sdk/core", () => {
  return {
    FlyKitSdkCli: {
      run: jest.fn(),
    },
  };
});

describe("FlyIpsAllocateV4", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should call FlyKitSdkCli.run with the correct default arguments", async () => {
    await FlyIpsAllocateV4({});
    expect(FlyKitSdkCli.run).toHaveBeenCalledWith("ips", ["allocate-v4"]);
  });

  it("should include --app if app is provided", async () => {
    const props: FlyIpsAllocateV4Props = {
      app: "testApp",
    };

    await FlyIpsAllocateV4(props);
    expect(FlyKitSdkCli.run).toHaveBeenCalledWith("ips", [
      "allocate-v4",
      "--app=testApp",
    ]);
  });

  it("should include --config if config is provided", async () => {
    const props: FlyIpsAllocateV4Props = {
      config: "testConfig",
    };

    await FlyIpsAllocateV4(props);
    expect(FlyKitSdkCli.run).toHaveBeenCalledWith("ips", [
      "allocate-v4",
      "--config=testConfig",
    ]);
  });

  it("should include --region if region is provided", async () => {
    const props: FlyIpsAllocateV4Props = {
      region: "testRegion",
    };

    await FlyIpsAllocateV4(props);
    expect(FlyKitSdkCli.run).toHaveBeenCalledWith("ips", [
      "allocate-v4",
      "--region=testRegion",
    ]);
  });

  it("should include --shared if shared is true", async () => {
    const props: FlyIpsAllocateV4Props = {
      shared: true,
    };

    await FlyIpsAllocateV4(props);
    expect(FlyKitSdkCli.run).toHaveBeenCalledWith("ips", [
      "allocate-v4",
      "--shared",
    ]);
  });

  it("should include --yes if yes is true", async () => {
    const props: FlyIpsAllocateV4Props = {
      yes: true,
    };

    await FlyIpsAllocateV4(props);
    expect(FlyKitSdkCli.run).toHaveBeenCalledWith("ips", [
      "allocate-v4",
      "--yes",
    ]);
  });

  it("should handle errors gracefully", async () => {
    (FlyKitSdkCli.run as jest.Mock).mockRejectedValueOnce(
      new Error("Test error")
    );

    console.error = jest.fn();

    await FlyIpsAllocateV4({});
    expect(console.error).toHaveBeenCalledWith(new Error("Test error"));
  });
});
