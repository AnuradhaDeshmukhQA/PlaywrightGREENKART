import { exec } from "child_process";

export async function runPlaywrightTests() {
  return new Promise((resolve) => {
    exec("npx playwright test", (error, stdout, stderr) => {
      if (error) {
        resolve(stderr);
      } else {
        resolve(stdout);
      }
    });
  });
}