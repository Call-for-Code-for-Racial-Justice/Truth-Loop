import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { ListItem, Modal, UnorderedList } from 'carbon-components-react'
import './PrivacyNotice.scss'
import {
  PRIVACY_CANCELLED_UPDATE,
  PRIVACY_ACCEPTED_UPDATE,
} from '../store/privacy.duck'
import { injectIntl } from 'react-intl'
import PropTypes from 'prop-types'
import { messages } from '../nls/nlsUtility'

const PrivacyNotice = ({ intl }) => {
  const { privacyAccepted } = useSelector(({ privacy }) => privacy)
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
  return (
    <div>
      <Modal
        data-testid={'privacyNotice'}
        className={
          !privacyAccepted && showModal
            ? 'privacyNoticeOpen'
            : 'privacyNoticeClosed'
        }
        open={!privacyAccepted && showModal}
        modalHeading={intl.formatMessage(messages.privacyNoticeHeading)}
        modalLabel={intl.formatMessage(messages.privacyNoticeLabel)}
        primaryButtonText={intl.formatMessage(messages.privacyNoticeAccept)}
        secondaryButtonText={intl.formatMessage(messages.privacyNoticeCancel)}
        onRequestClose={cancel}
        onRequestSubmit={accept}
        onSecondarySubmit={cancel}
      >
        <p>
          {intl.formatMessage(messages.privacyNotice1)}
          <br />
          {intl.formatMessage(messages.privacyNotice2)}
        </p>
        <UnorderedList className="bullet-list">
          <ListItem>{intl.formatMessage(messages.privacyNoticeList1)}</ListItem>
          <ListItem>{intl.formatMessage(messages.privacyNoticeList2)}</ListItem>
          <ListItem>{intl.formatMessage(messages.privacyNoticeList3)}</ListItem>
          <ListItem>{intl.formatMessage(messages.privacyNoticeList4)}</ListItem>
        </UnorderedList>
      </Modal>
    </div>
  )
}

PrivacyNotice.propTypes = {
  intl: PropTypes.any.isRequired,
}

export default injectIntl(PrivacyNotice)
