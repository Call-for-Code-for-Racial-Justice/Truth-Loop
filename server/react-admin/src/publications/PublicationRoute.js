import React, { useEffect, useState } from 'react'
import PublicationTable from './PublicationTable'

function PublicationRoute() {
  const [publications, setPublications] = useState([])
  const [loadingPublications, setLoadingPublications] = useState(false)

  useEffect(() => {
    async function fetchPublications() {
      setLoadingPublications(true)
      const publicationsResponse = await fetch('/api/v1/publications')
      return await publicationsResponse.json()
    }
    fetchPublications().then(setPublications)
    setLoadingPublications(false)
  }, [])
  return (
    <>
      <PublicationTable publications={publications} isLoading={loadingPublications} />
    </>
  )
}

export default PublicationRoute
