import React, { useState } from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {ListItem, Modal, UnorderedList} from 'carbon-components-react'
import './PrivacyNotice.scss'
import {PRIVACY_CANCELLED_UPDATE, PRIVACY_ACCEPTED_UPDATE} from '../store/privacy.duck'

const PrivacyNotice = () => {
  const {privacyAccepted} = useSelector(({privacy}) => privacy)
  const [showModal, setShowModal] = useState(!privacyAccepted)
  const dispatch = useDispatch()
  const cancel = () => {
    setShowModal(false)
    dispatch({ type: PRIVACY_CANCELLED_UPDATE, payload: true })
  }
  const accept = () => {
    setShowModal(false)
    dispatch({ type: PRIVACY_ACCEPTED_UPDATE, payload: true })
  }
  return <div>
    <Modal data-testid={'privacyNotice'}
           className={!privacyAccepted && showModal ? 'privacyNoticeOpen' : 'privacyNoticeClosed' }
           open={!privacyAccepted && showModal}
           modalHeading="Truth Loop Project"
           modalLabel="Please Accept the Privacy Statement"
           primaryButtonText="Accept"
           secondaryButtonText="Cancel"
           onRequestClose={cancel}
           onRequestSubmit={accept}
           onSecondarySubmit={cancel}
    >
      <p>
        The &quot;IMPLEMENTER&quot; will process your personal information on the basis of consent and
        legitimate interest
        <br/>By uploading your video and audio content via the &quot;Truth Loops&quot; Platform, you consent
        to the &quot;IMPLEMENTER&quot; using your personal information for Purpose. We confirm that
        your consent includes the following:
      </p>
      <UnorderedList className="bullet-list">
        <ListItem>Your provision of your personal information is unconditional.
          And you may withdraw your consent at any time;</ListItem>
        <ListItem>The Purpose of providing your PI is to make the
          video content available to legislators, policy makers,
          advocacy groups, the media, and social media to advance the
          cause of ending racial discrimination and injustice;</ListItem>
        <ListItem>You only need to consent to the actual personal information
          that exists within your content which you
          upload to the Platform. No other personal information is requested
          or required of you;</ListItem>
        <ListItem>Your uploading of the content is an indication of your
          wishes to make use
          of your personal information for the Purpose.</ListItem>
      </UnorderedList>
    </Modal>
  </div>
}

export default PrivacyNotice