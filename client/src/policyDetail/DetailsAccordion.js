import React from 'react'
import PropTypes from 'prop-types'
import {Accordion, AccordionItem} from 'carbon-components-react'

const DetailsAccordion = ({summary, officialsAndSponsors, policyStatus, relatedPolicies}) => {
  return (
    <Accordion>
      <AccordionItem title="Summary">
        <p>{summary}</p>
      </AccordionItem>
      <AccordionItem title="Officials and sponsors">
        {/*<p>{officialsAndSponsors}</p>*/}
        <p>TODO: handle array of officials</p>
      </AccordionItem>
      <AccordionItem title="Status">
        <p>{policyStatus}</p>
      </AccordionItem>
      <AccordionItem title="Related policies">
        {/*<p>{relatedPolicies}</p>*/}
        <p>TODO: handle array of related policies</p>
      </AccordionItem>
    </Accordion>
  )
}

DetailsAccordion.propTypes = {
  summary: PropTypes.string.isRequired,
  officialsAndSponsors: PropTypes.array.isRequired,
  policyStatus: PropTypes.string.isRequired,
  relatedPolicies: PropTypes.array.isRequired,
}
export default DetailsAccordion
