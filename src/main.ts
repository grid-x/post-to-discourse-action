import * as core from '@actions/core'
import Axios from 'axios'
import FormData from 'form-data'
import fs from 'fs'

type DiscourseUploadResult = {
  url: string
  short_url: string
  short_path: string
  original_filename: string
}

/**
 * The main function for the action.
 * @returns {Promise<void>} Resolves when the action is complete.
 */
export async function run(
  discourseUrl: string,
  discoursePostId: string,
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

    const post = async (
      postBody: string
    ): Promise<DiscourseUploadResult | void> => {
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
      http.interceptors.request.use(config => {
        if (config.data instanceof FormData) {
          Object.assign(config.headers, config.data.getHeaders())
        }
        return config
      })
      return http
        .post('/posts.json', {
          raw: postBody,
          reply_to_post_number: discoursePostId
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

    const postBody = (
      content: string,
      commit: string
    ): string => `## Changelog ${new Date().toISOString()}
${content}

(sha ${commit.trim()})
`

    const contentToPost = contentFile
      ? fs.readFileSync(contentFile)?.toString()
      : content

    // Debug logs are only output if the `ACTIONS_STEP_DEBUG` secret is true
    core.debug(`Adding changelog to post #${discoursePostId}`)
    await post(postBody(content, commit))
    core.debug('Changelog posted')
  } catch (error) {
    // Fail the workflow run if an error occurs
    if (error instanceof Error) core.setFailed(error.message)
  }
}
