import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import Toolbar from '@mui/material/Toolbar'
import Tooltip from '@mui/material/Tooltip'
import TextField from '@mui/material/TextField'
import SearchIcon from '@mui/icons-material/Search'
import IconButton from '@mui/material/IconButton'
import ClearIcon from '@mui/icons-material/Clear'
import TableContainer from '@mui/material/TableContainer'
import Box from '@mui/material/Box'
import Table from '@mui/material/Table'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import TableCell from '@mui/material/TableCell'
import TableSortLabel from '@mui/material/TableSortLabel'
import { visuallyHidden } from '@mui/utils'
import TableBody from '@mui/material/TableBody'
import Add from '@mui/icons-material/Add'
import TablePagination from '@mui/material/TablePagination'

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

AddIntersectionsTable.propTypes = {
  headers: PropTypes.array.isRequired,
  onClose: PropTypes.func.isRequired,
  onAdd: PropTypes.func.isRequired,
  show: PropTypes.bool.isRequired,
  allAvailableItems: PropTypes.array.isRequired,
}

function AddIntersectionsTable(props) {
  const [searchText, setSearchText] = React.useState('')
  const [order, setOrder] = React.useState('asc')
  const [orderBy, setOrderBy] = React.useState('id')
  const [page, setPage] = React.useState(0)
  const [rowsPerPage, setRowsPerPage] = React.useState(10)
  const [filteredRows, setFilteredRows] = useState(props.allAvailableItems)

  const createSortHandler = (property) => (event) => {
    handleRequestSort(event, property)
  }

  const handleRequestSort = (event, property) => {
    const isAscending = orderBy === property && order === 'asc'
    setOrder(isAscending ? 'desc' : 'asc')
    setOrderBy(property)
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value)
    setPage(0)
  }

  const handleSearchRequest = function (searchRequestText) {
    setSearchText(searchRequestText)
    if (searchRequestText || searchRequestText === '') {
      const searchRegex = new RegExp(escapeRegExp(searchRequestText), 'i')
      const filtered = props.allAvailableItems.filter((row) => {
        return Object.keys(row).some((field) => {
          return row[field] && searchRegex.test(row[field].toString())
        })
      })
      setFilteredRows(filtered)
      setPage(0)
    }
  }

  useEffect(() => {
    setSearchText('')
    setFilteredRows(props.allAvailableItems)
    setPage(0)
  }, [props.allAvailableItems])

  return (
    <div>
      <Dialog open={props.show} onClose={props.onClose}>
        <DialogContent>
          <Toolbar sx={{ pl: { sm: 2 }, pr: { xs: 1, sm: 1 } }}>
            <Tooltip title="Search list">
              <TextField
                fullWidth
                disabled={!filteredRows || !filteredRows.length}
                variant="standard"
                value={searchText}
                onChange={(event) => handleSearchRequest(event.target.value)}
                placeholder="Search..."
                InputProps={{
                  startAdornment: <SearchIcon fontSize="small" />,
                  endAdornment: (
                    <IconButton
                      title="Clear"
                      aria-label="Clear"
                      style={{ visibility: searchText ? 'visible' : 'hidden' }}
                      onClick={() => handleSearchRequest('')}
                    >
                      <ClearIcon fontSize="small" />
                    </IconButton>
                  ),
                }}
              />
            </Tooltip>
          </Toolbar>
          <TableContainer sx={{ maxHeight: 600 }}>
            <Table size="small" aria-label={'addIntersectionsTable'} stickyHeader>
              <TableHead>
                <TableRow>
                  {props.headers.map((headCell) => (
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
                        {orderBy === headCell.id ? (
                          <Box component="span" sx={visuallyHidden}>
                            {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                          </Box>
                        ) : null}
                      </TableSortLabel>
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredRows &&
                  filteredRows
                    .slice()
                    .sort(getComparator(order, orderBy))
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => (
                      <TableRow
                        key={`${row.id}-row`}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                      >
                        {props.headers.map((headCell) => (
                          <TableCell key={`${row.id}_${headCell.id}`}>{row[headCell.id]}</TableCell>
                        ))}
                        <TableCell padding={'none'} size={'small'}>
                          <IconButton
                            aria-label="edit"
                            onClick={() => props.onAdd(row)}
                            size={'small'}
                          >
                            <Add />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
              </TableBody>
            </Table>
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
        </DialogContent>
        <DialogActions>
          <Button onClick={props.onClose}>Done</Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default AddIntersectionsTable
