import request from 'supertest'

import { api } from '../api'

import { connectToDb, database } from '../db'
import Task from '../db/models/Task'

console.log = jest.fn()

describe('API tests', () => {
  beforeEach(async () => {
    if (database.isInitialized) {
      await database.destroy()
    }

    await connectToDb()

    const taskRepository = database.getRepository(Task)
    await taskRepository.clear()
  })

  afterAll(async () => {
    const taskRepository = database.getRepository(Task)
    await taskRepository.clear()

    if (database.isInitialized) {
      await database.destroy()
    }
  })

  describe('GET /tasks', () => {
    beforeEach(async () => {
      const taskRepository = database.getRepository(Task)

      const newTask1 = new Task()
      const newTask2 = new Task()

      newTask1.text = 'foo'
      newTask1.createdAt = new Date()

      newTask2.text = 'bar'
      newTask2.createdAt = new Date()

      await taskRepository.save(newTask1)
      await taskRepository.save(newTask2)
    })

    it('Should return 200 with valid post body', async () => {
      const res = await request(api)
        .get('/tasks')
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json')
      expect(res.statusCode).toEqual(200)
      expect(res.body.length).toEqual(2)

      expect(res.body[0].text).toEqual('foo')
      expect(res.body[1].text).toEqual('bar')
    })
  })

  describe('POST /tasks', () => {
    it('Should return 201 with valid post body', async () => {
      const body = {
        text: 'Log in hours to JIRA',
      }
      const res = await request(api)
        .post('/tasks')
        .send(body)
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json')
      expect(res.statusCode).toEqual(201)
    })

    it('Should have data in database after successful POST request', async () => {
      const body = {
        text: 'Go buy coffee',
      }
      const res = await request(api)
        .post('/tasks')
        .send(body)
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json')
      expect(res.statusCode).toEqual(201)

      const taskRepository = database.getRepository(Task)
      const tasks = await taskRepository.find()

      expect(tasks.length).toEqual(1)
      expect(tasks[0].text).toEqual('Go buy coffee')
    })

    it('Should return 400 with too long text in post body', async () => {
      const body = {
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam ullamcorper nisi risus, quis gravida nunc pulvinar ac. Nulla facilisi. Maecenas ac mi et dui varius commodo sit amet at elit.',
      }
      const res = await request(api)
        .post('/tasks')
        .send(body)
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json')
      expect(res.statusCode).toEqual(400)
      expect(res.text).toEqual(
        '"Path: body,text, Issue: String must contain at most 50 character(s)"'
      )
    })

    it('Should return 400 with extra fields  in post body', async () => {
      const body = {
        text: 'Log in hours to JIRA',
        extraField: 'foo',
      }

      const res = await request(api)
        .post('/tasks')
        .send(body)
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json')
      expect(res.statusCode).toEqual(400)
      expect(res.text).toEqual(
        '"Path: body, Issue: Unrecognized key(s) in object: \'extraField\'"'
      )
    })
  })

  describe('PATCH /tasks/:id', () => {
    beforeEach(async () => {
      const taskRepository = database.getRepository(Task)

      const newTask1 = new Task()
      const newTask2 = new Task()

      newTask1.text = 'foo'
      newTask1.createdAt = new Date()

      newTask2.text = 'bar'
      newTask2.createdAt = new Date()

      await taskRepository.save(newTask1)
      await taskRepository.save(newTask2)
    })

    it('Should return 201 with valid patch body', async () => {
      const body = {
        text: 'Log in hours to JIRA',
      }
      const res = await request(api)
        .patch('/tasks/1')
        .send(body)
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json')
      expect(res.statusCode).toEqual(200)

      const taskRepository = database.getRepository(Task)
      const task = await taskRepository.findOneBy({ id: 1 })

      expect(task?.text).not.toEqual('foo')

      expect(task?.text).toEqual('Log in hours to JIRA')
    })

    it('Should return 400 with too long text in patch body', async () => {
      const body = {
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam ullamcorper nisi risus, quis gravida nunc pulvinar ac. Nulla facilisi. Maecenas ac mi et dui varius commodo sit amet at elit.',
      }
      const res = await request(api)
        .patch('/tasks/1')
        .send(body)
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json')
      expect(res.statusCode).toEqual(400)
      expect(res.text).toEqual(
        '"Path: body,text, Issue: String must contain at most 50 character(s)"'
      )
    })

    it('Should return 400 with extra field patch body', async () => {
      const body = {
        text: 'Log in hours to JIRA',
        extraField: 'bar',
      }
      const res = await request(api)
        .patch('/tasks/1')
        .send(body)
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json')
      expect(res.statusCode).toEqual(400)

      expect(res.text).toEqual(
        '"Path: body, Issue: Unrecognized key(s) in object: \'extraField\'"'
      )
    })

    it('Should return 400 with empty patch body', async () => {
      const body = {}
      const res = await request(api)
        .patch('/tasks/1')
        .send(body)
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json')
      expect(res.statusCode).toEqual(400)

      expect(res.text).toEqual('no data to update')
    })

    it('Should return 404 if no data found on given id', async () => {
      const body = {
        text: 'Log in hours to JIRA',
      }

      const res = await request(api)
        .patch('/tasks/666')
        .send(body)
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json')
      expect(res.statusCode).toEqual(404)

      expect(res.text).toEqual('data not found')
    })
  })

  describe('DELETE /tasks/:id', () => {
    beforeEach(async () => {
      const taskRepository = database.getRepository(Task)

      const newTask1 = new Task()
      const newTask2 = new Task()

      newTask1.text = 'foo'
      newTask1.createdAt = new Date()

      newTask2.text = 'bar'
      newTask2.createdAt = new Date()

      await taskRepository.save(newTask1)
      await taskRepository.save(newTask2)
    })

    it('Should return 200 on successful delete request', async () => {
      const res = await request(api)
        .delete('/tasks/1')
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json')
      expect(res.statusCode).toEqual(200)
    })

    it('Data should be deleted after successful delete request', async () => {
      const res = await request(api)
        .delete('/tasks/1')
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json')
      expect(res.statusCode).toEqual(200)

      const taskRepository = database.getRepository(Task)

      const task = await taskRepository.findOneBy({ id: 1 })

      expect(task).toEqual(null)
    })

    it('Should return 404 if no data found on given id', async () => {
      const res = await request(api)
        .delete('/tasks/666')
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json')
      expect(res.statusCode).toEqual(404)

      expect(res.text).toEqual('data not found')
    })
  })
})
