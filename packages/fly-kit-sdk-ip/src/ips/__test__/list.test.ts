import { FlyKitSdkCli } from "@fly-kit-sdk/core";
import { FlyIpsList, FlyIpsListProps } from "../list"; // Replace with the correct path

jest.mock("@fly-kit-sdk/core", () => {
  return {
    FlyKitSdkCli: {
      runJSON: jest.fn(),
    },
  };
});

describe("FlyIpsList", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should call FlyKitSdkCli.runJSON with the correct default arguments", async () => {
    await FlyIpsList({});
    expect(FlyKitSdkCli.runJSON).toHaveBeenCalledWith("ips", ["list"]);
  });

  it("should include --app if app is provided", async () => {
    const props: FlyIpsListProps = {
      app: "testApp",
    };

    await FlyIpsList(props);
    expect(FlyKitSdkCli.runJSON).toHaveBeenCalledWith("ips", [
      "list",
      "--app=testApp",
    ]);
  });

  it("should include --config if config is provided", async () => {
    const props: FlyIpsListProps = {
      config: "testConfig",
    };

    await FlyIpsList(props);
    expect(FlyKitSdkCli.runJSON).toHaveBeenCalledWith("ips", [
      "list",
      "--config=testConfig",
    ]);
  });

  it("should return an array of IPs", async () => {
    (FlyKitSdkCli.runJSON as jest.Mock).mockResolvedValueOnce({
      ip1: { IP: "192.168.0.1" },
      ip2: { IP: "192.168.0.2" },
    });

    const result = await FlyIpsList({});
    expect(result).toEqual([{ IP: "192.168.0.1" }, { IP: "192.168.0.2" }]);
  });

  it("should handle errors gracefully", async () => {
    (FlyKitSdkCli.runJSON as jest.Mock).mockRejectedValueOnce(
      new Error("Test error")
    );

    console.error = jest.fn();

    await FlyIpsList({});
    expect(console.error).toHaveBeenCalledWith(new Error("Test error"));
  });
});
