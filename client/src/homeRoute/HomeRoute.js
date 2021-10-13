import React, {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import './HomeRoute.scss'
import PrivacyNotice from '../privacyNotice/PrivacyNotice'
import PolicyTable from '../policyTable/PolicyTable'
import {fetchPoliciesFromServer} from '../store/policyList.duck'

const HomeRoute = () => {
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
        <h5>Please accept the Privacy Statement.</h5>
        <p>Sorry! content is not available without accepting the privacy policy.
          <br/>Please refresh this page and accept the privacy statement.</p>
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

export default HomeRoute