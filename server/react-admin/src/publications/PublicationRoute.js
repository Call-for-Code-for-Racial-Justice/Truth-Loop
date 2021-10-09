import React, {useEffect, useState} from 'react'
import PublicationTable from './PublicationTable'

function PublicationRoute() {
  const [publications, setPublications] = useState([])
  useEffect(() => {
    async function fetchPublications() {
      const publicationsResponse = await fetch('/api/v1/publications')
      return await publicationsResponse.json()
    }
    fetchPublications().then(setPublications)
  }, [])
  return (
    <>
      <PublicationTable publications={publications}/>
      <div data-testid={'addPublication'}/>
    </>
  )
}

export default PublicationRoute
