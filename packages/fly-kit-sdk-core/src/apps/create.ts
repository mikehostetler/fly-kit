import { FlyKitSdkCli } from "../";

/**
 * Type for the properties required to create an app.
 * @property {string} APPNAME - The name of the app to create.
 * @property {boolean} generateName - Whether to generate an app name.
 * @property {string} name - The app name to use.
 * @property {string} network - The custom network id.
 * @property {string} org - The target Fly organization.
 */
export type FlyAppsCreateProps = {
  APPNAME?: string;
  generateName?: boolean;
  name?: string;
  network?: string;
  org?: string;
};

/**
 * Function to create an app.
 * @param {FlyAppsCreateProps} props - The properties required to create an app.
 * @returns {Promise<any>} - A promise that resolves to the result of the app creation.
 */
export const FlyAppsCreate = async (
  props: FlyAppsCreateProps
): Promise<any> => {
  const args = ["create"];
  if (props.APPNAME) args.push(props.APPNAME);
  if (props.generateName) args.push("--generate-name");
  if (props.name) args.push(`--name=${props.name}`);
  if (props.network) args.push(`--network=${props.network}`);
  if (props.org) args.push(`--org=${props.org}`);

  try {
    const result = await FlyKitSdkCli.runJSON("apps", args);
    return result;
  } catch (error) {
    console.error(error);
    // Handle the error appropriately
  }
};
