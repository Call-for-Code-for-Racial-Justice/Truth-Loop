import React from 'react'
import {useSelector} from 'react-redux'

const PolicyTable = () => {
  const { items } = useSelector(({policyList}) => policyList)
  const renderEmptyPolicyTable = () => {
    return (
      <div data-testid={'emptyPolicyTable'}>
        No Policies Available.
      </div>
    )
  }
  const renderItem = item => {
    return (
      <div data-testid={'policyItem'} key={item.id}>Item</div>
    )
  }

  if (!items || !items.length) {
    return renderEmptyPolicyTable()
  }
  return (
    <div data-testid={'policyTable'}>
      {items.map(renderItem)}
    </div>
  )
}

export default PolicyTable