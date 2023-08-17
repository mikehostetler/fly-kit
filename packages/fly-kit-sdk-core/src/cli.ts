import {
  spawn,
  ChildProcessWithoutNullStreams,
  SpawnOptions,
} from "child_process";

export const FlyKitSdkCli = {
  run: async (
    cmd: string,
    args: string[],
    opts?: SpawnOptions
  ): Promise<string> => {
    let stdout = "";

    if (!opts) opts = {};

    console.group(`Running \`fly ${cmd} ${args.join(" ")}\``);
    const fly = spawn("fly", [cmd, ...args], opts);
    fly.on("error", (err) => {
      console.log(`error: ${err.message}`);
    });

    fly.on("close", (code) => {
      console.log(`child process exited with code ${code}`);
    });

    if (fly.stderr) {
      fly.stderr.on("error", (data) => {
        console.log(`stderr: ${data}`);
      });
    }

    if (fly.stdout) {
      for await (const data of fly.stdout) {
        console.log("Fly: ", data);
        stdout += data.toString();
      }
    }
    console.groupEnd();
    return stdout;
  },

  runJSON: async (
    cmd: string,
    args: string[],
    opts?: SpawnOptions
  ): Promise<any> => {
    const stdout = await FlyKitSdkCli.run(cmd, [...args, "--json"], opts);
    let response = {};
    try {
      response = JSON.parse(stdout);
    } catch (e) {
      throw new Error("Could not parse JSON");
    }

    return response;
  },
};
