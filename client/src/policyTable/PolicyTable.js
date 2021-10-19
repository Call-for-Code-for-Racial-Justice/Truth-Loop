import React from 'react'
import { useSelector } from 'react-redux'
import { Column, Grid, Row } from 'carbon-components-react'
import PolicyTableItem from './PolicyTableItem'
import PropTypes from 'prop-types'
const PolicyTable = ({ policies }) => {
  const { filters } = useSelector(({ appSettings }) => appSettings)
  const [filteredItems, setFilteredItems] = React.useState([])
  React.useEffect(() => {
    setFilteredItems([])
    runFiltering(policies, filters)
  }, [filters.location, filters.category])
  const renderEmptyPolicyTable = () => {
    return <div data-testid={'emptyPolicyTable'}>No Policies Available.</div>
  }
  const runFiltering = (items, filters) => {
    const tempArray = []
    if (filters) {
      items.map(
        (item) => (
          filters.location.map((state) => {
            if (
              item.geospatial_pertinence[0].short_name_ui == state ||
              item.geospatial_pertinence[1].short_name_ui == state
            ) {
              if (!tempArray.includes(item)) {
                tempArray.push(item)
              }
            }
          }),
          filters.category.map((cat) => {
            if (
              item.categories[0].name == cat ||
              item.categories[1].name == cat
            ) {
              if (!tempArray.includes(item)) {
                tempArray.push(item)
              }
            }
          })
        )
      )
      setFilteredItems(tempArray)
    }
  }
  const renderItem = (item, index) => {
    return (
      <Row key={item.id} data-testid={'policyItem'} className={'policy-row'}>
        <Column className={'policy-cell'}>
          <PolicyTableItem
            id={item.id}
            title={item.title}
            summary={item.summary}
            dateIntroduced={item.date_introduced}
            rowNumber={index}
          />
        </Column>
      </Row>
    )
  }

  if (!policies || !policies.length) {
    return renderEmptyPolicyTable()
  }
  return (
    <div data-testid={'policyTable'}>
      <Grid className={'policy-table'}>
        <Row className={'policy-title-row'}>
          <Column>{`POLICIES: (${
            filteredItems.length > 0 ? filteredItems.length : policies.length
          })`}</Column>
        </Row>
        {filteredItems.length > 0
          ? filteredItems.map(renderItem)
          : policies.map(renderItem)}
      </Grid>
    </div>
  )
}
PolicyTable.propTypes = {
  policies: PropTypes.array.isRequired,
}

export default PolicyTable
