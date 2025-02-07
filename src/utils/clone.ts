import simpleGit, { SimpleGit, SimpleGitOptions } from "simple-git";
import ora from "ora";
import pc from "picocolors";
import fs from "node:fs";

const gitOptions: Partial<SimpleGitOptions> = {
  baseDir: process.cwd(),
  binary: "git",
  maxConcurrentProcesses: 6,
};

export const clone = async (url: string, projectName: string, options?: string[]) => {
  fs.mkdirSync(projectName);
  const git: SimpleGit = simpleGit(gitOptions);
  const spinner = ora("拉取仓库模板中...").start();
  try {
    await git.clone(url, projectName, options);
    spinner.succeed("仓库模板拉取成功！");
    console.log(pc.green("==========================="));
    console.log(pc.green(`run: cd ${projectName}`));
    console.log(pc.green(`run: pnpm install`));
    console.log(pc.green(`run: pnpm dev`));
    console.log(pc.green("==========================="));
  } catch (error) {
    spinner.fail("拉取仓库模板失败");
    console.error(error);
  }
};
