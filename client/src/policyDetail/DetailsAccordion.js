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
        {officialsAndSponsors.length ? officialsAndSponsors.map(official => (
          <div key={official.id} data-testid={'officialsDetails'}>
            <p>Title: {official.title}</p>
            <p>Name: {official.name}</p>
            <p>Email Address: {official.email_address}</p>
            <p>Phone Number: {official.phone_number}</p>
            <p>Role: {official.role_in_artifact}</p>
          </div>
        )) : <div>No officials or sponsors</div>}
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
