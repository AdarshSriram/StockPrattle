import { admin, db } from './admin'
import * as express from 'express'

export const auth = (req: express.Request, res: express.Response, next: express.NextFunction) => {
  let idToken = ""
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer ')
  ) {
    idToken = req.headers.authorization.split('Bearer ')[1];
  } else {
    console.error('No token found');
    return res.status(403).json({ error: 'Unauthorized' });
  }
  admin
    .auth()
    .verifyIdToken(idToken)
    .then((decodedToken) => {
      req.body.user = decodedToken;
      db.collection('users')
        .where('userId', '==', req.body.user.uid)
        .limit(1)
        .get()
        .then((data) => {
          req.body.user.username = data.docs[0].data().username;
          next();
        })
        .catch(() => console.log(':(('))
    })
    .catch((err) => {
      console.error('Error while verifying token ', err);
      return res.status(403).json(err);
    });
};

