import { select } from "@inquirer/prompts";

export async function selectMemo(choices) {
  return await select({
    message: "Choose a note you want to see:",
    choices: choices.map((choice) => ({
      value: choice.value,
      name: choice.name,
      description: choice.description,
    })),
  });
}
