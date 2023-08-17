import { FlyKitSdkCli } from "../";

/**
 * Type for the properties required to list app releases.
 * @property {string} app - The application name.
 * @property {string} config - Path to application configuration file.
 * @property {boolean} image - Display the Docker image reference of the release.
 */
export type FlyAppsReleasesProps = {
  app?: string;
  config?: string;
  image?: boolean;
};

/**
 * Type for the return value of the FlyAppsReleases function.
 * @property {string} Type - The type of the release.
 * @property {string} When - When the release was made.
 * @property {string} SuccessFail - Whether the release was a success or a failure.
 * @property {string} User - The user who triggered the release.
 */
export type FlyAppsReleasesReturn = {
  Type: string;
  When: string;
  SuccessFail: string;
  User: string;
};

/**
 * Function to list app releases.
 * @param {FlyAppsReleasesProps} props - The properties required to list app releases.
 * @returns {Promise<FlyAppsReleasesReturn[] | []>} - A promise that resolves to an array of FlyAppsReleasesReturn objects or an empty array.
 */
export const FlyAppsReleases = async (
  props: FlyAppsReleasesProps
): Promise<FlyAppsReleasesReturn[] | []> => {
  const args = ["releases"];
  if (props.app) args.push(`--app=${props.app}`);
  if (props.config) args.push(`--config=${props.config}`);
  if (props.image) args.push(`--image=${props.image}`);

  let list_releases: FlyAppsReleasesReturn[] = [];
  try {
    const releases = await FlyKitSdkCli.runJSON("apps", args);
    if (releases && typeof releases === "object") {
      Object.keys(releases).forEach((releaseKey) => {
        const release = releases[releaseKey];
        list_releases.push({
          Type: release.Type,
          When: release.When,
          SuccessFail: release.SuccessFail,
          User: release.User,
        });
      });
    }
  } catch (error) {
    console.error(error);
    // Handle the error appropriately
  }
  return list_releases;
};
