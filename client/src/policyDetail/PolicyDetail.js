import React, {useCallback} from 'react'
import PropTypes from 'prop-types'
import './PolicyDetail.scss'
import Sentiment from './Sentiment'
import transformDate from '../transformDate'
import DetailsAccordion from './DetailsAccordion'
import {Button} from 'carbon-components-react'
import Launch16 from '@carbon/icons-react/lib/launch/16'
import {useHistory} from 'react-router-dom'

const PolicyDetail = ({policy}) => {
  const history = useHistory()

  const handleTellMyStoryClicked = useCallback(() => {
    return history.push(`/policy/${policy.id}/record`)
  }, [policy, history])

  return (
    <div>
      <div className="bx--grid policy">
        <div className="bx--row">
          <div className="bx--col">
            <h6 className="light-text">Federal</h6>
          </div>
        </div>
        <div className="bx--row">
          <div className="bx--col">
            <h4>{policy.title}</h4>
          </div>
        </div>
        <div className="bx--row">
          <div className="bx--col">
            <h6 className="light-text">{policy.officials && policy.officials.length > 0 ? policy.officials[0].name : ''}</h6>
          </div>
          <div className="bx--col text-right">
            <h6 className="light-text" data-testid={'dateIntroduced'}>
              Introduced: {transformDate(policy.date_introduced)}
            </h6>
          </div>
        </div>
        <div className="bx--row">
          <div className="bx--col">
            <h6 className="light-text">{policy.status}</h6>
          </div>
        </div>
        <div className="bx--row launch">
          <div className="bx--col">
            <h5>
              <a href={`${policy.link_to_full_text}`} target="_blank" rel="noreferrer">Full Text <Launch16/></a>
            </h5>
          </div>
        </div>
        <Sentiment/>
        <div className="bx--row">
          <DetailsAccordion summary={policy.summary} officialsAndSponsors={policy.officials} statusHistory={[]}
                            relatedPolicies={policy.related}/>
        </div>
      </div>

      <Button data-testid={'tellMyStoryButton'} kind={'primary'} icon="img/video--add.svg" className="fixed-btn lower-btn"
              onClick={handleTellMyStoryClicked}>
        Tell my story
      </Button>

      <Button kind={'secondary'} icon="img/video--filled.svg" className="fixed-btn bottom-btn" onClick={() => {
        console.warn('not yet implemented')
      }}>
        See policy testimonials
      </Button>
    </div>
  )
}
PolicyDetail.propTypes = {
  policy: PropTypes.object.isRequired,
}
export default PolicyDetail