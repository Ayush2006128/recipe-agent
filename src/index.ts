import recipeFlow from "./flows/recipeFlow.ts";

async function main() {
  const result = await recipeFlow({
    ingredient: "Paneer",
    restrictions: "vegetarian",
  });

  console.log(result);
}

main().catch(console.error);

