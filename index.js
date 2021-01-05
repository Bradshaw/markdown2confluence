const core = require('@actions/core');
const github = require('@actions/github');
const fs = require('fs');
const MarkdownIt = require('markdown-it'),
    md = new MarkdownIt();

const inputs = {
  mdFile: "md-file",
  apiUrl: "api-url",
  apiUser: "api-user",
  apiKey: "api-key"
}

try {
  // `who-to-greet` input defined in action metadata file
  const mdPath = core.getInput(inputs.mdFile);
  console.log(`Reading ${mdPath}`);
  const content = fs.readFileSync(mdPath, {encoding: "utf8"});
  console.log(md.render(content));
  //const payload = JSON.stringify(github.context.payload, undefined, 2)
} catch (error) {
  core.setFailed(error.message);
}
