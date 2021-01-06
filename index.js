const core = require('@actions/core');
const github = require('@actions/github');
const fs = require('fs');
const bent = require('bent')
// const MarkdownIt = require('markdown-it'),
//     md = new MarkdownIt();
const md = require('markdown').markdown

const inputs = {
  mdFile: "md-file",
  pageId: "page-id",
  apiUrl: "api-url",
  apiUser: "api-user",
  apiKey: "api-key"
}

try {
  const mdPath = core.getInput(inputs.mdFile);
  const user = core.getInput(inputs.apiUser);
  const key = core.getInput(inputs.apiKey);
  const page = core.getInput(inputs.pageId);
  const url = core.getInput(inputs.apiUrl);
  const auth = "Basic " + Buffer.from(`${user}:${key}`).toString("base64");
  const getJSON = bent(
    url,
    'GET',
    {
      'Content-Type': 'application/json; charset=utf-8',
      "Authorization" : auth,
      "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.16; rv:84.0) Gecko/20100101 Firefox/84.0; node12"
    },
    'json',
    [200, 403]
  )
  const putJSON = bent(
    url,
    'PUT',
    {
      'Content-Type': 'application/json; charset=utf-8',
      "Authorization" : auth,
      "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.16; rv:84.0) Gecko/20100101 Firefox/84.0; node12"
    },
    'json',
    [200, 403]
  )
  const content = md.toHTML(fs.readFileSync(mdPath, {encoding: "utf8"}));
  console.log(content);
  async function updateWiki(){
      let currentPage = await getJSON(`/content/${page}?expand=version`)
      const title = currentPage.title;
      const number = currentPage.version.number;
      const payload = {
        id: page,
        type: "page",
        title: title,
        body: {
          storage: {
            value: content,
            representation: "storage"
          }
        },
        version: { number: number + 1}
      }
      putJSON(`/content/${page}?expand=version`, payload)
        .catch((error) => {
        console.error(error);
        ;(async ()=>{
          console.error("Error:");
          console.error(error);
          console.error(await error.json());
          console.error(await error.text());

        })().catch(e=>{
          console.error("Caught")
          console.error(e);
        })
      })
  }
  updateWiki();
} catch (error) {
  console.error(error.message);
  core.setFailed(error.message);
}
