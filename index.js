import express from 'express'
import helmet from 'helmet'
import morgan from 'morgan'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import pool from './lib/db.js'

import 'pug'

const urlencodedParser = bodyParser.urlencoded({ extended: false })

const app = express()
app.use(helmet())
app.use(morgan('combined'))
app.use(cookieParser())
app.use('/assets', express.static('./assets'))
app.use('/manifest.webmanifest', express.static('./manifest.webmanifest'))
app.set('view engine', 'pug')

app.use((req, res, next) => {
  // very poor auth, just to protect the PWA a bit.
  if (req.query.initAuth === process.env.INIT_SECRET) {
    res.cookie('app-secret', process.env.APP_SECRET, { httpOnly: true, maxAge: 365 * 24 * 60 * 60 * 1000 })
    return next()
  } else if (req.cookies['app-secret'] === process.env.APP_SECRET) {
    console.log('cookie auth is ok')
    return next()
  }

  res.sendStatus(401)
})

export default config => {
  console.log('config', config)
  app.get('/manifest.webmanifest', (req, res) => {
    const startUrl = req.query.initAuth ? `${process.env.INIT_AUTH_URL}${req.query.initAuth}` : '.'
    res.send(JSON.stringify({
      name: 'Food Control',
      start_url: startUrl,
      display: 'fullscreen',
      background_color: '#fff',
      description: 'Control that pets snacks (in and out)',
      lang: 'de-DE',
      orientation: 'portrait'
    }))
  })
  app.get('/', async (req, res) => {
    let client
    try {
      client = await pool.connect()
      const result = await client.query('SELECT * FROM "defecations" ORDER BY defecation_date DESC LIMIT 300 OFFSET 0')
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
