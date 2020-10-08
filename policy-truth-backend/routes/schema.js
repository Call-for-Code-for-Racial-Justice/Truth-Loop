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
