import express from 'express'
import helmet from 'helmet'
import morgan from 'morgan'
import bodyParser from 'body-parser'
import pool from './lib/db.js'

import 'pug'

const urlencodedParser = bodyParser.urlencoded({ extended: false })

const app = express()
app.use(helmet())
app.use(morgan('combined'))

app.use('/assets', express.static('./assets'))
app.set('view engine', 'pug')

export default config => {
  console.log('config', config)

  app.get('/', async (req, res) => {
    let client
    try {
      client = await pool.connect()
      const result = await client.query('SELECT * FROM "defecations" LIMIT 300 OFFSET 0')
      const defecations = (result) ? result.rows : null

      res.render('index', { defecations })
    } catch (error) {
      console.error(error)
      res.render('index', { error })
    } finally {
      client.release()
    }
  })

  app.get('/defecations/new', (req, res) => {
    res.render('defecations/new', { date: new Date() })
  })

  app.post('/defecations', urlencodedParser, async (req, res) => {
    const { quality, date } = req.body
    console.log(quality, date)

    let client

    try {
      client = await pool.connect()
      const result = await client.query('INSERT INTO defecations(quality, defecation_date) VALUES($1, $2) RETURNING *', [quality, date])
      const results = { results: (result) ? result.rows : null }
      console.log(results)

      res.redirect('/')
    } catch (error) {
      console.error(error)
      res.render('defecations/new', { error })
    } finally {
      client.release()
    }
  })

  return app
}
