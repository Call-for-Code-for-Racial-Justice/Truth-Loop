import React from 'react'
import PropTypes from 'prop-types'
import Typography from '@mui/material/Typography'
import IntersectionsTable from '../intersections/IntersectionsTable'
import * as artifactIntersectionHeaders from './artifactIntersectionHeaders'

ArtifactIntersections.propTypes = {
  artifact: PropTypes.shape({
    id: PropTypes.number.isRequired,
    advocacy_groups: PropTypes.array.isRequired,
    categories: PropTypes.array.isRequired,
    geospatial_pertinence: PropTypes.array.isRequired,
    officials: PropTypes.array.isRequired,
    publications: PropTypes.array.isRequired,
    video_testimonials: PropTypes.array.isRequired,
    related: PropTypes.array.isRequired,
  }).isRequired,
  reloadArtifact: PropTypes.func.isRequired,
}

function ArtifactIntersections({ artifact, reloadArtifact }) {
  return (
    <>
      <Typography component={'h2'} variant={'h6'} mt={4}>
        Add/Remove Artifact Intersections
      </Typography>
      <IntersectionsTable
        headCells={artifactIntersectionHeaders.advocacyGroupHeadCells}
        rows={artifact.advocacy_groups}
        label={'Advocacy Groups'}
        reloadArtifact={reloadArtifact}
        artifactId={artifact.id}
        intersectionUrl={'/api/v1/adminIntersections/advocacyGroup'}
        itemsUrl={'/api/v1/advocacyGroups'}
        itemHeaders={[
          { id: 'name', label: 'Name' },
          { id: 'description', label: 'Description' },
        ]}
      />
      <IntersectionsTable
        headCells={artifactIntersectionHeaders.categoryHeadCells}
        rows={artifact.categories}
        label={'Categories'}
        reloadArtifact={reloadArtifact}
        artifactId={artifact.id}
        intersectionUrl={'/api/v1/adminIntersections/category'}
        itemsUrl={'/api/v1//categories'}
        itemHeaders={[
          { id: 'name', label: 'Name' },
          { id: 'description', label: 'Description' },
        ]}
      />
      <IntersectionsTable
        headCells={artifactIntersectionHeaders.geographyHeadCells}
        rows={artifact.geospatial_pertinence}
        label={'Geographies'}
        reloadArtifact={reloadArtifact}
        artifactId={artifact.id}
        intersectionUrl={'/api/v1/adminIntersections/geospatialDefinition'}
        itemsUrl={'/api/v1//geospatialDefinitions'}
        itemHeaders={[
          { id: 'short_name_ui', label: 'Short Name' },
          { id: 'description', label: 'Description' },
        ]}
      />
      <IntersectionsTable
        headCells={artifactIntersectionHeaders.officialHeadCells}
        rows={artifact.officials}
        label={'Officials'}
        reloadArtifact={reloadArtifact}
        artifactId={artifact.id}
        intersectionUrl={'/api/v1/adminIntersections/official'}
        itemsUrl={'/api/v1//officials'}
        itemHeaders={[
          { id: 'name', label: 'Name' },
          { id: 'title', label: 'Title' },
        ]}
      />
      <IntersectionsTable
        headCells={artifactIntersectionHeaders.publicationHeadCells}
        rows={artifact.publications}
        label={'Publications'}
        reloadArtifact={reloadArtifact}
        artifactId={artifact.id}
        intersectionUrl={'/api/v1/adminIntersections/publication'}
        itemsUrl={'/api/v1//publications'}
        itemHeaders={[
          { id: 'title', label: 'Title' },
          { id: 'description', label: 'Description' },
        ]}
      />
      <IntersectionsTable
        headCells={artifactIntersectionHeaders.testimonialHeadCells}
        rows={artifact.video_testimonials}
        label={'Testimonials'}
        reloadArtifact={reloadArtifact}
        artifactId={artifact.id}
        intersectionUrl={'/api/v1/adminIntersections/videoTestimonial'}
        itemsUrl={'/api/v1//videoTestimonials'}
        itemHeaders={[
          { id: 'subject', label: 'Subject' },
          { id: 'comment', label: 'Comment' },
        ]}
      />
      <IntersectionsTable
        headCells={artifactIntersectionHeaders.relatedArtifactHeadCells}
        rows={artifact.related}
        label={'Related Artifacts'}
        reloadArtifact={reloadArtifact}
        artifactId={artifact.id}
        intersectionUrl={'/api/v1/adminIntersections/relatedArtifact'}
        itemsUrl={'/api/v1//legislativeArtifacts'}
        itemHeaders={[
          { id: 'title', label: 'Title' },
          { id: 'summary', label: 'Summary' },
        ]}
      />
    </>
  )
}

export default ArtifactIntersections
