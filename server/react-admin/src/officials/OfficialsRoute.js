import React, {useEffect, useState} from 'react'
import OfficialsTable from './OfficialsTable'

function OfficialsRoute() {
  const [officials, setOfficials] = useState([])
  const [loadingOfficials, setLoadingOfficials] = useState(false)

  useEffect(() => {
    async function fetchOfficials() {
      setLoadingOfficials(true)
      const officialsResponse = await fetch('/api/v1/officials')
      return await officialsResponse.json()
    }
    fetchOfficials().then(setOfficials)
    setLoadingOfficials(false)
  }, [])
  return (
    <>
      <OfficialsTable officials={officials} isLoading={loadingOfficials}/>
    </>
  )
}

export default OfficialsRoute
