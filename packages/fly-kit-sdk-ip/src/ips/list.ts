import { FlyKitSdkCli } from "@fly-kit-sdk/core";

/**
 * Type for the properties required to list IPs.
 * @property {string} app - The application name.
 * @property {string} config - The path to the application configuration file.
 */
export type FlyIpsListProps = {
  app?: string;
  config?: string;
};

/**
 * Type for the return value of the FlyIpsList function.
 * @property {string} IP - The IP address.
 */
export type FlyIpsListReturn = {
  IP: string;
};

/**
 * Function to list IPs.
 * @param {FlyIpsListProps} props - The properties required to list IPs.
 * @returns {Promise<FlyIpsListReturn[] | []>} - A promise that resolves to an array of FlyIpsListReturn objects or an empty array.
 */
export const FlyIpsList = async (
  props: FlyIpsListProps
): Promise<FlyIpsListReturn[] | []> => {
  const args = ["list"];
  if (props.app) args.push(`--app=${props.app}`);
  if (props.config) args.push(`--config=${props.config}`);

  let list_ips: FlyIpsListReturn[] = [];
  try {
    const ips = await FlyKitSdkCli.runJSON("ips", args);
    Object.keys(ips).forEach((ipKey) => {
      const ip = ips[ipKey];
      list_ips.push({
        IP: ip.IP,
      });
    });
  } catch (error) {
    console.error(error);
    // Handle the error appropriately
  }
  return list_ips;
};
