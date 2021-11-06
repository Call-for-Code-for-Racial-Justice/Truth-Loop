const request = require('supertest')
const app = require('../app')

describe('CRUD TESTS FOR /api/v1/publications', function () {
  let payload = {
    title: `Test Title Date ${Date.now()} Randy ${Math.random()}`,
    description: `Test Description Date ${Date.now()} Randy ${Math.random()}`,
    link: `Test Link Date ${Date.now()} Randy ${Math.random()}`,
  }
  let updatedDescription = `Test ***Updated*** Desc Date ${Date.now()} Randy ${Math.random()}`
  let id
  let updatedPayload = { ...payload, description: updatedDescription }

  it('Make sure the random descriptions do not match', async () => {
    expect(payload.description).not.toEqual(updatedDescription)
  })

  it('GET should not have the item.', async () => {
    let res = await request(app)
      .get('/api/v1/publications')
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
      .post('/api/v1/publications')
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
      .get('/api/v1/publications')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
    expect(res.status).toBe(200)
    expect(res.body).toEqual(
      expect.arrayContaining([expect.objectContaining(payload)])
    )
  })

  it('GET by ID should return item', async () => {
    let res = await request(app)
      .get(`/api/v1/publications/${id}`)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
    expect(res.status).toBe(200)
    expect(res.body).toEqual(expect.objectContaining(payload))
    itemById = res.body
  })

  it('PUT by ID to change the description', async () => {
    updatedPayload = { ...payload, description: updatedDescription }

    expect(payload).not.toEqual(updatedPayload)

    let res = await request(app)
      .put(`/api/v1/publications/${id}`)
      .set('Accept', 'application/json')
      .send(updatedPayload)
      .expect('Content-Type', /json/)
      .expect(200)

    expect(res.status).toBe(200)
  })

  it('GET by ID should return ***UPDATED*** item', async () => {
    let res = await request(app)
      .get(`/api/v1/publications/${id}`)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
    expect(res.status).toBe(200)
    expect(res.body).toEqual(expect.objectContaining(updatedPayload))
  })

  it('DELETE by ID should succeed', async () => {
    let res = await request(app)
      .delete(`/api/v1/publications/${id}`)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
    expect(res.status).toBe(200)
  })

  it('GET by ID should NOT find an item', async () => {
    let res = await request(app)
      .get(`/api/v1/publications/${id}`)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
    expect(res.status).toBe(404)
    expect(res.body).toEqual({ error: 'Not Found' })
  })
})
