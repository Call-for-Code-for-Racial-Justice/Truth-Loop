import React, {useState, useEffect} from 'react'
import PropTypes from 'prop-types'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import TableContainer from '@mui/material/TableContainer'
import Table from '@mui/material/Table'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import TableCell from '@mui/material/TableCell'
import TablePagination from '@mui/material/TablePagination'
import TableSortLabel from '@mui/material/TableSortLabel'
import {visuallyHidden} from '@mui/utils'
import TableBody from '@mui/material/TableBody'
import AdminTableToolbar from './AdminTableToolbar'
import LinearProgress from '@mui/material/LinearProgress'
import Typography from '@mui/material/Typography'

AdminTable.propTypes = {
  headCells: PropTypes.array.isRequired,
  rows: PropTypes.array.isRequired,
  caption: PropTypes.string.isRequired,
  tableLabel: PropTypes.string.isRequired,
  onEditItem: PropTypes.func,
  onDeleteItem: PropTypes.func,
  disableSearch: PropTypes.bool,
  isLoading: PropTypes.bool,
}

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1
  }
  if (b[orderBy] > a[orderBy]) {
    return 1
  }
  return 0
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy)
}

function escapeRegExp(value) {
  return value.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&')
}

function AdminTable(props) {

  const {headCells, rows, caption, tableLabel, onEditItem, onDeleteItem, disableSearch, isLoading} = props
  const [order, setOrder] = React.useState('asc')
  const [orderBy, setOrderBy] = React.useState('id')
  const [page, setPage] = React.useState(0)
  const [rowsPerPage, setRowsPerPage] = React.useState(10)
  const [filteredRows, setFilteredRows] = useState(rows)

  const createSortHandler = (property) => (event) => {
    handleRequestSort(event, property)
  }

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc'
    setOrder(isAsc ? 'desc' : 'asc')
    setOrderBy(property)
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value)
    setPage(0)
  }

  const handleSearchRequest = function (searchText) {
    if (searchText || searchText === '') {
      const searchRegex = new RegExp(escapeRegExp(searchText), 'i')
      const filtered = rows.filter((row) => {
        return Object.keys(row).some((field) => {
          return searchRegex.test(row[field].toString())
        })
      })
      setFilteredRows(filtered)
      setPage(0)
    }
  }

  useEffect(() => {
    setFilteredRows(rows)
    setPage(0)
  }, [setPage, setFilteredRows, rows])

  return (
    <>
      <AdminTableToolbar handleSearchRequest={handleSearchRequest} toolbarTitle={tableLabel} disabled={disableSearch}/>

      <TableContainer sx={{maxHeight: 600}}>
        { isLoading ?
          <Box component={'span'} sx={{ p: 2 }}>
            <Typography component={'h3'} variant={'overline'} sx={{ p: 2 }}>Loading {tableLabel} ...</Typography>
            <LinearProgress color="secondary" />
          </Box>
          :
          <Table size="small" aria-label={tableLabel} stickyHeader>
            <caption data-testid={`${tableLabel}Caption`}>{caption}</caption>
            <TableHead data-testid={`${tableLabel}HeaderRow`}>
              <TableRow>
                {headCells.map((headCell) => (
                  <TableCell
                    key={headCell.id}
                    align={'left'}
                    padding={'normal'}
                    sortDirection={orderBy === headCell.id ? order : false}
                  >
                    <TableSortLabel
                      active={orderBy === headCell.id}
                      direction={orderBy === headCell.id ? order : 'asc'}
                      onClick={createSortHandler(headCell.id)}
                    >
                      {headCell.label}
                      {orderBy === headCell.id ? (<Box component="span" sx={visuallyHidden}>
                          {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                        </Box>) : null}
                    </TableSortLabel>
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>

            <TableBody>
              {filteredRows.slice().sort(getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => (<TableRow data-testid={`${tableLabel}Row`}
                    key={`${row.id}-row`}
                    sx={{'&:last-child td, &:last-child th': {border: 0}}}
                  >
                    {headCells.map(headCell => (
                      <TableCell key={`${row.id}_${headCell.id}`}>{row[headCell.id]}</TableCell>
                    ))}
                    {!!onEditItem && <TableCell padding={'none'} size={'small'}>
                      <IconButton aria-label="edit" onClick={() => onEditItem(row)} size={'small'}>
                        <EditIcon />
                      </IconButton>
                    </TableCell>}
                    {!!onDeleteItem && <TableCell padding={'none'} size={'small'}>
                      <IconButton aria-label="delete" onClick={() => onDeleteItem(row)} size={'small'}>
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>}
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        }
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={filteredRows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </>
  )
}

export default AdminTable
