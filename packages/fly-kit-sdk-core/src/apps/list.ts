import { FlyKitSdkCli } from "../";

/**
 * Type for the properties required to list apps.
 * @property {string} org - The organization for which to list apps.
 */
export type FlyAppsListProps = {
  org?: string;
};

/**
 * Type for the return value of the FlyAppsList function.
 * @property {string} Name - The name of the app.
 * @property {string} Owner - The owner of the app.
 * @property {string} Status - The status of the app.
 * @property {string} Platform - The platform of the app.
 * @property {string} LatestDeployment - The latest deployment of the app.
 */
export type FlyAppsListReturn = {
  Name: string;
  Owner: string;
  Status: string;
  Platform: string;
  LatestDeployment: string;
};

/**
 * Function to list apps.
 * @param {FlyAppsListProps} props - The properties required to list apps.
 * @returns {Promise<FlyAppsListReturn[] | []>} - A promise that resolves to an array of FlyAppsListReturn objects or an empty array.
 */
export const FlyAppsList = async (
  props: FlyAppsListProps
): Promise<FlyAppsListReturn[] | []> => {
  const args = ["list"];
  if (props.org) args.push(`--org=${props.org}`);

  let list_apps: FlyAppsListReturn[] = [];
  try {
    const apps = await FlyKitSdkCli.runJSON("apps", args);
    if (apps && typeof apps === "object") {
      Object.keys(apps).forEach((appKey) => {
        const app = apps[appKey];
        list_apps.push({
          Name: app.Name,
          Owner: app.Owner,
          Status: app.Status,
          Platform: app.Platform,
          LatestDeployment: app.latestDeployment,
        });
      });
    }
  } catch (error) {
    console.error(error);
    // Handle the error appropriately
  }
  return list_apps;
};
