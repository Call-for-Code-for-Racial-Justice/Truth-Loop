const request = require('supertest')
const app = require('../app')

describe('CRUD TESTS FOR /api/v1/legislativeArtifacts', function () {
  let payload = {
    title: `Test Name Date ${Date.now()} Randy ${Math.random()}`,
    summary: `Test Summary Date ${Date.now()} Randy ${Math.random()}`,
  }
  let updatedTitle = `Test ***Updated*** Title Date ${Date.now()} Randy ${Math.random()}`
  let id
  let updatedPayload = { ...payload, title: updatedTitle }

  it('Make sure the random titles do not match', async () => {
    expect(payload.title).not.toEqual(updatedTitle)
  })

  it('GET should not have the item.', async () => {
    let res = await request(app)
      .get('/api/v1/legislativeArtifacts')
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
      .post('/api/v1/legislativeArtifacts')
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
      .get('/api/v1/legislativeArtifacts')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
    expect(res.status).toBe(200)
    // console.log(res.body);
    expect(res.body).toEqual(
      expect.arrayContaining([expect.objectContaining(payload)])
    )
  })

  it('GET by ID should return item', async () => {
    let res = await request(app)
      .get(`/api/v1/legislativeArtifacts/${id}`)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
    expect(res.status).toBe(200)
    expect(res.body).toEqual(expect.objectContaining(payload))
  })

  it('PUT by ID to change the title', async () => {
    updatedPayload = { ...payload, title: updatedTitle }

    expect(payload).not.toEqual(updatedPayload)

    let res = await request(app)
      .put(`/api/v1/legislativeArtifacts/${id}`)
      .set('Accept', 'application/json')
      .send(updatedPayload)
      .expect('Content-Type', /json/)
      .expect(200)

    expect(res.status).toBe(200)
  })

  it('GET by ID should return ***UPDATED*** item', async () => {
    let res = await request(app)
      .get(`/api/v1/legislativeArtifacts/${id}`)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
    expect(res.status).toBe(200)
    expect(res.body).toEqual(expect.objectContaining(updatedPayload))
  })

  it('GET minDetail should now include the item', async () => {
    let res = await request(app)
      .get('/api/v1/legislativeArtifacts/list/minDetail')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
    expect(res.status).toBe(200)
    if (res.body.length > 0) {
      // eslint-disable-next-line jest/no-conditional-expect
      expect(res.body[res.body.length - 1]).toEqual(
        expect.objectContaining(updatedPayload)
      )
    }
  })

  it('GET by fullDetailObject by ID should return ***UPDATED*** item', async () => {
    let res = await request(app)
      .get(`/api/v1/legislativeArtifacts/fullDetail/${id}`)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
    expect(res.status).toBe(200)
    expect(res.body).toEqual(expect.objectContaining(updatedPayload))
  })

  it('DELETE by ID should succeed', async () => {
    let res = await request(app)
      .delete(`/api/v1/legislativeArtifacts/${id}`)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
    expect(res.status).toBe(200)
  })

  it('GET by ID should NOT find an item', async () => {
    let res = await request(app)
      .get(`/api/v1/legislativeArtifacts/${id}`)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
    expect(res.status).toBe(404)
    expect(res.body).toEqual({ error: 'Not Found' })
  })

  it('POST creates the fullDetail item', async () => {
    let res = await request(app)
      .post('/api/v1/legislativeArtifacts')
      .set('Accept', 'application/json')
      .send(payload)
      .expect('Content-Type', /json/)
      .expect(201)

    expect(res.status).toBe(201)

    // Save the ID for later
    id = res.body.id
  })

  it('DELETE by fullDetailObject by ID should succeed', async () => {
    let res = await request(app)
      .delete(`/api/v1/legislativeArtifacts/fullDetail/${id}`)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
    expect(res.status).toBe(200)
  })
})
