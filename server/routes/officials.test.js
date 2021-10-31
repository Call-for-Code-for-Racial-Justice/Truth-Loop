const request = require('supertest')
const app = require('../app')

describe('CRUD TESTS FOR /api/v1/officials', function () {
  let payload = {
    name: `Test Name Date ${Date.now()} Randy ${Math.random()}`,
    title: `Test Title Date ${Date.now()} Randy ${Math.random()}`,
  }
  let updatedTitle = `Test ***Updated*** Title Date ${Date.now()} Randy ${Math.random()}`
  let id
  let updatedPayload = { ...payload, title: updatedTitle }

  it('Make sure the random titles do not match', async () => {
    expect(payload.title).not.toEqual(updatedTitle)
  })

  it('GET should not have the item.', async () => {
    let res = await request(app)
      .get('/api/v1/officials')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
    expect(res.status).toBe(200)
    expect(res.body).not.toEqual(
      // NOT!!!
      expect.arrayContaining([expect.objectContaining(payload)])
    )
  })

  it('POST creates the item', async () => {
    let res = await request(app)
      .post('/api/v1/officials')
      .set('Accept', 'application/json')
      .send(payload)
      .expect('Content-Type', /json/)
      .expect(201)

    expect(res.status).toBe(201)

    // Save the ID for later
    id = res.body.id
  })

  it('GET should now include the item', async () => {
    let res = await request(app)
      .get('/api/v1/officials')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
    expect(res.status).toBe(200)
    expect(res.body).toEqual(
      expect.arrayContaining([expect.objectContaining(payload)])
    )
  })

  it('GET by ID should return item', async () => {
    let res = await request(app)
      .get(`/api/v1/officials/${id}`)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
    expect(res.status).toBe(200)
    expect(res.body).toEqual(expect.objectContaining(payload))
  })

  it('PUT by ID to change the title', async () => {
    updatedPayload = { ...payload, title: updatedTitle }

    expect(payload).not.toEqual(updatedPayload)

    let res = await request(app)
      .put(`/api/v1/officials/${id}`)
      .set('Accept', 'application/json')
      .send(updatedPayload)
      .expect('Content-Type', /json/)
      .expect(200)

    expect(res.status).toBe(200)
  })

  it('GET by ID should return ***UPDATED*** item', async () => {
    let res = await request(app)
      .get(`/api/v1/officials/${id}`)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
    expect(res.status).toBe(200)
    expect(res.body).toEqual(expect.objectContaining(updatedPayload))
  })

  it('DELETE by ID should succeed', async () => {
    let res = await request(app)
      .delete(`/api/v1/officials/${id}`)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
    expect(res.status).toBe(200)
  })

  it('GET by ID should NOT find an item', async () => {
    let res = await request(app)
      .get(`/api/v1/officials/${id}`)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
    expect(res.status).toBe(404)
    expect(res.body).toEqual({ error: 'Not Found' })
  })
})
