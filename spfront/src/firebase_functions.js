import firebase from './utils/config'

const userCollection = firebase.firestore().collection('users')
var storageRef = firebase.storage().ref();

// Update user profle details 
export const updateProfile = (fieldName, detail) => {
  var user = firebase.auth().currentUser;
  if (user != null) {
    const email = user.email
    const dict = {}
    dict[fieldName] = detail
    const userCollection = firebase.firestore().collection('users')
    userCollection.doc(email)
      .update(dict)
      .then(() => console.log(`${fieldName} updated to ${detail}`))
      .catch((err) => console.log(err))

    if (fieldName === 'username') {
      userCollection.where('username', '==', detail).get().then(
        (snap) => {
          if (snap.empty) {
            user.updateProfile({ displayName: detail })
              .then(() => { console.log("User profile updated ") })
              .catch((error) => console.log("User profile could not be updated. Try again"))
          }
          else console.log('username taken')
        }
      )
    }

  }
}

// SignUp User
export const SignUp = (params) => {
  const username = params[0]
  const email = params[1]
  const password = params[2]

  userCollection.doc(email).get().then((doc) => {
    if (!doc.exists) {
      userCollection.where('username', '==', username).get().then((snap) => {
        if (snap.empty) {
          firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(userCollection.doc(email).set({
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
                      })
                      .catch(function (error) {
                        console.log("User profile could not be created. Try again :(")
                      });
                  } else {
                    console.log('Please try again')
                  }
                });
              })
              .catch((err) => console.log(err)
              )
            )
            .catch((err) => console.log(err))
        }
        else {
          console.log("Username is taken")
        }
      })

    }
    else {
      console.log('User with this email already exists')
    }
  })
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

export const getUserInfo = (email) => {
  userCollection.doc(email)
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

export const setUserInfo = (email, update) => {
  userCollection.doc(email)
    .update(update)
    .then(() => console.log("User set"))
    .catch((err) => console.log(err))
}

export const getCurrentUserInfo = () => {
  var user = firebase.auth().currentUser;
  if (user != null) {
    userCollection.doc(user.email)
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
  const user = firebase.auth().currentUser;
  userCollection.doc(user.email)
    .update(info)
    .then(() => console.log("User set"))
    .catch((err) => console.log(err))
}

export const uploadPhoto = (photo) => {
  storageRef.child('profilePhoto' + photo.name)
    .put(photo)
    .then((snap) => console.log('pic upload'))
    .catch((err) => console.log(err))
}

export const getPhoto = (email, element) => {
  storageRef.child('profilePhoto/email.jpg')
    .getDownloadURL()
    .then((url) => {
      // Or inserted into an <img> element:
      var img = document.getElementById(element); // Element where you want to put pic
      img.src = url;
    }).catch(function (error) {
      console.log(error)
    })
}