const request = require('supertest')
const app = require('../app')

describe('CRUD TESTS FOR /api/v1/categories', function () {
  let payload = {
    name: `Test Name Date ${Date.now()} Randy ${Math.random()}`,
    description: `Test Description Date ${Date.now()} Randy ${Math.random()}`,
  }
  let updatedDescription = `Test ***Updated*** Desc Date ${Date.now()} Randy ${Math.random()}`
  let id
  let itemById
  let itemByName
  let updatedPayload = { ...payload, description: updatedDescription }

  it('Make sure the random descriptions do not match', async (done) => {
    expect(payload.description).not.toEqual(updatedDescription)
    done()
  })

  it('GET should not have the item.', async (done) => {
    let res = await request(app)
      .get('/api/v1/categories')
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
      .post('/api/v1/categories')
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
      .get('/api/v1/categories')
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
      .get(`/api/v1/categories/${id}`)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
    expect(res.status).toBe(200)
    expect(res.body).toEqual(expect.objectContaining(payload))
    itemById = res.body
    done()
  })

  it('GET by NAME should return the same item', async (done) => {
    let res = await request(app)
      .get(`/api/v1/categories/name/${payload.name}`)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
    expect(res.status).toBe(200)
    expect(res.body).toEqual(expect.objectContaining(payload))
    itemByName = res.body
    expect(itemByName).toEqual(itemById)
    done()
  })

  it('PUT by ID to change the description', async (done) => {
    updatedPayload = { ...payload, description: updatedDescription }

    expect(payload).not.toEqual(updatedPayload)

    let res = await request(app)
      .put(`/api/v1/categories/${id}`)
      .set('Accept', 'application/json')
      .send(updatedPayload)
      .expect('Content-Type', /json/)
      .expect(200)

    expect(res.status).toBe(200)
    done()
  })

  it('GET by ID should return ***UPDATED*** item', async (done) => {
    let res = await request(app)
      .get(`/api/v1/categories/${id}`)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
    expect(res.status).toBe(200)
    expect(res.body).toEqual(expect.objectContaining(updatedPayload))
    done()
  })

  it('DELETE by ID should succeed', async (done) => {
    let res = await request(app)
      .delete(`/api/v1/categories/${id}`)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
    expect(res.status).toBe(200)
    done()
  })

  it('GET by ID should NOT find an item', async (done) => {
    let res = await request(app)
      .get(`/api/v1/categories/${id}`)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
    expect(res.status).toBe(404)
    expect(res.body).toEqual({ error: 'Not Found' })
    done()
  })
})
