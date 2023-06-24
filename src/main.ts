import * as core from '@actions/core'
import * as github from '@actions/github'
import getInputs from './io/getInputs'
import getLastPullRequest from './operations/get-current-pr'
import getPRsAssociatedWithCommit from './adapter/get-prs-associated-with-commit'
import {render} from 'mustache'
import * as fs from 'fs';

async function main(): Promise<void> {
  try {
    console.log("Code is here...");
    let releaseSummaryTagTemplate = `### Kamil Custom Action for release
    | Name | Age | Version|
    |---|---|---|
    |{{name}} | {{age}} | 1.0.01|
     `
    let person = {
      name: 'Kamil',
      age: 30
    }
   let markdownOutput =  render(releaseSummaryTagTemplate,person);
   fs.writeFileSync("./person.md",markdownOutput);

    const {token, sha} = getInputs()

    const octokit = github.getOctokit(token)
    const allPRs = await getPRsAssociatedWithCommit(octokit, sha)

    const pr = getLastPullRequest(allPRs, {
      draft: true,
      closed: true,
      preferWithHeadSha: sha
    })

   

  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message)
  }
}
main()