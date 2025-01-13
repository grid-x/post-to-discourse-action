import * as core from '@actions/core'
import Axios from 'axios'
import fs from 'fs'
import { title } from 'process'

/**
 * The main function for the action.
 * @returns {Promise<void>} Resolves when the action is complete.
 */
export async function run(
  discourseUrl: string,
  discourseTopicId: string,
  discourseApiKey: string,
  discourseUser: string,
  commit: string,
  content: string,
  contentFile: string
): Promise<void> {
  try {
    const discourseHeaders = {
      'Api-Key': discourseApiKey,
      'Api-Username': discourseUser
    }

    const post = async (postBody: string): Promise<void> => {
      if (!postBody?.trim()) {
        core.info('No changes detected. Skipping.')
        return
      }

      // ref: https://docs.discourse.org/#tag/Posts/operation/createTopicPostPM
      const http = Axios.create({
        baseURL: `https://${discourseUrl}`,
        headers: {
          'Api-Key': discourseApiKey,
          'Api-Username': discourseUser,
          'Content-Type': 'application/json',
          Accept: 'application/json'
        }
      })
      return http
        .post('/posts.json', {
          raw: postBody,
          topic_id: discourseTopicId,
          reply_to_post_number: discourseTopicId,
          skip_validations: true
        })
        .then(({ data }) => {
          core.debug(JSON.stringify(data, null, 2))
        })
        .catch(e => {
          console.error(
            'Error uploading file to Discourse',
            JSON.stringify(e, null, 2)
          )
          throw e
        })
    }

    const postBody = (content: string, commit: string): string =>
      content
        ? `# Changelog ${new Date().toISOString()}
${content}

(sha ${commit.trim()})
`
        : ''

    const contentToPost = contentFile
      ? fs.readFileSync(contentFile)?.toString()
      : content

    // Debug logs are only output if the `ACTIONS_STEP_DEBUG` secret is true
    core.info(`Adding changelog to post #${discourseTopicId}`)
    await post(postBody(contentToPost, commit))
    core.info('Changelog posted')
  } catch (error) {
    // Fail the workflow run if an error occurs
    if (error instanceof Error) core.setFailed(error.message)
  }
}
