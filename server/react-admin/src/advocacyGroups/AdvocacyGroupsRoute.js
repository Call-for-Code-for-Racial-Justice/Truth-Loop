import React, {useEffect, useState} from 'react'
import AdvocacyGroupsTable from './AdvocacyGroupsTable'

function AdvocacyGroupsRoute() {
  const [advocacyGroups, setAdvocacyGroups] = useState([])
  const [loadingAdvocacyGroups, setLoadingAdvocacyGroups] = useState(false)

  useEffect(() => {
    async function fetchAdvocacyGroups() {
      setLoadingAdvocacyGroups(true)
      const advocacyGroupsResponse = await fetch('/api/v1/advocacyGroups')
      return await advocacyGroupsResponse.json()
    }
    fetchAdvocacyGroups().then(setAdvocacyGroups)
    setLoadingAdvocacyGroups(false)
  }, [])
  return (
    <>
      <AdvocacyGroupsTable advocacyGroups={advocacyGroups} isLoading={loadingAdvocacyGroups}/>
    </>
  )
}

export default AdvocacyGroupsRoute
