import React, {useEffect, useState} from 'react'
import VideoTestimonialTable from './VideoTestimonialTable'

function VideoTestimonialRoute() {
  const [testimonials, setTestimonials] = useState([])
  useEffect(() => {
    async function fetchVideoTestimonials() {
      const testimonialsResponse = await fetch('/api/v1/videoTestimonials')
      return await testimonialsResponse.json()
    }
    fetchVideoTestimonials().then(setTestimonials)
  }, [])
  return (
    <>
      <VideoTestimonialTable testimonials={testimonials} />
    </>
  )
}

export default VideoTestimonialRoute
