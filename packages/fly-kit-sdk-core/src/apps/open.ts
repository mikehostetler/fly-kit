import { FlyKitSdkCli } from "../";

/**
 * Type for the properties required to open apps.
 * @property {string} app - The application name.
 * @property {string} config - The path to the application configuration file.
 * @property {string} relativeUri - The relative URI to be appended to the root URL of the deployed application.
 */
export type FlyAppsOpenProps = {
  app?: string;
  config?: string;
  relativeUri?: string;
};

/**
 * Function to open apps.
 * @param {FlyAppsOpenProps} props - The properties required to open apps.
 * @returns {Promise<void>} - A promise that resolves when the app is opened.
 */
export const FlyAppsOpen = async (props: FlyAppsOpenProps): Promise<void> => {
  const args = ["open"];
  if (props.app) args.push(`--app=${props.app}`);
  if (props.config) args.push(`--config=${props.config}`);
  if (props.relativeUri) args.push(props.relativeUri);

  try {
    await FlyKitSdkCli.run("apps", args);
  } catch (error) {
    console.error(error);
    // Handle the error appropriately
  }
};
