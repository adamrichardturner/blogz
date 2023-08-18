const supertest = require('supertest')
const bcrypt = require('bcrypt')
const app = require('../app')
const api = supertest(app)
const helper = require('./test_helper')
const User = require('../models/user')

describe('when we have one user in the db', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('sekret1', 10)
    const user = new User({ username: 'root', passwordHash })

    await user.save()
  })
  test('creation of new user succeeds', async () => {
    const startUsers = await helper.usersInDb()

    const testUser = {
      username: 'aturner',
      name: 'Adam Turner',
      password: 'salmiakki12',
    }

    await api
      .post('/api/users')
      .send(testUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(startUsers.length + 1)

    const usernames = usersAtEnd.map((u) => u.username)
    expect(usernames).toContain(testUser.username)
  })

  test('creation fails with proper status code and message if username already taken', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'root',
      name: 'Superuser',
      password: 'salainen',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('Username already exists')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toEqual(usersAtStart)
  })

  test('creation fails with proper status code and message if username less than 3 characters', async () => {
    const newUser = {
      username: 'ro',
      name: 'Superuser',
      password: 'salainen1',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain(
      'Username should be at least 3 characters long'
    )
  })

  test('creation fails with proper status code and message if password less than 5 characters and does not contain a number', async () => {
    const newUser = {
      username: 'rooty',
      name: 'Superuser',
      password: 's1a',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain(
      'Password must be at least 5 characters long and contain a number'
    )
  })
})
