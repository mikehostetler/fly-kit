import { FlyKitSdkCli } from "../../";
import { FlyAppsList, FlyAppsListProps, FlyAppsListReturn } from "../list"; // Replace with the correct path

jest.mock("../../", () => {
  return {
    FlyKitSdkCli: {
      runJSON: jest.fn(),
    },
  };
});

describe("FlyAppsList", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should call FlyKitSdkCli.runJSON with the correct default arguments", async () => {
    await FlyAppsList({});
    expect(FlyKitSdkCli.runJSON).toHaveBeenCalledWith("apps", ["list"]);
  });

  it("should include --org if org is provided", async () => {
    const props: FlyAppsListProps = {
      org: "testOrg",
    };

    await FlyAppsList(props);
    expect(FlyKitSdkCli.runJSON).toHaveBeenCalledWith("apps", [
      "list",
      "--org=testOrg",
    ]);
  });

  it("should return an array of FlyAppsListReturn objects", async () => {
    const mockApps = {
      app1: {
        Name: "app1",
        Owner: "owner1",
        Status: "status1",
        Platform: "platform1",
        latestDeployment: "deployment1",
      },
      app2: {
        Name: "app2",
        Owner: "owner2",
        Status: "status2",
        Platform: "platform2",
        latestDeployment: "deployment2",
      },
    };

    (FlyKitSdkCli.runJSON as jest.Mock).mockResolvedValueOnce(mockApps);

    const expectedReturn: FlyAppsListReturn[] = [
      {
        Name: "app1",
        Owner: "owner1",
        Status: "status1",
        Platform: "platform1",
        LatestDeployment: "deployment1",
      },
      {
        Name: "app2",
        Owner: "owner2",
        Status: "status2",
        Platform: "platform2",
        LatestDeployment: "deployment2",
      },
    ];

    const result = await FlyAppsList({});
    expect(result).toEqual(expectedReturn);
  });

  it("should handle errors gracefully", async () => {
    (FlyKitSdkCli.runJSON as jest.Mock).mockRejectedValueOnce(
      new Error("Test error")
    );

    console.error = jest.fn();

    await FlyAppsList({});
    expect(console.error).toHaveBeenCalledWith(new Error("Test error"));
  });
});
