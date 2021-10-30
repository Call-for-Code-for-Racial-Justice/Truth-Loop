const request = require('supertest')
const app = require('../app')

describe('CRUD TESTS FOR /api/v1/videoTestimonials', function () {
  let payload = {
    subject: `Test Name Date ${Date.now()} Randy ${Math.random()}`,
    video_cms_id: `Test VideoCmsId Date ${Date.now()} Randy ${Math.random()}`,
    privacy_stmt_ack: true,
  }
  let updatedSubject = `Test ***Updated*** Desc Date ${Date.now()} Randy ${Math.random()}`
  let id
  let itemById
  let updatedPayload = { ...payload, subject: updatedSubject }

  it('Make sure the random subjects do not match', async (done) => {
    expect(payload.subject).not.toEqual(updatedSubject)
    done()
  })

  it('GET should not have the item.', async (done) => {
    let res = await request(app)
      .get('/api/v1/videoTestimonials')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
    expect(res.status).toBe(200)
    expect(res.body).not.toEqual(
      // NOT!!!
      expect.arrayContaining([expect.objectContaining(payload)])
    )
    done()
  })

  it('POST creates the item', async (done) => {
    let res = await request(app)
      .post('/api/v1/videoTestimonials')
      .set('Accept', 'application/json')
      .send(payload)
      .expect('Content-Type', /json/)
      .expect(201)

    expect(res.status).toBe(201)

    // Save the ID for later
    id = res.body.id
    done()
  })

  it('GET should now include the item', async (done) => {
    let res = await request(app)
      .get('/api/v1/videoTestimonials')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
    expect(res.status).toBe(200)
    expect(res.body).toEqual(
      expect.arrayContaining([expect.objectContaining(payload)])
    )
    done()
  })

  it('GET by ID should return item', async (done) => {
    let res = await request(app)
      .get(`/api/v1/videoTestimonials/${id}`)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
    expect(res.status).toBe(200)
    expect(res.body).toEqual(expect.objectContaining(payload))
    itemById = res.body
    done()
  })

  it('PUT by ID to change the subject', async (done) => {
    updatedPayload = { ...payload, subject: updatedSubject }

    expect(payload).not.toEqual(updatedPayload)

    let res = await request(app)
      .put(`/api/v1/videoTestimonials/${id}`)
      .set('Accept', 'application/json')
      .send(updatedPayload)
      .expect('Content-Type', /json/)
      .expect(200)

    expect(res.status).toBe(200)
    done()
  })

  it('GET by ID should return ***UPDATED*** item', async (done) => {
    let res = await request(app)
      .get(`/api/v1/videoTestimonials/${id}`)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
    expect(res.status).toBe(200)
    expect(res.body).toEqual(expect.objectContaining(updatedPayload))
    done()
  })

  it('DELETE by ID should succeed', async (done) => {
    let res = await request(app)
      .delete(`/api/v1/videoTestimonials/${id}`)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
    expect(res.status).toBe(200)
    done()
  })

  it('GET by ID should NOT find an item', async (done) => {
    let res = await request(app)
      .get(`/api/v1/videoTestimonials/${id}`)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
    expect(res.status).toBe(404)
    expect(res.body).toEqual({ error: 'Not Found' })
    done()
  })
})
