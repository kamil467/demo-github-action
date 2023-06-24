import {PR} from  '../types/pull-request'

interface Options {
  draft?: boolean
  closed?: boolean
  preferWithHeadSha?: string
}


function findByHeadSha(pullRequests: PR[], sha: string): PR | undefined {
  return pullRequests.find(pullRequest => pullRequest.head.sha.startsWith(sha)) // filter the PR which matches with commit sha
}

export default function getLastPullRequest(
  pullRequests: PR[],
  options: Options
): PR | null {
// filters only open , closed+merged PRS
  const filteredPRs = pullRequests
    .filter(({state}) => state === 'open') // filtering open PR

  if (filteredPRs.length === 0) return null

  // const defaultChoice = pullRequests[0] // returns only one PR
  const preferredChoice =
    options.preferWithHeadSha !== undefined
      ? findByHeadSha(pullRequests, options.preferWithHeadSha) 
      : null
  return preferredChoice 
}