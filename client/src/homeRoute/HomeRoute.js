import React, {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {injectIntl} from 'react-intl'
import './HomeRoute.scss'
import PrivacyNotice from '../privacyNotice/PrivacyNotice'
import PolicyTable from '../policyTable/PolicyTable'
import {fetchPoliciesFromServer} from '../store/policyList.duck'
import {messages} from '../nls/nlsUtility'
import PropTypes from 'prop-types'

const HomeRoute = ({intl}) => {
  const {privacyAccepted, privacyCancelled} = useSelector(({privacy}) => privacy)
  const {items} = useSelector(({policyList}) => policyList)
  const dispatch = useDispatch()

  useEffect(() => {
    if (!items || !items.length) {
      dispatch(fetchPoliciesFromServer())
    }
  }, [items, dispatch])

  const renderPrivacyCancelContent = () => {
    return (
      <div data-testid={'pleaseAcceptPrivacyStatement'} className="privacy-cancel-content">
        <h5>{intl.formatMessage(messages.privacyAccept)}</h5>
        <p>{intl.formatMessage(messages.privacyNotAvail)}
          <br/>{intl.formatMessage(messages.privacyRefresh)}</p>
      </div>
    )
  }

  return (
    <div className="home-content">
      <div className="bx--grid bx--grid--full-width bx--grid--no-gutter ">
        <div className="bx--row">
          <div className="bx--col">
            {!privacyAccepted && <PrivacyNotice/>}
            {privacyAccepted && <PolicyTable policies={items}/>}
            {privacyCancelled && !privacyAccepted && renderPrivacyCancelContent()}
          </div>
        </div>
      </div>
    </div>
  )
}

HomeRoute.propTypes = {
  intl: PropTypes.any.isRequired
}


export default injectIntl(HomeRoute)