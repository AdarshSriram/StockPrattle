import firebase from './utils/config'

// Update user profle details 
export const updateProfile = (fieldName, detail) => {
  var user = firebase.auth().currentUser;
  if (user != null) {
    const username = user.displayName
    const dict = {}
    dict[fieldName] = detail
    const userCollection = firebase.firestore().collection('users')
    userCollection.doc(username)
      .update(dict)
      .then(() => console.log(`${fieldName} updated to ${detail}`))
      .catch((err) => console.log(err))

    if (fieldName === 'username') {
      user.updateProfile({
        displayName: username
      })
        .then(function () {
          console.log("User profile updated ")
        }).catch(function (error) {
          console.log("User profile could not be updated. Try again")
        })
    }
  } else {
    console.log('Please try again')
  }
}

// SignUp User
export const SignUp = (params) => {
  const username = params[0]
  const email = params[1]
  const password = params[2]
  const userCollection = firebase.firestore().collection('users')
  firebase.auth().
    createUserWithEmailAndPassword(email, password)
    .then(() => {
      userCollection.doc(username)
        .get()
        .then((doc) => {
          if (!doc.exists) {
            userCollection.doc(username)
              .set({
                username: username,
                email: email,
              })
              .then(() => {
                console.log(`User signed up successfully`)
                firebase.auth().onAuthStateChanged(function (user) {
                  if (user) {
                    user.updateProfile({
                      displayName: username
                    })
                      .then(function () {
                        console.log("User profile successfully created")
                      }).catch(function (error) {
                        console.log("User profile could not be created. Try again :(")
                      });
                  } else {
                    console.log('Please try again')
                  }
                });
              })
              .catch((err) => console.log(err))

          }
          else {
            console.log('User with this username already exists')
          }
        })
    })
    .catch(function (error) {
      console.log(error.code)
      console.log(error.message)
    });
}

export const SignIn = (params) => {
  const email = params[0]
  const password = params[1]
  firebase.auth().signInWithEmailAndPassword(email, password)
    .then(() => console.log('Signed in !'))
    .catch(function (error) {
      console.log(error.code)
      console.log(error.message)
    });
}

export const getUserInfo = (username) => {
  const userCollection = firebase.firestore().collection('users')
  userCollection.doc(username)
    .get()
    .then((doc) => {
      if (!doc.exists) {
        console.log('No user found')
      }
      else {
        return doc.data()
      }
    })
    .catch((err) => console.log(err))
}

export const setUserInfo = (username, update) => {
  const userCollection = firebase.firestore().collection('users')
  userCollection.doc(username)
    .update(update)
    .then(() => console.log("User set"))
    .catch((err) => console.log(err))
}

export const getCurrentUserInfo = () => {
  const userCollection = firebase.firestore().collection('users')
  var user = firebase.auth().currentUser;
  if (user != null) {
    userCollection.doc(user.displayName)
      .get()
      .then((doc) => {
        if (!doc.exists) {
          console.log('No user found')
        }
        else {
          return doc.data()
        }
      })
      .catch((err) => console.log(err))
  }
  else {
    console.log('error occured, try again')
  }
}

export const setCurrentUserInfo = (info) => {
  const userCollection = firebase.firestore().collection('users')
  const user = firebase.auth().currentUser;
  userCollection.doc(user.displayName)
    .update(info)
    .then(() => console.log("User set"))
    .catch((err) => console.log(err))
}
