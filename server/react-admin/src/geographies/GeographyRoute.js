import React, { useEffect, useState } from 'react'
import GeographyTable from './GeographyTable'

function GeographyRoute() {
  const [geographies, setGeographies] = useState([])
  const [loadingGeographies, setLoadingGeographies] = useState(false)

  useEffect(() => {
    async function fetchGeographies() {
      setLoadingGeographies(true)
      const geographiesResponse = await fetch('/api/v1/geospatialDefinitions')
      return await geographiesResponse.json()
    }
    fetchGeographies().then(setGeographies)
    setLoadingGeographies(false)
  }, [])
  return (
    <>
      <GeographyTable geographies={geographies} isLoading={loadingGeographies} />
    </>
  )
}

export default GeographyRoute
