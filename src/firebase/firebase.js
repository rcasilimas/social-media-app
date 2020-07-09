import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';


const firebaseConfig = {
    apiKey: "AIzaSyC5oGg0jJDg0HQ0hALOubAnsFun6BI8ZFo",
    authDomain: "social-media-app-66155.firebaseapp.com",
    databaseURL: "https://social-media-app-66155.firebaseio.com",
    projectId: "social-media-app-66155",
    storageBucket: "social-media-app-66155.appspot.com",
    messagingSenderId: "1095921517342",
    appId: "1:1095921517342:web:7873a36df0044fa48bff0f",
    measurementId: "G-J199BMKYZD"
  };

  firebase.initializeApp(firebaseConfig);

  export const createUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth) {
      return;
    }

    const userRef = firestore.doc(`users/${userAuth.uid}`);
    const snapShot = await userRef.get()
    
    
    if (!snapShot.exists) {
      const { name, email, phone } = userAuth;
      const createdAt = new Date();
      const generateRobotId = (len, arr) => {
        let robotId = ''
        for (let i = len; i > 0; i--) {
          robotId += arr[Math.floor(Math.random() * arr.length)];
        }
        return robotId
      }
      const robotId = generateRobotId(20, '12345abcde');
      console.log(robotId)

      try {
        await userRef.set({
          name, 
          email, 
          phone, 
          createdAt,
          robotId,
          posts: {}, 
          ...additionalData
        })
      } catch (error) {
        console.log(error, 'error creating user')
      }
    }

    return userRef;
  }

  export const submitPostToFirebase = async (text, userId, name, robotId) => {
    const createdAt = new Date();


    try {
      const postRef = await firestore.collection(`posts`).add({
        content: text,
        createdAt,
        postedBy: {
          userId,
          name,
          robotId
        }
      })
      const postId = postRef.id
      
      firestore.collection(`users`).doc(`${userId}`).update({
        [`posts.${postId}`]: {
          content: text, 
          createdAt
        }
      }) 
    } catch (error) {
      console.log('error creating post', error)
    }
  }
  
  export const convertPostsSnapshotToMap = (posts) => {
    const transformedPost = posts.docs.map(doc => {
      const {content, createdAt, postedBy} = doc.data()

      return {
        postId: doc.id,
        content,
        createdAt,
        postedBy
      }
    })

    return transformedPost;
  }

  export const convertUsersSnapshotToMap = (users) => {
    const transformedUsers = users.docs.map(doc => {
      const { name, email, phone, posts, robotId } = doc.data()

      return {
        id: doc.id,
        robotId,
        name,
        email,
        phone,
        posts
      }
    })

    return transformedUsers;

    /* return transformedUsers.reduce((accumulator, user) => {
      console.log('user',user)
      accumulator[user.id] = user;
      return accumulator;
    }, {}) */
  }


  export const auth = firebase.auth();
  export const firestore = firebase.firestore();

  const provider = new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({ prompt: 'select_account' });
  export const signInWithGoogle = () => auth.signInWithPopup(provider);

  export default firebase;