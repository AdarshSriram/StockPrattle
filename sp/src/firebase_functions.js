import firebase from './utils/config.js';
import fire from 'firebase';
const serviceAccount = require('./sp_admin.json');
const admin = require('firebase-admin');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

//const db = admin.firestore()
const userCollection = firebase.firestore().collection('users')
var storageRef = firebase.storage().ref();
var providerG = new fire.auth.GoogleAuthProvider();
var providerF = new fire.auth.FacebookAuthProvider()

// Demo user object:
//  {
//      email: demo@demo.com,
//      username: demo,
//      fullname: demo demo
//      birthday: dd/mm/yyyy
//      title: Demo at demo firm
//      title: Demo at demo firm
//      industry: Demo
//      education: uptil demo years
// }

// Update user profle details

let getPostIdsByEmail = async (email) => {
  const snapshot = await firebase.firestore().collection("posts/" + email + "/userPosts")
    .orderBy("createdAt").get()
  return snapshot.docs.map(doc => doc.id);
}

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
      console.log("hi")
      userCollection.where('username', '==', detail).get().then(
        (snap) => {
          if (snap.empty) {
            user.updateProfile({ displayName: detail })
              .then(() => {
                console.log("User profile updated ");

              })
              .catch((error) => console.log("User profile could not be updated. Try again"))
          }
          else console.log('username taken')
        }
      )
    }
    else if (fieldName === "profile") {
      firebase.firestore()
        .collection("posts/" + user.email + "/userPosts")
        .get()
        .then((querySnap) => {
          querySnap.forEach((doc) => {
            doc.ref.update({
              "propic": detail
            })
          })
        })
    }
  }
}

// SignUp User
export const SignUp = (params) => {
  const username = params[0]
  const email = params[1]
  const password = params[2]
  if (params.includes(null)) { alert("Sign up unsuccessful. Please try again!"); return }
  if (username.includes("@")) { alert("Username cannot include \"@\"."); return }

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
  function helper(credential) {
    firebase.auth().signInWithCredential(credential)
      .then(() => console.log('Signed in!'))
      .catch((error) => {
        if (error.code === 'auth/user-not-found') {
          alert("User with given email was not found.")
        } else if (error.code === 'auth/wrong-password') {
          alert("The password is incorrect.")
        }
      });
  }
  var email = params[0]
  var password = params[1]
  if (!email.includes('@')) {
    userCollection.where('username', '==', email).get().then((snap) => {
      if (snap.empty) {
        alert("User with this username does not exist")
        return
      }
      else {
        snap.forEach(doc => {
          email = doc.data().email
          var credential = fire.auth.EmailAuthProvider.credential(email, password);
          helper(credential);
        })
      }
    })
  }
  else {
    var credential = fire.auth.EmailAuthProvider.credential(email, password);
    helper(credential);
  }
}

export const getUserInfo = (email) => {
  return userCollection.doc(email).get()
}

export const getCurrentUserInfo = () => {
  var user = firebase.auth().currentUser;
  if (user != null) {
    return userCollection.doc(user.email).get()
  } else {
    console.log('error occured, try again')
  }
}

export const setCurrentUserInfo = async (info) => {
  const user = firebase.auth().currentUser;
  if (info.username != user.displayName) {
    if (info.username.length <= 4) {
      alert("Username must be more than 4 characters long.")
      return userCollection.doc(user.email).get()
    } if (info.username.includes("@")) {
      alert("Username cannot have @ in it.")
      return userCollection.doc(user.email).get()
    }
    await userCollection.where('username', '==', info.username).get().then((snap) => {
      if (snap.empty) {
        user.updateProfile({ displayName: info.username })

        getPostIdsByEmail(user.email)
          .then((idLIst) => {
            console.log(idLIst)
            idLIst.forEach(id => {
              firebase.firestore().collection("posts/" + user.email + "/userPosts")
                .doc(id)
                .update({ username: info.username })
                .then(() => console.log("post updated"))
            })
          })

        return userCollection.doc(user.email).update(info)
      } else {
        alert("Username is already taken.")
        return userCollection.doc(user.email).get()
      }
    }).catch((err) => {
      alert("Profile update was unsuccessful.");
      return userCollection.doc(user.email).get()
    })
  }
  else {
    return userCollection.doc(user.email).update(info)
  }
}

export const uploadPhoto = (email, photo) => {
  storageRef.child('profilePhoto/' + email).put(photo)
    .then((x) => {
      getPostIdsByEmail(email)
        .then((idLIst) => {
          console.log(idLIst)
          idLIst.forEach(id => {
            firebase.firestore().collection("posts/" + email + "/userPosts")
              .doc(id)
              .update({ propic: storageRef.child('profilePhoto/' + email).getDownloadURL() })
          })
        })
    })
  return storageRef.child('profilePhoto/' + email).getDownloadURL()
}

export const getPhoto = (email) => {
  return storageRef.child('profilePhoto/' + email).getDownloadURL()
}

export const signUpExt = (google) => {
  console.log("sign up")
  firebase.auth().signInWithPopup((google) ? providerG : providerF).then(function (result) {
    // This gives you a Google Access Token. You can use it to access the Google API.
    var cred = result.credential;
    // The signed-in user info.
    var user = firebase.auth().currentUser;
    var credential = fire.auth.EmailAuthProvider.credential(user.email, "12345678");
    user.linkWithCredential(credential);
    user.updateProfile({ displayName: user.email.replace("@", ".") })
    userCollection.doc(user.email).set({
      email: user.email,
      username: user.email.replace("@", "."),
      passwordChange: true
    })
  }).catch(function (error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    console.log(error)
    console.log(errorMessage)
    // The email of the user's account used.
    var email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    var credential = error.credential;
    // ...
  })
}

export const signInExt = (google) => {
  firebase.auth().signInWithPopup((google) ? providerG : providerF).then(function (result) {
    const user = firebase.auth().currentUser
    userCollection.doc(user.email).get().then((doc) => {
      if (!doc.exists) {
        user.delete();
        console.log("user deleted")
      }
    })
    // This gives you a Google Access Token. You can use it to access the Google API.
    // The signed-in user info.
  }).catch(function (error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // The email of the user's account used.
    var email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    var credential = error.credential;
    // ...
  })
}

export const addPost = async (params) => {
  var user = firebase.auth().currentUser; var pic;
  console.log(user.displayName, user.username)
  await getPhoto(user.email).then((res) => pic = res)
  const post = {
    "stocks": params[0],
    "text": params[1],
    "createdAt": (new Date()).toString(),
    "username": user.displayName,
    "propic": pic
  }
  var email = user.email
  var post_ref = firebase.firestore().collection("posts/" + email + "/userPosts");
  post_ref
    .doc().set(post)
    .catch((err) => { console.log(err) })
}

export const addFollow = async (follower_email, follower_uname) => {
  var user = firebase.auth().currentUser;
  var follow_ref = firebase.firestore().collection("follows/" + user.email + "/userFollows");
  follow_ref
    .doc(follower_email)
    .set({ username: follower_uname })
    .catch((err) => { console.log(err) })
}

export const getFollowing = async (userEmail = null) => {
  if (userEmail === null) {
    var user = firebase.auth().currentUser;
    userEmail = user.email
  }
  const snapshot = await firebase.firestore()
    .collection("following/" + userEmail + "/userFollowing")
    .get()
  return snapshot.docs.map(doc => doc.id)
}

let getPostsByEmail = async (email) => {
  const snapshot = await firebase.firestore().collection("posts/" + email + "/userPosts")
    .orderBy("createdAt").get()
  return snapshot.docs.map(doc => doc.data());
}

export const get_follower_posts = async () => {
  var user = firebase.auth().currentUser;
  return firebase.firestore().collection("following/" + user.email + "/userFollowing").get()
    .then(
      (docRef) => {
        var post_arr = [];
        docRef.forEach((doc) => {
          post_arr.push(getPostsByEmail(doc.id))
        })
        var res = Promise.all(post_arr)
        return res
      })
    .catch((err) => { console.log(err) })
}

export const get_stock_comments = async (stockId) => {
  const snapshot = await firebase.firestore().collection("comments/" + stockId + "/stockComments")
    .orderBy("points", fire.Query.Direction.DESCENDING).get()
  return snapshot.docs.map(doc => doc.data());
}

export const add_stock_comment = async (comment, stockId) => {
  var user = firebase.auth().currentUser;
  const comment_ref = firebase.firestore().collection("comments/" + stockId + "/stockComments")
  comment_ref.doc(stockId)
    .set(comment)
    .catch((err) => { console.log(err) })
}

export const allUsers = async () => {
  const snapshot = await userCollection.get()
  return snapshot.docs.map(doc => doc.data());
}
