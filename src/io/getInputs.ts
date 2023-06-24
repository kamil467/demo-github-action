import * as core from '@actions/core'
import * as github from '@actions/github'

type ActionInput = {
    token: string,
    sha: string
    releaseName: string
}

export default  function getInputs(): ActionInput{
    const gToken = core.getInput('github-token',{required: true});
    console.log(`GitHub Token is : ${gToken}`);

    const commitSha = core.getInput('sha') || github.context.sha;
    console.log(`Current Commit Sha :${commitSha}`);

    const releaseName = core.getInput('release-name',{required: true});
    console.log(`release name :${releaseName}`);

    return {
        token: gToken,
       sha:commitSha,
        releaseName: releaseName
    }
    
}