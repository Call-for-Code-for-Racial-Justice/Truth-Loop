import React, { useEffect, useState } from 'react'
import VideoTestimonialTable from './VideoTestimonialTable'

function VideoTestimonialRoute() {
  const [testimonials, setTestimonials] = useState([])
  const [loadingTestimonials, setLoadingTestimonials] = useState(false)

  useEffect(() => {
    async function fetchVideoTestimonials() {
      setLoadingTestimonials(true)
      const testimonialsResponse = await fetch('/api/v1/videoTestimonials')
      return await testimonialsResponse.json()
    }
    fetchVideoTestimonials().then(setTestimonials)
    setLoadingTestimonials(false)
  }, [])
  return (
    <>
      <VideoTestimonialTable testimonials={testimonials} isLoading={loadingTestimonials} />
    </>
  )
}

export default VideoTestimonialRoute
