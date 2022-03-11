import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import PropTypes from 'prop-types'
import AdminTable from '../AdminTable'
import Paper from '@mui/material/Paper'
import formatDate from '../formatDate'
import Button from '@mui/material/Button'
import AddIcon from '@mui/icons-material/Add'
import DeleteItemDialog from '../form/DeleteItemDialog'
import Snackbar from '@mui/material/Snackbar'

ArtifactTable.propTypes = {
  artifacts: PropTypes.array.isRequired,
  isLoading: PropTypes.bool,
}

const emptyTableCaption = 'No artifacts available'
const caption = 'The artifacts table shows a paginated list of all artifacts currently available'
const headCells = [
  { id: 'id', label: 'ID' },
  { id: 'title', label: 'Title' },
  { id: 'summary', label: 'Summary' },
  { id: 'link_to_full_text', label: 'Link To Full Text' },
  { id: 'date_introduced', label: 'Date Introduced' },
  { id: 'status', label: 'Status' },
  { id: 'created', label: 'Date Created' },
  { id: 'updated', label: 'Last updated' },
]

function ArtifactTable(props) {
  const history = useHistory()
  const [deleteError, setDeleteError] = useState('')
  const [itemToDelete, setItemToDelete] = useState(null)
  const [loadingArtifact, setLoadingArtifact] = useState(false)

  async function fetchFullArtifact(artifactId) {
    const fullArtifactResponse = await fetch(
      `/api/v1/legislativeArtifacts/fullDetail/${artifactId}`
    )
    return await fullArtifactResponse.json()
  }

  const handleCancelDelete = () => {
    setItemToDelete(null)
  }

  const handleCloseDeleteError = function () {
    setDeleteError('')
  }

  const handleDelete = async () => {
    const deleteArtifactsResponse = await fetch(`/api/v1/legislativeArtifacts/${itemToDelete.id}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    })
    if (deleteArtifactsResponse.ok) {
      setItemToDelete(null)
      history.go(0)
    } else {
      setItemToDelete(null)
      const errorText = await deleteArtifactsResponse.text()
      setDeleteError(errorText)
    }
  }

  return (
    <Paper data-testid={'ArtifactsTable'} elevation={12}>
      <AdminTable
        headCells={headCells}
        isLoading={props.isLoading || loadingArtifact}
        rows={props.artifacts.map((artifact) => ({
          id: artifact.id,
          title: artifact.title,
          summary: artifact.summary,
          link_to_full_text: artifact.link_to_full_text,
          date_introduced: formatDate(artifact.date_introduced),
          status: artifact.status,
          created: formatDate(artifact.created),
          updated: formatDate(artifact.updated),
        }))}
        caption={props.artifacts && props.artifacts.length ? caption : emptyTableCaption}
        tableLabel={'Artifacts'}
        onEditItem={async (item) => {
          setLoadingArtifact(true)
          const fullArtifact = await fetchFullArtifact(item.id)
          setLoadingArtifact(false)
          history.push(`/artifacts/edit/${item.id}`, { artifact: fullArtifact })
        }}
        onDeleteItem={(item) => {
          setItemToDelete(item)
        }}
        disableSearch={!(props.artifacts && props.artifacts.length)}
      />
      <Button
        sx={{ m: 2 }}
        variant={'text'}
        href={'/artifacts/add'}
        startIcon={<AddIcon />}
        disabled={props.isLoading || loadingArtifact}
      >
        Add Artifact
      </Button>
      <DeleteItemDialog
        title={'Delete Artifact?'}
        description={''}
        open={!!itemToDelete}
        handleCancel={handleCancelDelete}
        handleClose={handleCancelDelete}
        handleDelete={handleDelete}
      />
      <Snackbar
        open={!!deleteError}
        autoHideDuration={6000}
        onClose={handleCloseDeleteError}
        message={deleteError}
      />
    </Paper>
  )
}

export default ArtifactTable
