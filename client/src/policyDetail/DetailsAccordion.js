import React from 'react'
import PropTypes from 'prop-types'
import { Accordion, AccordionItem } from 'carbon-components-react'
import { injectIntl } from 'react-intl'
import { messages } from '../nls/nlsUtility'
import RelatedPolicyDetails from './RelatedPolicyDetails'

const DetailsAccordion = ({
  summary,
  officialsAndSponsors,
  policyStatus,
  relatedPolicies,
  intl,
}) => {
  return (
    <Accordion>
      <AccordionItem title={intl.formatMessage(messages.detailsItemSummary)}>
        <p>{summary}</p>
      </AccordionItem>
      <AccordionItem title={intl.formatMessage(messages.detailsItemTitle)}>
        {officialsAndSponsors.length ? (
          officialsAndSponsors.map((official) => (
            <div key={official.id} data-testid={'officialsDetails'}>
              <p>
                {intl.formatMessage(messages.detailsTitle) + official.title}
              </p>
              <p>{intl.formatMessage(messages.detailsName) + official.name}</p>
              <p>
                {intl.formatMessage(messages.detailsEmail) +
                  official.email_address}
              </p>
              <p>
                {intl.formatMessage(messages.detailsPhone) +
                  official.phone_number}
              </p>
              <p>
                {intl.formatMessage(messages.detailsRole) +
                  official.role_in_artifact}
              </p>
            </div>
          ))
        ) : 
          <div>{intl.formatMessage(messages.detailsNoOfficials)}</div>
        }
      </AccordionItem>
      <AccordionItem title={intl.formatMessage(messages.detailsItemStatus)}>
        <p>{policyStatus}</p>
      </AccordionItem>
      <AccordionItem
        title={intl.formatMessage(messages.detailsItemRelatedPolicies)}
      >
        {relatedPolicies.length ? (
          relatedPolicies.map((relatedPolicy, index) => (
            <RelatedPolicyDetails
              key={`related-${relatedPolicy}-${index}`}
              policy={relatedPolicy.title}
              id={relatedPolicy.id}
            />
          ))
        ) : (
          <div>{intl.formatMessage(messages.detailsNoRelatedPolicies)}</div>
        )}
      </AccordionItem>
    </Accordion>
  )
}

DetailsAccordion.propTypes = {
  summary: PropTypes.string.isRequired,
  officialsAndSponsors: PropTypes.array.isRequired,
  policyStatus: PropTypes.string.isRequired,
  relatedPolicies: PropTypes.array.isRequired,
  intl: PropTypes.any.isRequired,
}
export default injectIntl(DetailsAccordion)
