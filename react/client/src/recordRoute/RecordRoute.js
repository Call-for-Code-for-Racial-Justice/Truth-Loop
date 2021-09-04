import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import {Column, Grid, Row} from 'carbon-components-react'
import StopFilledAlt32 from '@carbon/icons-react/lib/stop--filled--alt/32'
import RecordingFilledAlt32 from '@carbon/icons-react/lib/recording--filled--alt/32'

import './RecordRoute.scss'

const RecordRoute = () => {
  const { policyId } = useParams()
  const [displayWebCam, setDisplayWebCam] = useState(false)
  const [showRecordStart, setShowRecordStart] = useState(true)
  const [showRecordStop, setShowRecordStop] = useState(false)

  const renderWebCam = () => {
    return (<div data-testid={'webCam'}>Web Cam</div>)
  }

  const renderVideoPlayer = () => {
    return (<div data-testid={'videoPlayer'}>
      <video className="video" /*:poster="poster"*/ controls/>
    </div>)
  }

  const startRecording = () => {
    setDisplayWebCam(true)
    setShowRecordStart(false)
    setShowRecordStop(true)
  }
  const renderStartRecordingOption = () => (
    <RecordingFilledAlt32 onClick={startRecording} className="btn-record-start" data-testid={'startRecording'}/>
  )

  const stopRecording = () => {
    setDisplayWebCam(false)
    setShowRecordStart(true)
    setShowRecordStop(false)
  }
  const renderStopRecordingOption = () => (
    <StopFilledAlt32 onClick={stopRecording} className="btn-record-stop" data-testid={'stopRecording'}/>
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
            <input type="hidden" name="video"/>
            {displayWebCam && renderWebCam()}
            {!displayWebCam && renderVideoPlayer()}
            <div className="video-controllers"/>
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
                <br/>10-15-2020
              </Column>
              <Column className={'col-2'}>
                {showRecordStart && renderStartRecordingOption()}
                {showRecordStop && renderStopRecordingOption()}
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