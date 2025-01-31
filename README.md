# Post a string or the contents of a file to a Discourse topic

This repository provides a GitHub Action to post a string or the contents of a
given file to a specific Discourse topic, either adding a new reply or replacing
a single post's content.

We use it as part of our API documentation management suite:
[Rapidoc](https://rapidocweb.com/) as a [Discourse](https://discourse.org/)
[theme component](https://github.com/wwerner/discourse-rapidoc-theme-component)
to render [OpenAPI specifications](https://swagger.io/specification/) in forum
posts. We upload specifications using
[this action](https://github.com/grid-x/api-spec-to-discourse-action), create
changelogs with [that one](https://github.com/alexeytokar), snippets with
[this one](https://github.com/grid-x/api-spec-snippets-generator-action), and
finally upload the changelogs with the action from this repository.

## Prerequisites / Inputs

- `discourse_url` - your discourse instance domain, e.g.
  "community.developer.gridx.de
- `discourse_topic_id` - Use this to reply to a topic: the ID of the Discourse
  topic to reply to. You can find the ID, e.g., by inspecting your post in the
  browser and looking for `data-topic-id="<n>"` in the `article` element. (XPath
  `//h1/@data-topic-id`). **If both topic and post ID are given, topic ID takes
  precedence and a new reply is added**. ![Discourse Topic ID](doc-topic-id.png)
- `discourse_post_id` - Use this to replace the contents of a post: the ID of
  the Discourse post to reply to. You can find the ID, e.g., by inspecting your
  post in the browser and looking for `data-post-id="<n>"` in the `article`
  element. (XPath `//article/@data-post-id`). If there are multiple posts in the
  topic, make sure to find the correct one to replace. **If both topic and post
  ID are given, topic ID takes precedence and a new reply is added**.
- `discourse_api_key` - your discourse API key. It needs `topics:write`
  permissions. ![Discourse API Key](doc-discourse-api-key.png)
- `discourse_user` - the discourse user on whose behalf the action should be
  executed.
- `github_sha` - the commit hash to put into the post as reference, can be
  obtained using `$GITHUB_SHA` when running in an action or with
  `git rev-parse --short HEAD`
- `content_file` - the (text) file containing the contents to be posted,
  relative to the repositories root. Use either this or `content` directly. **If
  both are present, content file takes precedence.**
- `content` - the contents to be posted. Use either this or `content_file` to
  load the content from a file. D'uh. **If both are present, content file takes
  precedence.**

## Instructions

1. Create a topic for your changelogs. This action will be configured to post
   the changelog as a reply to this topic.
1. Get the required parameters as described above
1. Configure the action in your GH workflow, preferably on release

Example: Adding a reply from a file

```yaml
- name: Test Action against gridX community example post
  uses: ./
  with:
    discourse_url: ${{secrets.DISCOURSE_URL}}
    discourse_topic_id: <n>
    # OR discourse_post_id: <n>
    discourse_api_key: ${{secrets.DISCOURSE_API_KEY}}
    discourse_user: ${{secrets.DISCOURSE_USER}}
    github_sha: ${{env.SHORT_SHA}}
    content_file: ./changelog.md
    # OR content: "content as string"
```

Example: Replacing a single post with a fixed string

```yaml
- name: Test Action against gridX community example post
  uses: ./
  with:
    discourse_url: ${{secrets.DISCOURSE_URL}}
    discourse_post_id: <n>
    discourse_api_key: ${{secrets.DISCOURSE_API_KEY}}
    discourse_user: ${{secrets.DISCOURSE_USER}}
    github_sha: ${{env.SHORT_SHA}}
    content: 'Post <n> will be replaced by this'
```

## Development

- You can run the action locally using `npm run test:run`, providing the
  configuration parameters through the environment. See
  [test.ts](./src/test.ts).
- See [package.json](./package.json) for linting, testing and formatting
  scripts.
