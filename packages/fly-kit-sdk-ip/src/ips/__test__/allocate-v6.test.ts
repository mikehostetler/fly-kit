import { FlyKitSdkCli } from "@fly-kit-sdk/core";
import { FlyIpsAllocateV6, FlyIpsAllocateV6Props } from "../allocate-v6"; // Replace with the correct path

jest.mock("@fly-kit-sdk/core", () => {
  return {
    FlyKitSdkCli: {
      run: jest.fn(),
    },
  };
});

describe("FlyIpsAllocateV6", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should call FlyKitSdkCli.run with the correct default arguments", async () => {
    await FlyIpsAllocateV6({});
    expect(FlyKitSdkCli.run).toHaveBeenCalledWith("ips", ["allocate-v6"]);
  });

  it("should include --app if app is provided", async () => {
    const props: FlyIpsAllocateV6Props = {
      app: "testApp",
    };

    await FlyIpsAllocateV6(props);
    expect(FlyKitSdkCli.run).toHaveBeenCalledWith("ips", [
      "allocate-v6",
      "--app=testApp",
    ]);
  });

  it("should include --config if config is provided", async () => {
    const props: FlyIpsAllocateV6Props = {
      config: "testConfig",
    };

    await FlyIpsAllocateV6(props);
    expect(FlyKitSdkCli.run).toHaveBeenCalledWith("ips", [
      "allocate-v6",
      "--config=testConfig",
    ]);
  });

  it("should include --network if network is provided", async () => {
    const props: FlyIpsAllocateV6Props = {
      network: "testNetwork",
    };

    await FlyIpsAllocateV6(props);
    expect(FlyKitSdkCli.run).toHaveBeenCalledWith("ips", [
      "allocate-v6",
      "--network=testNetwork",
    ]);
  });

  it("should include --org if org is provided", async () => {
    const props: FlyIpsAllocateV6Props = {
      org: "testOrg",
    };

    await FlyIpsAllocateV6(props);
    expect(FlyKitSdkCli.run).toHaveBeenCalledWith("ips", [
      "allocate-v6",
      "--org=testOrg",
    ]);
  });

  it("should include --private if private is true", async () => {
    const props: FlyIpsAllocateV6Props = {
      private: true,
    };

    await FlyIpsAllocateV6(props);
    expect(FlyKitSdkCli.run).toHaveBeenCalledWith("ips", [
      "allocate-v6",
      "--private",
    ]);
  });

  it("should include --region if region is provided", async () => {
    const props: FlyIpsAllocateV6Props = {
      region: "testRegion",
    };

    await FlyIpsAllocateV6(props);
    expect(FlyKitSdkCli.run).toHaveBeenCalledWith("ips", [
      "allocate-v6",
      "--region=testRegion",
    ]);
  });

  it("should handle errors gracefully", async () => {
    (FlyKitSdkCli.run as jest.Mock).mockRejectedValueOnce(
      new Error("Test error")
    );

    console.error = jest.fn();

    await FlyIpsAllocateV6({});
    expect(console.error).toHaveBeenCalledWith(new Error("Test error"));
  });
});
