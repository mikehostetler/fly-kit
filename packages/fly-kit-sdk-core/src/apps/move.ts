import { FlyKitSdkCli } from "../";

/**
 * Type for the properties required to move apps.
 * @property {string} appName - The name of the app to be moved.
 * @property {string} org - The organization to which the app is to be moved.
 * @property {boolean} skipHealthChecks - Whether to update machines without waiting for health checks.
 * @property {boolean} yes - Whether to accept all confirmations.
 */
export type FlyAppsMoveProps = {
  appName: string;
  org?: string;
  skipHealthChecks?: boolean;
  yes?: boolean;
};

/**
 * Function to move apps.
 * @param {FlyAppsMoveProps} props - The properties required to move apps.
 * @returns {Promise<void>} - A promise that resolves when the app has been moved.
 */
export const FlyAppsMove = async (props: FlyAppsMoveProps): Promise<void> => {
  const args = ["move", props.appName];
  if (props.org) args.push(`--org=${props.org}`);
  if (props.skipHealthChecks) args.push("--skip-health-checks");
  if (props.yes) args.push("--yes");

  try {
    await FlyKitSdkCli.run("apps", args);
  } catch (error) {
    console.error(error);
    // Handle the error appropriately
  }
};
