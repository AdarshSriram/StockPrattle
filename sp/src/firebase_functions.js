import firebase from './utils/config'
import fire from 'firebase'

const userCollection = firebase.firestore().collection('users')
var storageRef = firebase.storage().ref();
var provider = new fire.auth.GoogleAuthProvider();

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
  if (params.includes(null)) { alert("Sign up unsuccessful. Please try again!"); return }

  userCollection.doc(email).get().then((doc) => {
    if (!doc.exists) {
      userCollection.where('username', '==', username).get().then((snap) => {
        if (snap.empty) {
          firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(userCollection.doc(email).set({
              username: username,
              email: email,
            }).then(() => {
              alert(`Sign Up Successful!`)
              firebase.auth().onAuthStateChanged(function (user) {
                if (user) {
                  user.updateProfile({
                    displayName: username
                  }).then(function () {
                    console.log("User profile successfully created")
                  }).catch(function (error) {
                    console.log("User profile could not be created. Try again :(")
                  });
                } else {
                  alert('Sign up unsuccessful. Please try again!')
                }
              });
            }).catch((err) => alert('Sign up unsuccessful. Please try again!'))
            ).catch((err) => alert('Sign up unsuccessful. Please try again!'))
        } else { alert("This username isn't available.") }
      })
    } else {
      alert("A user with this email already exists.")
    }
  }).catch((err) => alert('Sign up unsuccessful. Please try again!'))
}

export const SignIn = (params) => {
  const email = params[0]
  const password = params[1]
  firebase.auth().signInWithEmailAndPassword(email, password)
    .then(() => console.log('Signed in!'))
    .catch((error) => {
      if (error.code === 'auth/user-not-found') {
        alert("User with given email was not found.")
      } else if (error.code === 'auth/wrong-password') {
        alert("The password is incorrect.")
      }
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
  if (info.username !== user.displayName) {
    userCollection.doc(info.email).get().then((doc) => {
      if (!doc.exists) {
        userCollection.where('username', '==', info.username).get().then((snap) => {
          if (snap.empty) {
            return userCollection.doc(user.email).update(info)
          }
        })
      }
    })
  }
  else {
    return userCollection.doc(user.email).update(info)
  }
}

export const uploadPhoto = (email, photo) => {
  return storageRef.child('profilePhoto/' + email).put(photo)
}

export const getPhoto = (email) => {
  return storageRef.child('profilePhoto/' + email).getDownloadURL()
}

export const signInGoogle = () => {
  console.log("sign in")
  firebase.auth().signInWithPopup(provider).then(function (result) {
    // This gives you a Google Access Token. You can use it to access the Google API.
    var token = result.credential.accessToken;
    // The signed-in user info.
    //var user = result.user;
    //console.log(user)
    const user = firebase.auth().currentUser;
    userCollection.doc(user.email).set({
      email: user.email
    }).then(() => console.log("user added to db"))
  }).catch(function (error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // The email of the user's account used.
    var email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    var credential = error.credential;
    // ...
  });
}
