import { program } from "commander";
import { version } from "../package.json";
import createCommand from "./command/create";

program.name("plus-ease-cli").version(version, "-V, --version");
program.addCommand(createCommand);
program.parse();
