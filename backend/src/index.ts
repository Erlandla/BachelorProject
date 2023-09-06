import express from 'express'
import swaggerUi from 'swagger-ui-express'
import swaggerJSDoc from 'swagger-jsdoc'
import cors from 'cors'
import bodyParser from 'body-parser'
import { router as odaProblemRoutes } from './routes/odaProblem'
import { router as ontologyRoutes } from './routes/ontology'
import { router as userRoutes } from './routes/user'
import { router as nestaRoutes } from './routes/nesta'

const options = {
  definition: {
    openapi: '3.0.1',
    info: {
      title: 'API specification for graph nesta',
      version: '1.0.0',
    },
    schemes: ['http', 'https'],
    servers: [{ url: 'http://localhost:8080/' }],
  },
  apis: ['./api.yaml'],
}

// Add a list of allowed origins.
// If you have more origins you would like to add, you can add them to the array below.
const allowedOrigins = ['http://localhost:3000']

const corsOptions: cors.CorsOptions = {
  origin: allowedOrigins,
}

// Then pass these options to cors:
const swaggerSpec = swaggerJSDoc(options)
const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

app.use(cors(corsOptions))

app.use('/ontology', ontologyRoutes)
app.use('/odaProblem', odaProblemRoutes)
app.use('/user', userRoutes)
app.use('/nesta', nestaRoutes)

app.listen(8080, () => {
  console.log(`app listening on port ${8080}`)
})
