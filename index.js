import express from 'express'
import helmet from 'helmet'
import morgan from 'morgan'
import bodyParser from 'body-parser'

import 'pug'

const urlencodedParser = bodyParser.urlencoded({ extended: false })

const app = express()
app.use(helmet())
app.use(morgan('combined'))

app.use('/assets', express.static('./assets'))
app.set('view engine', 'pug')

export default config => {
  console.log('config', config)

  app.get('/', (req, res) => {
    res.render('index')
  })

  app.get('/defecations/new', (req, res) => {
    res.render('defecations/new', { date: new Date() })
  })

  app.post('/defecations', urlencodedParser, (req, res) => {
    const { quality, date } = req.body
    console.log(quality, date)
    res.redirect('/')
  })

  return app
}
