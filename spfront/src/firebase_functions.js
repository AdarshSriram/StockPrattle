import firebase from './utils/config'

const userCollection = firebase.firestore().collection('users')
var storageRef = firebase.storage().ref();

// Demo user object:
//  {
//      email: demo@demo.com,
//      username: demo,
//      fullname: demo demo
//      birthday: dd/mm/yyyy
//      title: Demo at demo firm
//      industry: Demo
//      education: uptil demo years
// }

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
  console.log(params)
  firebase.auth().signInWithEmailAndPassword(email, password)
    .then(() => console.log('Signed in!'))
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
        return userCollection.doc(user.email).get()
    } else {
        console.log('error occured, try again')
    }
}

export const setCurrentUserInfo = (info) => {
  const user = firebase.auth().currentUser;
  return userCollection.doc(user.email).update(info)
}

export const uploadPhoto = (email, photo) => {
  return storageRef.child('profilePhoto/'+email).put(photo)
}

export const getPhoto = (email) => {
  return storageRef.child('profilePhoto/'+email).getDownloadURL()
}
