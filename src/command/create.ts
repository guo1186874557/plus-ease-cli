import { Command } from "commander";
import prompts from "prompts";
import fs from "node:fs";
import { clone } from "../utils/clone";

const program = new Command("create");

program.argument("<project-name>", "项目名称");
program.action(async (projectName) => {
  let isCoverage = false;
  if (fs.existsSync(projectName)) {
    const res = await prompts({
      type: "confirm",
      name: "isCoverage",
      message: `目录"${projectName}"已存在是否覆盖`,
    });
    if (!res.isCoverage) {
      return;
    } else {
      isCoverage = res.isCoverage;
    }
  }

  const { template } = await prompts(
    {
      type: "select",
      name: "template",
      message: "请选择一个模板",
      choices: [
        {
          title: "组件库开发模板",
          value: "dev-component",
          description: "对element-plus进行二次封装",
        },
        {
          title: "基础开发模板",
          value: "basic",
        },
      ],
    },
    {
      onCancel: () => {
        console.log("Operation cancelled by user.");
        process.exit(0);
      },
    }
  );

  if (isCoverage) {
    fs.rmSync(projectName, { recursive: true });
  }
  await clone("https://gitee.com/jhon_guoguo/vue-template.git", projectName, ["-b", template]);
});
export default program;
