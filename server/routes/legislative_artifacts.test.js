const request = require('supertest')
const app = require('../app')

describe('CRUD TESTS FOR /api/v1/legislativeArtifacts', function () {
  let payload = {
    title: `Test Name Date ${Date.now()} Randy ${Math.random()}`,
    summary: `Test Summary Date ${Date.now()} Randy ${Math.random()}`,
  }
  let updatedTitle = `Test ***Updated*** Title Date ${Date.now()} Randy ${Math.random()}`
  let id
  let itemById
  let updatedPayload = { ...payload, title: updatedTitle }

  it('Make sure the random titles do not match', async (done) => {
    expect(payload.title).not.toEqual(updatedTitle)
    done()
  })

  it('GET should not have the item.', async (done) => {
    let res = await request(app)
      .get('/api/v1/legislativeArtifacts')
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
      .post('/api/v1/legislativeArtifacts')
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
      .get('/api/v1/legislativeArtifacts')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
    expect(res.status).toBe(200)
    // console.log(res.body);
    expect(res.body).toEqual(
      expect.arrayContaining([expect.objectContaining(payload)])
    )
    done()
  })

  it('GET by ID should return item', async (done) => {
    let res = await request(app)
      .get(`/api/v1/legislativeArtifacts/${id}`)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
    expect(res.status).toBe(200)
    expect(res.body).toEqual(expect.objectContaining(payload))
    itemById = res.body
    done()
  })

  it('PUT by ID to change the title', async (done) => {
    updatedPayload = { ...payload, title: updatedTitle }

    expect(payload).not.toEqual(updatedPayload)

    let res = await request(app)
      .put(`/api/v1/legislativeArtifacts/${id}`)
      .set('Accept', 'application/json')
      .send(updatedPayload)
      .expect('Content-Type', /json/)
      .expect(200)

    expect(res.status).toBe(200)
    done()
  })

  it('GET by ID should return ***UPDATED*** item', async (done) => {
    let res = await request(app)
      .get(`/api/v1/legislativeArtifacts/${id}`)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
    expect(res.status).toBe(200)
    expect(res.body).toEqual(expect.objectContaining(updatedPayload))
    done()
  })

  it('GET minDetail should now include the item', async (done) => {
    let res = await request(app)
      .get('/api/v1/legislativeArtifacts/list/minDetail')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
    expect(res.status).toBe(200)
    if (res.body.length > 0) {
      expect(res.body[res.body.length - 1]).toEqual(
        expect.objectContaining(updatedPayload)
      )
    }
    done()
  })

  it('GET by fullDetailObject by ID should return ***UPDATED*** item', async (done) => {
    let res = await request(app)
      .get(`/api/v1/legislativeArtifacts/fullDetail/${id}`)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
    expect(res.status).toBe(200)
    expect(res.body).toEqual(expect.objectContaining(updatedPayload))
    done()
  })

  it('DELETE by ID should succeed', async (done) => {
    let res = await request(app)
      .delete(`/api/v1/legislativeArtifacts/${id}`)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
    expect(res.status).toBe(200)
    done()
  })

  it('GET by ID should NOT find an item', async (done) => {
    let res = await request(app)
      .get(`/api/v1/legislativeArtifacts/${id}`)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
    expect(res.status).toBe(404)
    expect(res.body).toEqual({ error: 'Not Found' })
    done()
  })

  it('POST creates the fullDetail item', async (done) => {
    let res = await request(app)
      .post('/api/v1/legislativeArtifacts')
      .set('Accept', 'application/json')
      .send(payload)
      .expect('Content-Type', /json/)
      .expect(201)

    expect(res.status).toBe(201)

    // Save the ID for later
    id = res.body.id
    done()
  })

  it('DELETE by fullDetailObject by ID should succeed', async (done) => {
    let res = await request(app)
      .delete(`/api/v1/legislativeArtifacts/fullDetail/${id}`)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
    expect(res.status).toBe(200)
    done()
  })
})
