import policy from './mockdata/CURRENT_FULL_RETRIEVAL_OF_ARTIFACT_1'

export default async function fetchPolicy(policyId) {
  if (process.env.REACT_APP_MOCK_DATA) {
    console.log('Using MOCK DATA for policy store')
    return { ...policy, id: policyId }
  } else {
    const apiUrl = process.env.REACT_APP_SERVER_URL || ''
    const policyFullDetailResponse = await fetch(
      `${apiUrl}/api/v1/legislativeArtifacts/fullDetail/${policyId}`
    )
    return policyFullDetailResponse.json()
  }
}
