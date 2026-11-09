import path from "path";
import fs from "fs";

const rootFolder = path.resolve("./src/app/saf-component-demos");
const folders = fs.readdirSync(rootFolder);

const extractedDocsFolder = path.join(
  path.resolve(),
  "dataExtractionForSafCopilot"
);
if (!fs.existsSync(extractedDocsFolder)) {
  fs.mkdirSync(extractedDocsFolder, { recursive: true });
}

folders.forEach((sourceFolderName) => {
  const folder = path.join(rootFolder, sourceFolderName);
  const files = fs
    .readdirSync(folder)
    .filter(
      (file) =>
        !file.endsWith(".spec.ts") &&
        (file.endsWith(".ts") || file.endsWith(".html"))
    );

  if (files.length !== 2) return;

  const tsFile = files.find((file) => file.endsWith(".ts"));
  const htmlFile = files.find((file) => file.endsWith(".html"));

  const isSaffronComponent =
    sourceFolderName.startsWith("saf-") && sourceFolderName.endsWith("-demo");

  if (!isSaffronComponent) return;

  const componentNameKebab = sourceFolderName
    .replace("saf-", "")
    .replace("-demo", "");
  const componentNamePascal = convertKebabCaseToPascalCase(componentNameKebab);

  const outputFile = path.join(
    extractedDocsFolder,
    `angular-${sourceFolderName}.md`
  );

  const content = `# ${`Saffron ${componentNamePascal} Component: <saf-${componentNameKebab}>`}

This is a code example for the Saffron ${componentNamePascal} component in Angular

## HTML

\`\`\`html
${fs.readFileSync(path.join(folder, htmlFile), "utf-8")}
\`\`\`

## TypeScript

\`\`\`typescript
${fs.readFileSync(path.join(folder, tsFile), "utf-8")}
\`\`\`

This is the end of the code example for the Saffron ${componentNamePascal} component in Angular`;

  // write file
  fs.writeFileSync(outputFile, content);
});

function convertKebabCaseToPascalCase(kebabCase) {
  return capitalizeFirstLetter(
    kebabCase.replace(/-./g, (x) => x.toUpperCase()[1])
  );
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
