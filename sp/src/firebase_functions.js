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
  const name = params[1]
  const email = params[2]
  const password = params[3]

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
              fullname: name
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

  var follow_ref = firebase.firestore().collection("following/" + email + "/userFollowing");
  follow_ref
    .doc("stockprattle@gmail.com")
    .set({ username: "stockprattleAdmin" })
    .then(() => console.log("Following admin"))
    .catch((err) => { console.log(err) })
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
          idLIst.forEach(async id => {
            firebase.firestore().collection("posts/" + email + "/userPosts")
              .doc(id)
              .update({ propic: await storageRef.child('profilePhoto/' + email).getDownloadURL() })
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

////////////////////////////// Social Media Functions //////////////////////////////////////

export const allUsers = async () => {
  const snapshot = await userCollection.get()
  return snapshot.docs.map(doc => doc.data());
}

export const addPost = async (params) => {
  var user = firebase.auth().currentUser;
  var pic = await getPhoto(user.email).then(res => res).catch(err => { console.log(err); return "" })
  const time = Date.now()
  const post = {
    "stocks": params[0],
    "text": params[1],
    "createdAt": time,
    "username": user.displayName,
    "propic": pic ? pic : "",
    "likes": 0,
    "id": user.email + "," + time
  }
  var email = user.email
  var post_ref = firebase.firestore().collection("posts/" + email + "/userPosts");
  return post_ref
    .doc(user.email + "," + time).set(post).then((res) => post)
    .catch((err) => { console.log(err) })
}

export const likeUnlikePost = async (id, like = true, post = true) => {
  const email = id.substring(0, id.indexOf(','))
  const suffix = post ? "/userPosts" : "/postComments"
  const prefix = post ? "posts/" : "comments/"
  console.log(email)
  var post_ref = firebase.firestore().collection(prefix + email + suffix);
  const incr = like ? 1 : -1
  post_ref
    .doc(id)
    .update({ likes: fire.firestore.FieldValue.increment(incr) })
    .catch((err) => { console.log(err) })

  var user = firebase.auth().currentUser;
  var like_ref = firebase.firestore().collection("likes/" + user.email + "/userLikes");
  if (like) {
    like_ref
      .doc(id)
      .set({})
      .catch((err) => console.log(err))
  }
  else {
    like_ref
      .doc(id)
      .delete()
      .catch((err) => console.log(err))
  }
}

export const followUser = async (follower_email, follower_uname) => {
  var user = firebase.auth().currentUser;
  var follow_ref = firebase.firestore().collection("following/" + user.email + "/userFollowing");
  follow_ref
    .doc(follower_email)
    .set({ username: follower_uname })
    .then(() => {
      var following_ref = firebase.firestore().collection("following/" + follower_email + "/userFollowers");
      following_ref
        .doc(user.email)
        .set({ username: user.displayName })
    })
    .catch((err) => { console.log(err) })
}

export const unfollowUser = async (follower_email) => {
  var user = firebase.auth().currentUser;
  var follow_ref = firebase.firestore().collection("following/" + user.email + "/userFollowing");
  follow_ref
    .doc(follower_email)
    .delete()
    .then(() => {
      var following_ref = firebase.firestore().collection("following/" + follower_email + "/userFollowers");
      following_ref
        .doc(user.email)
        .delete()
    })
    .catch((err) => { console.log(err) })
}

export const getFollowing = async (userEmail = null, following = true) => {
  if (userEmail === null) {
    var user = firebase.auth().currentUser;
    userEmail = user.email
  }
  const suffix = following ? "/userFollowing" : "/userFollowers"
  const snapshot = await firebase.firestore()
    .collection("following/" + userEmail + suffix)
    .get()
  return snapshot.docs.map(doc => doc.id)
}

let getPostsByEmail = async (email) => {
  const snapshot = await firebase.firestore().collection("posts/" + email + "/userPosts")
    .orderBy("createdAt", "desc").get()
  return snapshot.docs.map(doc => doc.data());
}

export const get_follower_posts = async (following = true) => {
  var user = firebase.auth().currentUser;
  const suffix = following ? "/userFollowing" : "/userFollowers"
  return firebase.firestore().collection("following/" + user.email + suffix).get()
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

export const get_post_comments = async (id) => {
  const snapshot = await firebase.firestore().collection("comments/" + id + "/postComments")
    .orderBy("likes", "desc").get()
  return snapshot.docs.map(doc => doc.data());
}

export const add_comment = async (postId, text) => {
  var user = firebase.auth().currentUser;
  const comment_ref = firebase.firestore().collection("comments/" + postId + "/postComments")
  const time = Date.now()
  const comment = {
    "postId": postId,
    "text": text,
    "createdAt": time,
    "username": user.displayName,
    "id": user.email + postId,
    "likes": 0
  }
  comment_ref.doc(user.email + time)
    .set(comment)
    .catch((err) => { console.log(err) })
}

export const hasUserLiked = (postId) => {
  var user = firebase.auth().currentUser;
  var like_ref = firebase.firestore().collection("likes/" + user.email + "/userLikes");
  return like_ref
    .doc(postId)
    .get()
    .then((doc) => { return doc.exists })
}
