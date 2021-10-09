import React from 'react'
import PropTypes from 'prop-types'

PublicationTable.propTypes = {
  publications: PropTypes.array,
}

const renderTable = (publications) => (
  <div>
    <div data-testid={'publicationsTableHeaderRow'}/>
    {publications.map((publication) => (
      <div data-testid={'publicationItem'} key={publication.id}>hello</div>
    ))}
  </div>
)

const renderEmpty = () => (
  <div data-testid={'emptyPublications'}>No publications available</div>
)

function PublicationTable({publications}) {
  return (
    <>
      {publications && publications.length ? renderTable(publications) : renderEmpty()}
    </>
  )
}

export default PublicationTable
