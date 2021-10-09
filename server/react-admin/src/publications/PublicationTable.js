import React from 'react'
import PropTypes from 'prop-types'
import {
  DataTable,
  Table,
  TableHead,
  TableRow,
  TableHeader,
  TableBody,
  TableCell,
} from 'carbon-components-react'

const headers = [
  {
    key: 'id',
    header: 'ID',
  },
  {
    key: 'title',
    header: 'Title',
  },
  {
    key: 'description',
    header: 'Description',
  },
  {
    key: 'created',
    header: 'Date Created',
  },
  {
    key: 'updated',
    header: 'Last Updated',
  },
  {
    key: 'actions',
    header: 'Actions',
  },
]
PublicationTable.propTypes = {
  publications: PropTypes.array,
}
const renderTable = (publications) => (
  <div data-testid={'publicationTable'}>
    <DataTable rows={publications} headers={headers}>
      {({ rows, headers, getTableProps, getHeaderProps, getRowProps }) => (
        <Table {...getTableProps()}>
          <TableHead data-testid={'publicationsTableHeaderRow'}>
            <TableRow>
              {headers.map((header, index) => (
                <TableHeader key={index} {...getHeaderProps({ header })}>
                  {header.header}
                </TableHeader>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.id} {...getRowProps({ row })} data-testid={'publicationItem'} >
                {row.cells.map((cell) => (
                  <TableCell key={cell.id}>{cell.value}</TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </DataTable>
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
