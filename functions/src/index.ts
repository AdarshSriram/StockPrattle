import * as functions from 'firebase-functions'
import * as express from 'express'
import * as cors from 'cors'
import { auth } from '../utils/auth'
import * as bodyparser from 'body-parser'

const app = express()
app.use(cors());
app.use(bodyparser.urlencoded({ extended: true }))
app.use(bodyparser.json())

import {
  //signup,
  login,
  addUserDetails
} from '../handlers/users'

// users routes
app.post('/signup', (req, res) => { console.log('hey') })
app.post('/login', login);
app.post('/user', auth, addUserDetails);

export const api = functions.region('us-central1').https.onRequest(app);