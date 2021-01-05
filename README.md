# Markdown to Confluence

This action renders a markdown file in your repo and pushes it toyour Confluence wiki

## Inputs

### `md-file`

**Required** Path of the markdown file to push. Default `"README.md"`.

### `page-id`

**Required** ID of the Confluence page to update. Example `"2336653363"`.

### `api-url`

**Required** URL of your Confluence API. Example `"https://<YOUR_CONFLUENCE_URL>/rest/api/"`.

### `api-user`

**Required** e-mail address used to identify your Confluence user. Example `"user@example.com"`.

### `api-key`

**Required** [Confluence API Token](https://confluence.atlassian.com/cloud/api-tokens-938839638.html) to use.

## Example usage
```yaml
uses: Bradshaw/markdown2confluence@v0
with:
  md-file: 'README.md'
  page-id: 2336653363
  api-url: 'https://<YOUR_CONFLUENCE_URL>/rest/api/'
  api-user: 'user@example.com'
  api-key: ${{ secrets.CONFLUENCE_TOKEN }}
```
