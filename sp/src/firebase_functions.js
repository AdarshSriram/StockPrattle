import firebase from './utils/config.js';
import fire from 'firebase';

const userCollection = firebase.firestore().collection('users')
var storageRef = firebase.storage().ref();
var providerG = new fire.auth.GoogleAuthProvider();
var providerF = new fire.auth.FacebookAuthProvider()

let getPostIdsByEmail = async (email) => {
  const snapshot = await firebase.firestore().collection("posts/" + email + "/userPosts")
    .orderBy("createdAt").get()
  return snapshot.docs.map(doc => doc.id);
}

export const getUname = async () => {
  var user = await firebase.auth().currentUser;
  return user.displayName
}

export function createProfile() {
  var user = fire.auth().currentUser
  return fire.auth().signInWithEmailLink(user.email, window.location.href).then((result) => {
    user = result.user
    return userCollection.doc(user.email).set({
      email: user.email,
      passwordChange: true,
    }).then(() => {
      console.log("Profile Creation Successful!")
      return user
    }).catch(() => {
      alert("Unable to verify. Please try again!")
    })
  }).catch((error) => {
    console.log(error.code)
    console.log(error.message)
    alert("Unable to verify. Please try again!")
  });
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
export const SignUp = (email) => {
  return userCollection.doc(email).get().then((doc) => {
    if (!doc.exists) {
      const actionCodeSettings = { url: window.location.href, handleCodeInApp: true };
      return fire.auth().sendSignInLinkToEmail(email, actionCodeSettings)
        .then(() => {
          return fire.auth().createUserWithEmailAndPassword(email, "12345678")
            .then(() => {
              console.log("Email Sent!");
              return true;
            }).catch((err) => { alert('Sign up unsuccessful. Please try again!'); return; })
        }).catch((error) => {
          console.log(error.code)
          console.log(error.message)
        });
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

export const setUserExtSignup = async (info) => {
  const user = firebase.auth().currentUser;
  console.log(info)
  userCollection
    .where('username', '==', info.username).get().then((snap) => {
      if (snap.empty) {
        return userCollection
          .doc(user.email)
          .update(info)
      }
      else {
        snap.forEach(doc => console.log(doc.data()))
        alert("This username is taken")
      }
    })
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
            idLIst.forEach(id => {
              firebase.firestore().collection("posts/" + user.email + "/userPosts")
                .doc(id)
                .update({ username: info.username })
                .then(() => console.log("post updated"))
            })
          })

        updateCommentUname(user.email, info.username)

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

export function signUpExt(isGoogle) {
  fire.auth().signInWithPopup((isGoogle) ? providerG : providerF).then((result) => {
    // This gives you a Google Access Token. You can use it to access the Google API.
    const cred = result.credential;
    // The signed-in user info.
    const user = fire.auth().currentUser;
    const credential = firebase.auth.EmailAuthProvider.credential(user.email, "12345678");
    user.linkWithCredential(credential);
    userCollection.doc(user.email).set({
      email: user.email,
      passwordChange: true,
    })
    console.log("User signed up externally")
  }).catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(error)
    console.log(errorMessage)
    // The email of the user's account used.
    const email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    const credential = error.credential;
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
    "id": user.email + "," + params[0] + ",," + time
  }
  var email = user.email

  var post_ref = firebase.firestore().collection("posts/" + email + "/userPosts");

  const stock_post_ref = firebase.firestore().collection("stockposts/" + params[0] + "/stockPosts");

  stock_post_ref.doc(user.email + "," + params[0] + ",," + time).set(post)

  return post_ref
    .doc(user.email + "," + params[0] + ",," + time).set(post).then(() => post)
    .catch((err) => { console.log(err) })
}

export const getStockPosts = async (stock) => {
  const snapshot = await firebase.firestore().collection("stockposts/" + stock + "/stockPosts")
    .orderBy("createdAt", "desc").get()
  return snapshot.docs.map(doc => doc.data());
}

export const updateCommentUname = async (email, uname) => {
  const userCommentRef = firebase.firestore().collection("userComments/" + email + "/comments")
  const snap = await userCommentRef.get()
  const ids = snap.docs.map(doc => doc.id)
  const postIds = new Set()

  ids.forEach(id => {
    const postId = id.substring(id.indexOf(",," + 1), id.lastIndexOf(",,"))
    //user.email + ',,' + postId + ",," + time
    postIds.add(postId)
    firebase.firestore().collection("posts/" + user.email + "/userPosts")
      .doc(id)
      .update({ username: uname })
      .then(() => console.log("post updated"))
  })
  for (id of postIds) {
    const comment_ref = firebase.firestore().collection("comments/" + id + "/postComments")
    const snapshotComm = await comment_ref.get()
    snapshotComm.docs.forEach(doc => {
      if (doc.id.substring(0, doc.id.indexOf(",,")) === email) {
        comment_ref.doc(doc.id).update({
          username: uname
        })
      }
    })
  }
}

export const likeUnlikePost = async (id, like = true, post = true) => {
  console.log(id)
  const delimitter = post ? "," : ",,"
  const email = id.substring(0, id.indexOf(delimitter))
  const non_email = id.substring(id.indexOf(delimitter) + 2, id.length)
  const postId = post ? "" : non_email.substring(0, non_email.indexOf(",,"))
  console.log(postId)
  const ref = post ? "posts/" + email + "/userPosts" : "comments/" + postId + "/postComments"
  var post_ref = firebase.firestore().collection(ref);
  const incr = like ? 1 : -1
  post_ref
    .doc(id)
    .update({ likes: fire.firestore.FieldValue.increment(incr) })
    .catch((err) => { console.log(err) })

  if (post) {
    const stock = id.substring(id.indexOf(",") + 1, id.indexOf(",,"))
    const stock_post_ref = firebase.firestore().collection("stockposts/" + stock + "/stockPosts");
    stock_post_ref
      .doc(id)
      .update({ likes: fire.firestore.FieldValue.increment(incr) })
      .catch((err) => { console.log(err) })
  }
  console.log("liked")

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

export const followStock = async (stock_name) => {
  var user = firebase.auth().currentUser;
  var follow_ref = firebase.firestore().collection("following/" + user.email + "/stockFollowing");
  follow_ref
    .doc(stock_name)
    .set({})
    .then(() => {
      var following_ref = firebase.firestore().collection("stock/" + stock_name + "/stockFollowers");
      following_ref
        .doc(user.email)
        .set({})
    })
    .catch((err) => { console.log(err) })
}

export const unfollowStock = async (stock_name) => {
  var user = firebase.auth().currentUser;
  var follow_ref = firebase.firestore().collection("following/" + user.email + "/stockFollowing");
  follow_ref
    .doc(stock_name)
    .delete()
    .then(() => {
      var following_ref = firebase.firestore().collection("stock/" + stock_name + "/stockFollowers");
      following_ref
        .doc(user.email)
        .delete()
    })
    .catch((err) => { console.log(err) })
}

export const getWatchList = async () => {
  var user = firebase.auth().currentUser;
  var follow_ref = firebase.firestore().collection("following/" + user.email + "/stockFollowing");
  var snap = await follow_ref.get()
  return snap.docs.map(doc => doc.id);
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

export const getPostsByEmail = async (email) => {
  const snapshot = await firebase.firestore().collection("posts/" + email + "/userPosts")
    .orderBy("createdAt", "desc").get()
  return snapshot.docs.map(doc => doc.data());
}

export const getUserPosts = async () => {
  var user = firebase.auth().currentUser;
  const email = user.email
  const snapshot = await firebase.firestore().collection("posts/" + email + "/userPosts")
    .orderBy("createdAt", "desc").get()
  return snapshot.docs.map(doc => doc.data());
}

const arrayUnique = (a) => {
  for (var i = 0; i < a.length; ++i) {
    for (var j = i + 1; j < a.length; ++j) {
      if (JSON.stringify(a[i]) === JSON.stringify(a[j]))
        a.splice(j--, 1);
    }
  }
  return a;
}

function GetSortOrder(prop) {
  return function (a, b) {
    if (a[prop] > b[prop]) {
      return 1;
    } else if (a[prop] < b[prop]) {
      return -1;
    }
    return 0;
  }
}

export const getFollowingFeed = () => {
  const suffix = "/userFollowing"
  var user = firebase.auth().currentUser;
  return firebase.firestore().collection("following/" + user.email + suffix).get()
    .then((docRef) => {
      var post_arr = [];
      docRef.forEach((doc) => {
        post_arr.push(getPostsByEmail(doc.id))
      })
      var res = Promise.all(post_arr)
      return res
    })
}

export const getMainFeed = () => {
  return getFollowingFeed().then(async (followPosts) => {
    return getWatchlistPosts().then(stockPosts => {
      return getUserPosts().then(userPosts => {
        var ids = new Set()
        var arr = followPosts.flat().concat(stockPosts.flat().concat(userPosts.flat()))
        var res = []
        for (var obj of arr) {
          if (!ids.has(obj.id)) {
            res.push(obj)
            ids.add(obj.id)
          }
        }
        res.sort((a, b) => b.createdAt - a.createdAt)
        return res
      }).catch((err) => console.log(err))
    }).catch(err => console.log(err))
  }).catch(err => console.log(err))
}


export const getWatchlistPosts = () => {
  var user = firebase.auth().currentUser;
  const suffix = "/stockFollowing"
  return firebase.firestore().collection("following/" + user.email + suffix).get()
    .then(
      (docRef) => {
        var post_arr = [];
        docRef.forEach((doc) => {
          post_arr.push(getStockPosts(doc.id))
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
  const userCommentRef = firebase.firestore().collection("userComments/" + user.email + "/comments")
  const time = Date.now()
  const comment = {
    "postId": postId,
    "text": text,
    "createdAt": time,
    "username": user.displayName,
    "id": user.email + ',,' + postId + ",," + time,
    "likes": 0
  }
  comment_ref.doc(user.email + ',,' + postId + ",," + time)
    .set(comment)
    .catch((err) => { console.log(err) })
  userCommentRef.doc(user.email + ',,' + postId + ",," + time)
    .set({})
    .catch((err) => { console.log(err) })
  return comment
}

export const hasUserLiked = (postId) => {
  var user = firebase.auth().currentUser;
  var like_ref = firebase.firestore().collection("likes/" + user.email + "/userLikes");
  return like_ref
    .doc(postId)
    .get()
    .then((doc) => { return doc.exists })
}
