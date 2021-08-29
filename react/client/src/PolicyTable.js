import React from 'react'
import {useSelector} from 'react-redux'
import {Column, Grid, Row} from 'carbon-components-react'
import PolicyTableItem from './PolicyTableItem'

const PolicyTable = () => {
  const { items } = useSelector(({policyList}) => policyList)

  const renderEmptyPolicyTable = () => {
    return (
      <div data-testid={'emptyPolicyTable'}>
        No Policies Available.
      </div>
    )
  }

  const renderItem = (item, index) => {
    return (
      <Row key={item.id} data-testid={'policyItem'} className={'policy-row'}>
        <Column className={'policy-cell'}>
          <PolicyTableItem title={item.title} summary={item.summary} dateIntroduced={item.date_introduced} rowNumber={index}/>
        </Column>
      </Row>
    )
  }

  if (!items || !items.length) {
    return renderEmptyPolicyTable()
  }
  return (
    <div data-testid={'policyTable'}>
      <Grid className={'policy-table'}>
        <Row className={'policy-title-row'}>
          <Column>{`POLICIES: (${items.length})`}</Column>
        </Row>
        {items.map(renderItem)}
      </Grid>
    </div>
  )
}

export default PolicyTable