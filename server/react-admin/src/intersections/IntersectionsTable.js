import React from 'react'
import PropTypes from 'prop-types'
import Typography from '@mui/material/Typography'
import Table from '@mui/material/Table'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import TableCell from '@mui/material/TableCell'
import TableBody from '@mui/material/TableBody'
import IconButton from '@mui/material/IconButton'
import DeleteIcon from '@mui/icons-material/Delete'
import TableContainer from '@mui/material/TableContainer'
import Toolbar from '@mui/material/Toolbar'
import AddIcon from '@mui/icons-material/Add'
import Button from '@mui/material/Button'
import Paper from '@mui/material/Paper'
import Grid from '@mui/material/Grid'

IntersectionsTable.propTypes = {
  headCells: PropTypes.array.isRequired,
  rows: PropTypes.array.isRequired,
  label: PropTypes.string.isRequired,
  onDelete: PropTypes.func,
}

function IntersectionsTable(props) {
  const { headCells, rows, label, onDelete } = props
  return (
    <>
      <Paper elevation={12} data-testid={`${label}IntersectionsTable`} sx={{ p: 2, mt: 2 }}>
        <Toolbar sx={{ pl: { sm: 2 }, pr: { xs: 1, sm: 1 } }} variant={'dense'}>
          <Typography
            variant="body1"
            data-testid={`${label}IntersectionsTableTitle`}
            component="h4"
          >
            {label}
          </Typography>
        </Toolbar>
        <TableContainer sx={{ mb: 2 }}>
          <Table size="small" aria-label={label} stickyHeader>
            {!rows || !rows.length ? (
              <caption data-testid={`${label}Caption`}>No intersections</caption>
            ) : null}
            <TableHead data-testid={`${label}HeaderRow`}>
              <TableRow>
                {headCells.map((headCell) => (
                  <TableCell key={headCell.id} align={'left'} padding={'normal'}>
                    {headCell.label}
                  </TableCell>
                ))}
                {!!onDelete && <TableCell padding={'none'} size={'normal'} />}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow
                  data-testid={`${label}Row`}
                  key={`${row.id}-row`}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  {headCells.map((headCell) => (
                    <TableCell key={`${row.id}_${headCell.id}`}>{row[headCell.id]}</TableCell>
                  ))}
                  {!!onDelete && (
                    <TableCell padding={'none'} size={'small'} align={'right'}>
                      <IconButton aria-label="delete" onClick={() => onDelete(row)} size={'small'}>
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  )}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Grid container spacing={2} justifyContent={'flex-end'}>
          <Grid item>
            <Button color={'secondary'} variant={'outlined'} href={''} startIcon={<AddIcon />}>
              Create Intersection
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </>
  )
}

export default IntersectionsTable
