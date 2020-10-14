//////////////////////////////////////////// OpenAPI Schema Objects ////////////////////////////////////////////

/**
 * @schema IdOfCreatedObject
 * description: the returned ID of a successfully created object
 * type: object
 * properties:
 *   id:
 *     type: integer
 */

/**
 * @schema ConfirmationOfSuccess
 * description: confirmation that the last operation was successful
 * type: object
 * properties:
 *   ok:
 *     type: boolean
 */

/**
 * @schema Category
 * description: A Category describes an aspect of a legislative artifact by which users can filter a search
 * type: object
 * properties:
 *   id:
 *     type: integer
 *     readOnly: true
 *   name:
 *     type: string
 *   description:
 *     type: string
 *   created:
 *     type: string
 *     readOnly: true
 *     format: date-time
 *     description: date-time object first created
 *   updated:
 *     type: string
 *     readOnly: true
 *     format: date-time
 *     description: date-time object last updated
 * required:
 *   - name
 */

/**
 * @schema GeospatialDefinition
 * description: A Geospatial Definition defines a region to which a legislative artifact pertains (postal code, county, state, city, township, etc.)
 * type: object
 * properties:
 *   id:
 *     type: integer
 *     readOnly: true
 *   name:
 *     type: string
 *   short_name_ui:
 *     type: string
 *   description:
 *     type: string
 *   created:
 *     type: string
 *     readOnly: true
 *     format: date-time
 *     description: date-time object first created
 *   updated:
 *     type: string
 *     readOnly: true
 *     format: date-time
 *     description: date-time object last updated
 * required:
 *   - name
 *   - short_name_ui
 */

/**
 * @schema Official
 * description: An Official defines a lawmaker, legislator, policymaker or other official responsible in some way for the presence of a given legislative artifact
 * type: object
 * properties:
 *   id:
 *     type: integer
 *     readOnly: true
 *   name:
 *     type: string
 *   title:
 *     type: string
 *   email_address:
 *     type: string
 *   phone_number:
 *     type: string
 *   website_url:
 *     type: string
 *   created:
 *     type: string
 *     readOnly: true
 *     format: date-time
 *     description: date-time object first created
 *   updated:
 *     type: string
 *     readOnly: true
 *     format: date-time
 *     description: date-time object last updated
 * required:
 *   - name
 *   - title
 */

/**
 * @schema OfficialWithIntersectionData
 * description: An Official with intersection decorations of role_in_artifact and show_in_list
 * type: object
 * properties:
 *   id:
 *     type: integer
 *     readOnly: true
 *   name:
 *     type: string
 *   title:
 *     type: string
 *   email_address:
 *     type: string
 *   phone_number:
 *     type: string
 *   website_url:
 *     type: string
 *   role_in_artifact:
 *     type: string
 *     description: the role the Official plays in the existence of the Legislative Artifact
 *   show_in_list:
 *     type: boolean
 *     description: flag (default false) indicating whether this official should be the one shown in the list view of artifacts (should only be one per artifact)
 *   created:
 *     type: string
 *     readOnly: true
 *     format: date-time
 *     description: date-time object first created
 *   updated:
 *     type: string
 *     readOnly: true
 *     format: date-time
 *     description: date-time object last updated
 * required:
 *   - name
 *   - title
 */

/**
 * @schema AdvocacyGroup
 * description: An Advocacy Group defines a human collective supporting and monitoring some aspect of one or more legal artifacts
 * type: object
 * properties:
 *   id:
 *     type: integer
 *     readOnly: true
 *   name:
 *     type: string
 *   description:
 *     type: string
 *   email_address:
 *     type: string
 *   phone_number:
 *     type: string
 *   website_url:
 *     type: string
 *   created:
 *     type: string
 *     readOnly: true
 *     format: date-time
 *     description: date-time object first created
 *   updated:
 *     type: string
 *     readOnly: true
 *     format: date-time
 *     description: date-time object last updated
 * required:
 *   - name
 *   - description
 */

/**
 * @schema Publication
 * description: A Publication defines any information source (article, book, web site, podcast, blog, etc) that is relevant to understanding a given legislative artifact
 * type: object
 * properties:
 *   id:
 *     type: integer
 *     readOnly: true
 *   title:
 *     type: string
 *   description:
 *     type: string
 *   link:
 *     type: string
 *   created:
 *     type: string
 *     readOnly: true
 *     format: date-time
 *     description: date-time object first created
 *   updated:
 *     type: string
 *     readOnly: true
 *     format: date-time
 *     description: date-time object last updated
 * required:
 *   - title
 *   - description
 *   - link
 */

/**
 * @schema VideoTestimonial
 * description: A Video Testimonial defines the metadata stored in the application data store regarding the actual recorded video in the CMS
 * type: object
 * properties:
 *   id:
 *     type: integer
 *     readOnly: true
 *   subject:
 *     type: string
 *   comment:
 *     type: string
 *   video_cms_id:
 *     type: string
 *   privacy_stmt_ack:
 *     type: boolean
 *     description: indicates user had acknowledged privacy notice prior to submitting video
 *   created:
 *     type: string
 *     readOnly: true
 *     format: date-time
 *     description: date-time object first created
 *   updated:
 *     type: string
 *     readOnly: true
 *     format: date-time
 *     description: date-time object last updated
 * required:
 *   - subject
 *   - video_cms_id
 *   - privacy_stmt_ack
 */

/**
 * @schema Level
 * description: A Level describes the political level in which a legislative artifact is being created or examined
 * type: object
 * properties:
 *   id:
 *     type: integer
 *     readOnly: true
 *   name:
 *     type: string
 *   description:
 *     type: string
 *   created:
 *     type: string
 *     readOnly: true
 *     format: date-time
 *     description: date-time object first created
 *   updated:
 *     type: string
 *     readOnly: true
 *     format: date-time
 *     description: date-time object last updated
 * required:
 *   - name
 */

/**
 * @schema LegislativeArtifact
 * description: A Legislative Artifact is the central entity in the platform, and represents a policy, law, bill, act, regulation or other legal action the platform adopter should wish to publish
 * type: object
 * properties:
 *   id:
 *     type: integer
 *     readOnly: true
 *   title:
 *     type: string
 *   summary:
 *     type: string
 *   link_to_full_text:
 *     type: string
 *   date_introduced:
 *     type: string
 *     format: date-time
 *     description: date the artifact was introduced to the legal/political system in which it resides
 *   status:
 *     type: string
 *   video_cms_channel_id:
 *     type: string
 *   created:
 *     type: string
 *     readOnly: true
 *     format: date-time
 *     description: date-time object first created
 *   updated:
 *     type: string
 *     readOnly: true
 *     format: date-time
 *     description: date-time object last updated
 * required:
 *   - title
 *   - summary
 */

/**
 * @schema RelatedArtifact
 * description: A very minimal version of an artifact used as a reference in a _like_ relationship
 * type: object
 * properties:
 *   id:
 *     type: integer
 *     readOnly: true
 *   title:
 *     type: string
 */

/**
 * @schema LegislativeArtifactMinDetail
 * description: A Legislative Artifact Min Detail is a minimally composite version of the artifact, including categories and geo defs
 * type: object
 * properties:
 *   id:
 *     type: integer
 *     readOnly: true
 *   title:
 *     type: string
 *   summary:
 *     type: string
 *   link_to_full_text:
 *     type: string
 *   date_introduced:
 *     type: string
 *     format: date-time
 *     description: date the artifact was introduced to the legal/political system in which it resides
 *   status:
 *     type: string
 *   video_cms_channel_id:
 *     type: string
 *   level:
 *     type: string
 *   primary_official_name:
 *     type: string
 *   categories:
 *     type: array
 *     items:
 *       $ref: '#/components/schemas/Category'
 *   geospatial_pertinence:
 *     type: array
 *     items:
 *       $ref: '#/components/schemas/GeospatialDefinition'
 *   created:
 *     type: string
 *     readOnly: true
 *     format: date-time
 *     description: date-time object first created
 *   updated:
 *     type: string
 *     readOnly: true
 *     format: date-time
 *     description: date-time object last updated
 * required:
 *   - title
 *   - summary
 */

/**
 * @schema LegislativeArtifactFullDetail
 * description: A Legislative Artifact Full Detail is a composite version of the artifact, including all reference data
 * type: object
 * properties:
 *   id:
 *     type: integer
 *     readOnly: true
 *   title:
 *     type: string
 *   summary:
 *     type: string
 *   link_to_full_text:
 *     type: string
 *   date_introduced:
 *     type: string
 *     format: date-time
 *     description: date the artifact was introduced to the legal/political system in which it resides
 *   status:
 *     type: string
 *   video_cms_channel_id:
 *     type: string
 *   level:
 *     type: string
 *   primary_official_name:
 *     type: string
 *   categories:
 *     type: array
 *     items:
 *       $ref: '#/components/schemas/Category'
 *   geospatial_pertinence:
 *     type: array
 *     items:
 *       $ref: '#/components/schemas/GeospatialDefinition'
 *   officials:
 *     type: array
 *     items:
 *       $ref: '#/components/schemas/OfficialWithIntersectionData'
 *   publications:
 *     type: array
 *     items:
 *       $ref: '#/components/schemas/Publication'
 *   advocacy_groups:
 *     type: array
 *     items:
 *       $ref: '#/components/schemas/AdvocacyGroup'
 *   video_testimonials:
 *     type: array
 *     items:
 *       $ref: '#/components/schemas/VideoTestimonial'
 *   related:
 *     type: array
 *     items:
 *       $ref: '#/components/schemas/RelatedArtifact'
 *   created:
 *     type: string
 *     readOnly: true
 *     format: date-time
 *     description: date-time object first created
 *   updated:
 *     type: string
 *     readOnly: true
 *     format: date-time
 *     description: date-time object last updated
 * required:
 *   - title
 *   - summary
 */

/**
 * @schema ArtifactOfficialIntersection
 * description: A decorated intersection between artifact and official, including role and a boolean indicating whether this official is the one to be shown in the list
 * type: object
 * properties:
 *   artifact_id:
 *     type: integer
 *     description: ID of the Legislative Artifact
 *   official_id:
 *     type: integer
 *     description: ID of the Official
 *   role_in_artifact:
 *     type: string
 *     description: the role the Official plays in the existence of the Legislative Artifact
 *   show_in_list:
 *     type: boolean
 *     description: flag (default false) indicating whether this official should be the one shown in the list view of artifacts (should only be one per artifact)
 * required:
 *   - artifact_id
 *   - official_id
 *   - role_in_artifact
 *   - show_in_list
 */

