import firebase from './utils/config'

// Update user profle details 
export const updateProfile = (fieldName, detail) => {
  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      const username = user.displayName
      const userCollection = firebase.firestore().collection('users')
      userCollection.doc(username)
        .update({
          fieldName: detail
        })
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
  })
}

// SignUp User
export const SignUp = (params) => {
  const userCollection = firebase.firestore().collection('users')
  firebase.auth().
    createUserWithEmailAndPassword(params[0], params[1])
    .then(() => {
      userCollection.doc(params[1])
        .get()
        .then((doc) => {
          if (!doc.exists) {
            userCollection.doc(params[2])
              .set({
                username: params[2],
                email: params[0],
                fullName: params[3]
              })
              .then(() => {
                console.log(`User signed up successfully`)
                firebase.auth().onAuthStateChanged(function (user) {
                  if (user) {
                    user.updateProfile({
                      displayName: params[2]
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
  firebase.auth().signInWithEmailAndPassword(params[0], params[1])
    .catch(function (error) {
      console.log(error.code)
      console.log(error.message)
    });

}