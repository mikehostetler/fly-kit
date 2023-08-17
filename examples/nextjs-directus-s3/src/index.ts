import { program, command } from "bandersnatch";
import { MyMinioStack, MyMinioStackProps } from "./stack";
import path from "path";

const minio_path = path.resolve(__dirname, "..", "apps", "minio");

let stack: MyMinioStack;
const app = program().add(
  command("init").action(async (args) => {
    const props: MyMinioStackProps = {
      name: "test-kit-fly-minio",
      org: "personal",
      // network: "default",
      primary_region: "ord",
      minio_version: "latest",
      volume_name: "minio_volume",
      path: minio_path,
    };
    stack = new MyMinioStack(props);
  })
);
app.add(
  command("launch").action(async () => {
    if (!stack) throw new Error("Stack not initialized");
    stack.launch();
  })
);
app.add(
  command("destroy").action(async (args) => {
    if (!stack) throw new Error("Stack not initialized");
    stack.destroy();
  })
);

app.repl();
