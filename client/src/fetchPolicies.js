import policies from './mockdata/CURRENT_LIST_RESULT'

export default async function fetchPolicies() {
  if (process.env.REACT_APP_MOCK_DATA) {
    console.log('Using MOCK DATA for policy store')
    return [...policies]
  } else {
    const apiUrl = process.env.REACT_APP_SERVER_URL || ''
    const policyFullDetailResponse = await fetch(
      `${apiUrl}/api/v1/legislativeArtifacts`
    )
    return policyFullDetailResponse.json()
  }
}
