import { db } from "../utils/admin"
import * as config from "../utils/config"
import * as firebase from "firebase"
import { UserDetails, /*validateSignupData, */validateLoginData, reduceUserDetails } from '../utils/validate'
import * as express from 'express'

firebase.initializeApp(config);

const signup = (req: express.Request, res: express.Response) => {
  return res.status(400).json({})
  /*const newUser = {
    email: req.body.email,
    password: req.body.password,
    confirmPassword: req.body.confirmPassword,
    username: req.body.username,
  } as NewUser

  const { valid, errors } = validateSignupData(newUser);

  if (!valid) return res.status(400).json(errors);

  let token = "", userId = ""
  db.doc(`/users/${newUser.username}`)
    .get()
    .then((doc) => {
      if (doc.exists) {
        return res.status(400).json({ username: "this username is already taken" });
      } else {
        firebase
          .auth()
          .createUserWithEmailAndPassword(newUser.email, newUser.password)
          .then((data) => {
            if (data.user !== null) {
              userId = data.user.uid
              data.user
                .getIdToken()
                .then((idToken) => {
                  token = idToken;
                  const userCredentials = {
                    username: newUser.username,
                    email: newUser.email,
                    createdAt: new Date().toISOString(),
                    userId,
                  }
                  db.doc(`/user/${newUser.username}`).set(userCredentials)
                    .then(() => {
                      return res.status(201).json({ token })
                    }).catch((err) => console.log(err))
                }).catch((err) => console.log(err))
            }
            else return res
              .status(500)
              .json({ general: "Something went wrong, please try again" });
          })
          .catch((err) => {
            console.error(err);
            if (err.code === "auth/email-already-in-use") {
              return res.status(400).json({ email: "Email is already is use" });
            } else {
              return res
                .status(500)
                .json({ general: "Something went wrong, please try again" });
            }
          })
      }
    })
    .catch((err) => console.log(`error is ${err}`))*/
}

const login = (req: express.Request, res: express.Response) => {
  const user = {
    email: req.body.email,
    password: req.body.password,
  };
  const { valid, errors } = validateLoginData(user)
  if (!valid) return res.status(400).json(errors);
  firebase
    .auth()
    .signInWithEmailAndPassword(user.email, user.password)
    .then((data: firebase.auth.UserCredential) => {
      if (data !== null && data.user !== null) {
        return data.user.getIdToken().then((token) => res.json({ token })).catch(() => res
          .status(500)
          .json({ general: "Something went wrong, please try again" }))
      }
      else return res
        .status(500)
        .json({ general: "Something went wrong, please try again" })
    })
    .catch((err) => {
      console.error(err);
      // auth/wrong-password
      // auth/user-not-user
      return res
        .status(403)
        .json({ general: "Wrong credentials, please try again" });
    });
};

// Add user details
const addUserDetails = (req: express.Request, res: express.Response) => {
  let userDetails = reduceUserDetails(req.body) as UserDetails
  db.doc(`/users/${req.body.username}`)
    .update(userDetails)
    .then(() => {
      return res.json({ message: "Details added successfully" });
    })
    .catch((err) => {
      console.error(err);
      return res.status(500).json({ error: err.code });
    });
};

// Get own user details

/*interface NewUser {
  email: string,
  password: string,
  confirmPassword: string,
  username: string
}
*/
export { signup, addUserDetails, login }