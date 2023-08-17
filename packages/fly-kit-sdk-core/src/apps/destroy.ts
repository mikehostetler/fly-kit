import { FlyKitSdkCli } from "../";

/**
 * Type for the properties required to destroy an app.
 * @property {string} appName - The name of the app to destroy.
 * @property {boolean} yes - Accept all confirmations.
 */
export type FlyAppsDestroyProps = {
  appName: string;
  yes?: boolean;
};

/**
 * Function to destroy an app.
 * @param {FlyAppsDestroyProps} props - The properties required to destroy an app.
 * @returns {Promise<void>} - A promise that resolves when the app is destroyed.
 */
export const FlyAppsDestroy = async (
  props: FlyAppsDestroyProps
): Promise<void> => {
  const args = ["destroy", props.appName];
  if (props.yes) args.push("--yes");

  try {
    await FlyKitSdkCli.run("apps", args);
  } catch (error) {
    console.error(error);
    // Handle the error appropriately
  }
};
