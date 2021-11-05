import React, { useEffect, useState } from 'react'
import ArtifactTable from './ArtifactTable'

function ArtifactRoute() {
  const [artifacts, setArtifacts] = useState([])
  const [loadingArtifacts, setLoadingArtifacts] = useState(false)

  useEffect(() => {
    async function fetchArtifacts() {
      setLoadingArtifacts(true)
      const artifactsResponse = await fetch('/api/v1/legislativeArtifacts')
      return await artifactsResponse.json()
    }
    fetchArtifacts().then(setArtifacts)
    setLoadingArtifacts(false)
  }, [])
  return (
    <>
      <ArtifactTable artifacts={artifacts} isLoading={loadingArtifacts} />
    </>
  )
}

export default ArtifactRoute
