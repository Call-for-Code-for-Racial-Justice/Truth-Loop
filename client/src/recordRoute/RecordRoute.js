import React, { useCallback, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Column, Grid, Row } from 'carbon-components-react'
import StopFilledAlt32 from '@carbon/icons-react/lib/stop--filled--alt/32'
import RecordingFilledAlt32 from '@carbon/icons-react/lib/recording--filled--alt/32'
import Webcam from 'react-webcam'
import RecordRTC from 'recordrtc'

import './RecordRoute.scss'

const mediaConstraints = {
  video: {
    mandatory: {
      maxWidth: 400,
      maxHeight: 720,
    },
  },
  audio: true,
}

const RecordRoute = () => {
  const { policyId } = useParams()

  const webcamRef = useRef(null)
  const videoDisplayRef = useRef({
    muted: false,
    controls: true,
    autoplay: false,
  })

  const [displayWebCam, setDisplayWebCam] = useState(false)
  const [recording, setRecording] = useState(false)
  const [stream, setStream] = useState(null)
  const [recordRtc, setRecordRtc] = useState(null)
  const [videoPlayerSource, setVideoPlayerSource] = useState('')

  const onUserMediaRetrievalSuccess = useCallback(
    (streamFromMedia) => {
      const options = {
        mimeType: 'video/webm;codecs=vp9',
        audioBitsPerSecond: 128000,
        videoBitsPerSecond: 128000,
        timeSlice: 2000,
        bitsPerSecond: 128000,
      }
      setStream(streamFromMedia)
      const recordRtcLocal = RecordRTC(streamFromMedia, options)
      setRecordRtc(recordRtcLocal)
      recordRtcLocal.startRecording()
    },
    [setStream, setRecordRtc]
  )

  const onUserMediaRetrievalError = useCallback((error) => {
    console.warn(error)
  }, [])

  const onRecordingStopped = useCallback(
    (audioVideoWebmUrl) => {
      setVideoPlayerSource(audioVideoWebmUrl)
    },
    [setVideoPlayerSource]
  )

  const startRecording = useCallback(() => {
    setDisplayWebCam(true)
    setRecording(true)
  }, [setDisplayWebCam, setRecording])

  const stopRecording = useCallback(() => {
    recordRtc.stopRecording(onRecordingStopped)
    stream.getAudioTracks().forEach((track) => track.stop())
    stream.getVideoTracks().forEach((track) => track.stop())
    setRecording(false)
    setDisplayWebCam(false)
  }, [onRecordingStopped, recordRtc, stream, setRecording, setDisplayWebCam])

  const renderWebcam = () => {
    return (
      <>
        <Webcam
          ref={webcamRef}
          width={'100%'}
          data-testid={'webcam'}
          videoConstraints={mediaConstraints}
          onUserMedia={onUserMediaRetrievalSuccess}
          onUserMediaError={onUserMediaRetrievalError}
        />
      </>
    )
  }

  const renderVideoPlayer = () => {
    return (
      <div data-testid={'videoPlayer'}>
        <video
          ref={videoDisplayRef}
          className="video"
          controls
          src={videoPlayerSource}
        />
      </div>
    )
  }

  const renderStartRecordingOption = () => (
    <RecordingFilledAlt32
      onClick={startRecording}
      className="btn-record-start"
      data-testid={'startRecording'}
    />
  )

  const renderStopRecordingOption = () => (
    <StopFilledAlt32
      onClick={stopRecording}
      className="btn-record-stop"
      data-testid={'stopRecording'}
    />
  )

  if (!policyId) {
    return <h2 data-testid={'noPolicyFound'}>No policy found</h2>
  }

  return (
    <div className="bx--grid bx--grid--default bx--grid--no-gutter tell-me-content">
      <div className="bx--row">
        <div className="bx--col r1-col">
          <div className="page-title">Tell My Story</div>
        </div>
      </div>
      <div className="bx--row">
        <div className="bx--col r2-col">
          <div className="video-rec text-xs-center">
            <input type="hidden" name="video" />
            {displayWebCam && renderWebcam()}
            {!displayWebCam && renderVideoPlayer()}
            <div className="video-controllers" />
          </div>
        </div>
      </div>
      <div className="bx--row">
        <div className="bx--col r3-col">
          <Grid className={'video-control-panel'}>
            <Row className={'grid-row'}>
              <Column className={'col-1'}>
                <div>Full Detail</div>
              </Column>
              <Column className={'col-2'}>
                <div className="btn-blur">Blur</div>
              </Column>
              <Column className={'col-3'}>
                <div>Audio Only</div>
              </Column>
            </Row>
            <Row className={'grid-row'}>
              <Column className={'col-1'}>
                Lulu Blake
                <br />
                10-15-2020
              </Column>
              <Column className={'col-2'}>
                {recording
                  ? renderStopRecordingOption()
                  : renderStartRecordingOption()}
              </Column>
              <Column className={'col-3 video-length'}>
                <div>02.00m</div>
              </Column>
            </Row>
          </Grid>
        </div>
      </div>
      <div className="bx--row">
        <div className="bx--col r4-col bx--btn--secondary">
          <div className="btn">Cancel</div>
        </div>
        <div className="bx--col r4-col bx--btn--primary">
          <div className="btn">Share</div>
        </div>
      </div>
    </div>
  )
}

export default RecordRoute
