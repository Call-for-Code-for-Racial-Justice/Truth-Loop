import React, {useEffect, useState} from 'react'

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
      <div data-testid={'publicationTable'}>{publications.length}</div>
      <div data-testid={'addPublication'}/>
    </>
  )
}

export default PublicationRoute
