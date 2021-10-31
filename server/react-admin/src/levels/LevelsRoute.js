import React, {useEffect, useState} from 'react'
import LevelsTable from './LevelsTable'

function LevelsRoute() {
  const [levels, setLevels] = useState([])
  const [loadingLevels, setLoadingLevels] = useState(false)

  useEffect(() => {
    async function fetchLevels() {
      setLoadingLevels(true)
      const levelsResponse = await fetch('/api/v1/levels')
      return await levelsResponse.json()
    }
    fetchLevels().then(setLevels)
    setLoadingLevels(false)
  }, [])
  return (
    <>
      <LevelsTable levels={levels} isLoading={loadingLevels}/>
    </>
  )
}

export default LevelsRoute
