import express from 'express'
import bodyParser from 'body-parser';
import userRoute from './routes/auth/user.js'
import productsRoute from './routes/productos.route.js'
import cors from 'cors';

const app = express()

app.use(cors())

app.use(bodyParser.json()); // body en formato json
app.use(bodyParser.urlencoded({ extended: false })); //body formulario

app.use(userRoute)

app.use(productsRoute)


export default app;