import { FlyKitSdkCli } from "@fly-kit-sdk/core";

/**
 * Type for the properties required to allocate an IPv4 address.
 * @property {string} app - The name of the application.
 * @property {string} config - The path to the application configuration file.
 * @property {string} region - The target region.
 * @property {boolean} shared - Whether to allocate a shared IPv4.
 * @property {boolean} yes - Whether to auto-confirm IPv4 allocation.
 */
export type FlyIpsAllocateV4Props = {
  app?: string;
  config?: string;
  region?: string;
  shared?: boolean;
  yes?: boolean;
};

/**
 * Function to allocate an IPv4 address.
 * @param {FlyIpsAllocateV4Props} props - The properties required to allocate an IPv4 address.
 * @returns {Promise<void>} - A promise that resolves when the IPv4 address has been allocated.
 */
export const FlyIpsAllocateV4 = async (
  props: FlyIpsAllocateV4Props
): Promise<void> => {
  const args = ["allocate-v4"];
  if (props.app) args.push(`--app=${props.app}`);
  if (props.config) args.push(`--config=${props.config}`);
  if (props.region) args.push(`--region=${props.region}`);
  if (props.shared) args.push(`--shared`);
  if (props.yes) args.push(`--yes`);

  try {
    await FlyKitSdkCli.run("ips", args);
  } catch (error) {
    console.error(error);
    // Handle the error appropriately
  }
};
