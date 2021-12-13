import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import LinearProgress from '@mui/material/LinearProgress'
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
import Snackbar from '@mui/material/Snackbar'
import AddIntersectionsTable from './AddIntersectionsTable'

IntersectionsTable.propTypes = {
  headCells: PropTypes.array.isRequired,
  rows: PropTypes.array.isRequired,
  label: PropTypes.string.isRequired,
  isLoading: PropTypes.bool,
  artifactId: PropTypes.number.isRequired,
  reloadArtifact: PropTypes.func.isRequired,
  intersectionUrl: PropTypes.string.isRequired,
  itemsUrl: PropTypes.string.isRequired,
  itemHeaders: PropTypes.array.isRequired,
}

function IntersectionsTable(props) {
  const { headCells, rows, label } = props
  const [errorText, setErrorText] = useState('')
  const [showAvailableIntersections, setShowAvailableIntersections] = useState(false)
  const [allAvailableItems, setAllAvailableItems] = useState([])

  const handleCloseError = async () => setErrorText('')
  const addIntersections = () => setShowAvailableIntersections(true)
  const handleAdd = async (rowToAdd) => {
    let body, url
    if (props.label === 'Officials') {
      url = `${props.intersectionUrl}`
      body = {
        artifact_id: props.artifactId,
        official_id: rowToAdd.id,
        role_in_artifact: 'sponsor', // TODO:
        show_in_list: false, // TODO: There can only be one true!!!
      }
    } else {
      url = `${props.intersectionUrl}/${props.artifactId}/${rowToAdd.id}`
      body = {}
    }
    const addArtifactIntersectionsResponse = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })
    if (addArtifactIntersectionsResponse.ok) {
      props.reloadArtifact()
    } else {
      const errorResponseText = await addArtifactIntersectionsResponse.text()
      setErrorText(errorResponseText)
    }
  }
  const handleDelete = async (itemToRemove) => {
    setErrorText('')
    const deleteArtifactIntersectionUrl = `${props.intersectionUrl}/${props.artifactId}/${itemToRemove.id}`
    const deleteArtifactIntersectionResponse = await fetch(deleteArtifactIntersectionUrl, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    })
    if (deleteArtifactIntersectionResponse.ok) {
      props.reloadArtifact()
    } else {
      const errorResponseText = await deleteArtifactIntersectionResponse.text()
      setErrorText(errorResponseText)
    }
  }

  useEffect(() => {
    const loadItems = async () => {
      const response = await fetch(props.itemsUrl)
      const responseJson = await response.json()

      const allItems = responseJson.filter((item) => {
        return !rows.some((intersectedItem) => {
          return intersectedItem.id === item.id
        })
      })
      setAllAvailableItems(allItems)
    }
    loadItems()
  }, [rows, props.itemsUrl])

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
          {props.isLoading ? (
            <Box component={'span'} sx={{ p: 2 }}>
              <Typography component={'h3'} variant={'overline'} sx={{ p: 2 }}>
                Loading {label} ...
              </Typography>
              <LinearProgress color="secondary" />
            </Box>
          ) : (
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
                  <TableCell padding={'none'} size={'small'} />
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
                    <TableCell padding={'none'} size={'small'} align={'right'}>
                      <IconButton
                        aria-label="delete"
                        onClick={() => handleDelete(row)}
                        size={'small'}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </TableContainer>
        <Grid container spacing={2} justifyContent={'flex-end'}>
          <Grid item>
            <Button
              color={'secondary'}
              variant={'outlined'}
              href={''}
              startIcon={<AddIcon />}
              onClick={addIntersections}
            >
              Add
            </Button>
          </Grid>
        </Grid>
      </Paper>
      <Snackbar
        open={!!errorText}
        autoHideDuration={6000}
        onClose={handleCloseError}
        message={errorText}
      />

      <AddIntersectionsTable
        headers={props.itemHeaders}
        alreadyIntersected={rows}
        onClose={() => setShowAvailableIntersections(false)}
        onAdd={handleAdd}
        show={showAvailableIntersections}
        allAvailableItems={allAvailableItems}
      />
    </>
  )
}

export default IntersectionsTable
