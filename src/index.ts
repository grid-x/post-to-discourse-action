/**
 * The entrypoint for the action.
 */
import { run } from './main'
import * as core from '@actions/core'

// eslint-disable-next-line @typescript-eslint/no-floating-promises
const discourseUrl: string = core.getInput('discourse_url')
const discourseTopicId: string = core.getInput('discourse_topic_id')
const discourseApiKey: string = core.getInput('discourse_api_key')
const discourseUser: string = core.getInput('discourse_user')
const commit: string = core.getInput('github_sha')

const content: string = core.getInput('content')
const contentFile: string = core.getInput('content_file')

run(
  discourseUrl,
  discourseTopicId,
  discourseApiKey,
  discourseUser,
  commit,
  content,
  contentFile
)
