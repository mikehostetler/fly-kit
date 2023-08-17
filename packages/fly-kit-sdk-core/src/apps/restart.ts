import { FlyKitSdkCli } from "../";

/**
 * Type for the properties required to restart apps.
 * @property {string} appName - The name of the app to restart.
 * @property {boolean} forceStop - Whether to perform a force stop against the target Machine.
 * @property {boolean} skipHealthChecks - Whether to restart the app without waiting for health checks.
 */
export type FlyAppsRestartProps = {
  appName?: string;
  forceStop?: boolean;
  skipHealthChecks?: boolean;
};

/**
 * Function to restart apps.
 * @param {FlyAppsRestartProps} props - The properties required to restart apps.
 * @returns {Promise<void>} - A promise that resolves when the app is restarted.
 */
export const FlyAppsRestart = async (
  props: FlyAppsRestartProps
): Promise<void> => {
  const args = ["restart"];
  if (props.appName) args.push(props.appName);
  if (props.forceStop) args.push("--force-stop");
  if (props.skipHealthChecks) args.push("--skip-health-checks");

  try {
    await FlyKitSdkCli.run("apps", args);
  } catch (error) {
    console.error(error);
    // Handle the error appropriately
  }
};
