import { getInput, debug, setOutput, setFailed } from '@actions/core'
import { wait } from './wait.js'

/**
 * The main function for the action.
 * @returns {Promise<void>} Resolves when the action is complete.
 */
export async function run() {
  try {
    const ms = getInput('milliseconds', { required: true })

    // Debug logs are only output if the `ACTIONS_STEP_DEBUG` secret is true
    debug(`Waiting ${ms} milliseconds ...`)

    // Log the current timestamp, wait, then log the new timestamp
    debug(new Date().toTimeString())
    await wait(parseInt(ms, 10))
    debug(new Date().toTimeString())

    // Set outputs for other workflow steps to use
    setOutput('time', new Date().toTimeString())
  } catch (error) {
    // Fail the workflow run if an error occurs
    setFailed(error.message)
  }
}
