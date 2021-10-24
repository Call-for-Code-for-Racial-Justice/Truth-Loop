import React, {useEffect, useState} from 'react'
import AdvocacyGroupsTable from './AdvocacyGroupsTable'

function AdvocacyGroupsRoute() {
  const [advocacyGroups, setAdvocacyGroups] = useState([])
  useEffect(() => {
    async function fetchAdvocacyGroups() {
      const advocacyGroupsResponse = await fetch('/api/v1/advocacyGroups')
      return await advocacyGroupsResponse.json()
    }
    fetchAdvocacyGroups().then(setAdvocacyGroups)
  }, [])
  return (
    <>
      <AdvocacyGroupsTable advocacyGroup={advocacyGroups}/>
    </>
  )
}

export default AdvocacyGroupsRoute