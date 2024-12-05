import { run } from './main'
import { execSync } from 'node:child_process'

/*
export DISCOURSE_URL=community.developer.gridx.de
export DISCOURSE_POST_ID=<n>
export DISCOURSE_API_KEY=...
export DISCOURSE_USER=wwerner
*/

const discourseUrl: string = process.env.DISCOURSE_URL ?? ''
const discoursePostId: string = process.env.DISCOURSE_POST_ID ?? ''
const discourseApiKey: string = process.env.DISCOURSE_API_KEY ?? ''
const discourseUser: string = process.env.DISCOURSE_USER ?? ''
const commit: string = execSync('git rev-parse --short HEAD').toString()

const content = ''
const contentFile = './test-post.md'

run(
  discourseUrl,
  discoursePostId,
  discourseApiKey,
  discourseUser,
  commit,
  content,
  contentFile
)
