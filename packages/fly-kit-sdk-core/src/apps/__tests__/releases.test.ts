import { FlyKitSdkCli } from "../../";
import { FlyAppsReleases, FlyAppsReleasesProps } from "../releases"; // Replace with the correct path

jest.mock("../../", () => {
  return {
    FlyKitSdkCli: {
      runJSON: jest.fn(),
    },
  };
});

describe("FlyAppsReleases", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should call FlyKitSdkCli.runJSON with the correct default arguments", async () => {
    await FlyAppsReleases({});
    expect(FlyKitSdkCli.runJSON).toHaveBeenCalledWith("apps", ["releases"]);
  });

  it("should include --app if app is provided", async () => {
    const props: FlyAppsReleasesProps = {
      app: "testApp",
    };

    await FlyAppsReleases(props);
    expect(FlyKitSdkCli.runJSON).toHaveBeenCalledWith("apps", [
      "releases",
      "--app=testApp",
    ]);
  });

  it("should include --config if config is provided", async () => {
    const props: FlyAppsReleasesProps = {
      config: "testConfig",
    };

    await FlyAppsReleases(props);
    expect(FlyKitSdkCli.runJSON).toHaveBeenCalledWith("apps", [
      "releases",
      "--config=testConfig",
    ]);
  });

  it("should include --image if image is true", async () => {
    const props: FlyAppsReleasesProps = {
      image: true,
    };

    await FlyAppsReleases(props);
    expect(FlyKitSdkCli.runJSON).toHaveBeenCalledWith("apps", [
      "releases",
      "--image=true",
    ]);
  });

  it("should handle errors gracefully", async () => {
    (FlyKitSdkCli.runJSON as jest.Mock).mockRejectedValueOnce(
      new Error("Test error")
    );

    console.error = jest.fn();

    await FlyAppsReleases({});
    expect(console.error).toHaveBeenCalledWith(new Error("Test error"));
  });

  it("should return an array of releases", async () => {
    const mockReleases = {
      release1: {
        Type: "Type1",
        When: "When1",
        SuccessFail: "SuccessFail1",
        User: "User1",
      },
      release2: {
        Type: "Type2",
        When: "When2",
        SuccessFail: "SuccessFail2",
        User: "User2",
      },
    };

    (FlyKitSdkCli.runJSON as jest.Mock).mockResolvedValueOnce(mockReleases);

    const expectedReleases = [
      {
        Type: "Type1",
        When: "When1",
        SuccessFail: "SuccessFail1",
        User: "User1",
      },
      {
        Type: "Type2",
        When: "When2",
        SuccessFail: "SuccessFail2",
        User: "User2",
      },
    ];

    const releases = await FlyAppsReleases({});
    expect(releases).toEqual(expectedReleases);
  });
});
