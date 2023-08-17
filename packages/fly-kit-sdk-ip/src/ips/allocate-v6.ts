import { FlyKitSdkCli } from "@fly-kit-sdk/core";

/**
 * Type for the properties required to allocate an IPv6 address.
 * @property {string} app - The application name.
 * @property {string} config - The path to the application configuration file.
 * @property {string} network - The target network name for a Flycast private IPv6 address.
 * @property {string} org - The target Fly organization.
 * @property {boolean} private - Whether to allocate a private IPv6 address.
 * @property {string} region - The target region.
 */
export type FlyIpsAllocateV6Props = {
  app?: string;
  config?: string;
  network?: string;
  org?: string;
  private?: boolean;
  region?: string;
};

/**
 * Function to allocate an IPv6 address.
 * @param {FlyIpsAllocateV6Props} props - The properties required to allocate an IPv6 address.
 * @returns {Promise<void>} - A promise that resolves when the operation is complete.
 */
export const FlyIpsAllocateV6 = async (
  props: FlyIpsAllocateV6Props
): Promise<void> => {
  const args = ["allocate-v6"];
  if (props.app) args.push(`--app=${props.app}`);
  if (props.config) args.push(`--config=${props.config}`);
  if (props.network) args.push(`--network=${props.network}`);
  if (props.org) args.push(`--org=${props.org}`);
  if (props.private) args.push(`--private`);
  if (props.region) args.push(`--region=${props.region}`);

  try {
    await FlyKitSdkCli.run("ips", args);
  } catch (error) {
    console.error(error);
    // Handle the error appropriately
  }
};
